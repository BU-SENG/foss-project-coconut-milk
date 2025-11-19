import { Router } from 'express';

import db, { saveDb } from '../data/db.js';
import { authenticate, authorizeSelf } from '../middleware/auth.js';
import { profileUpdateSchema, validate } from '../utils/validators.js';

const router = Router();

const sanitizeUser = (user) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

router.get('/:userId', authenticate, (req, res) => {
  db.read();
  const user = db.data.users.find((item) => item.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const teachingSkills = db.data.skills
    .filter((skill) => skill.instructorId === user.id)
    .map((skill) => ({
      id: skill.id,
      title: skill.title,
      students: skill.enrolledUserIds.length,
      rating: skill.rating,
      reviews: skill.reviews
    }));

  const learningSkills = db.data.skills
    .filter((skill) => skill.enrolledUserIds.includes(user.id))
    .map((skill) => ({
      id: skill.id,
      title: skill.title,
      instructor: db.data.users.find((u) => u.id === skill.instructorId)?.name || 'Unknown',
      progress: 0
    }));

  const stats = {
    totalStudents: teachingSkills.reduce((sum, skill) => sum + skill.students, 0),
    skillsTeaching: teachingSkills.length,
    skillsLearning: learningSkills.length,
    avgRating: teachingSkills.length
      ? (teachingSkills.reduce((sum, skill) => sum + skill.rating, 0) / teachingSkills.length).toFixed(2)
      : 0
  };

  res.json({
    profile: sanitizeUser(user),
    teachingSkills,
    learningSkills,
    stats
  });
});

router.put('/:userId', authenticate, authorizeSelf('userId'), (req, res, next) => {
  try {
    const payload = validate(profileUpdateSchema, req.body);

    db.read();
    const user = db.data.users.find((item) => item.id === req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, payload);
    saveDb();

    res.json({ profile: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;

