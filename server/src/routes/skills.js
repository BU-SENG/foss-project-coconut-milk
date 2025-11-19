import { Router } from 'express';
import { nanoid } from 'nanoid';

import db, { saveDb } from '../data/db.js';
import { authenticate } from '../middleware/auth.js';
import { enrollmentSchema, skillSchema, validate } from '../utils/validators.js';

const router = Router();

const attachInstructor = (skill) => {
  const instructor = db.data.users.find((user) => user.id === skill.instructorId);

  return {
    ...skill,
    instructor: instructor
      ? {
          id: instructor.id,
          name: instructor.name,
          email: instructor.email
        }
      : null,
    enrolledCount: skill.enrolledUserIds.length
  };
};

router.get('/', (req, res) => {
  const { category, search } = req.query;
  db.read();

  let skills = [...db.data.skills];

  if (category && category.toLowerCase() !== 'all') {
    skills = skills.filter((skill) => skill.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const needle = search.toLowerCase();
    skills = skills.filter(
      (skill) => skill.title.toLowerCase().includes(needle) || skill.description.toLowerCase().includes(needle)
    );
  }

  res.json({
    count: skills.length,
    items: skills.map(attachInstructor)
  });
});

router.get('/:skillId', (req, res) => {
  const { skillId } = req.params;
  db.read();

  const skill = db.data.skills.find((item) => item.id === skillId);

  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }

  const enrolledUsers = db.data.users
    .filter((user) => skill.enrolledUserIds.includes(user.id))
    .map((user) => ({
      id: user.id,
      name: user.name
    }));

  return res.json({
    ...attachInstructor(skill),
    enrolledUsers
  });
});

router.post('/', authenticate, (req, res, next) => {
  try {
    const payload = validate(skillSchema, req.body);

    db.read();

    const newSkill = {
      id: nanoid(),
      ...payload,
      prerequisites: payload.prerequisites || [],
      learningOutcomes: payload.learningOutcomes || [],
      instructorId: req.user.id,
      rating: 0,
      reviews: 0,
      enrolledUserIds: [],
      createdAt: new Date().toISOString()
    };

    db.data.skills.push(newSkill);

    const instructor = db.data.users.find((user) => user.id === req.user.id);
    if (instructor) {
      instructor.teachingSkillIds.push(newSkill.id);
    }

    saveDb();

    return res.status(201).json(attachInstructor(newSkill));
  } catch (error) {
    next(error);
  }
});

router.post('/:skillId/enroll', authenticate, (req, res, next) => {
  try {
    validate(enrollmentSchema, req.body || {});
    db.read();

    const skill = db.data.skills.find((item) => item.id === req.params.skillId);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.instructorId === req.user.id) {
      return res.status(400).json({ message: 'You are the instructor of this skill' });
    }

    if (skill.enrolledUserIds.includes(req.user.id)) {
      return res.status(200).json({ message: 'Already enrolled', skill: attachInstructor(skill) });
    }

    skill.enrolledUserIds.push(req.user.id);

    const learner = db.data.users.find((user) => user.id === req.user.id);
    if (learner && !learner.learningSkillIds.includes(skill.id)) {
      learner.learningSkillIds.push(skill.id);
    }

    db.data.activity.unshift({
      id: nanoid(),
      text: `${learner?.name || 'A learner'} enrolled in ${skill.title}`,
      time: new Date().toISOString()
    });

    saveDb();

    return res.status(200).json({
      message: 'Enrollment successful',
      skill: attachInstructor(skill)
    });
  } catch (error) {
    next(error);
  }
});

export default router;

