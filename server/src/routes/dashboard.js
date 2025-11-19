import { Router } from 'express';

import db from '../data/db.js';
import { authenticate, authorizeSelf } from '../middleware/auth.js';

const router = Router();

const formatDate = (iso) => new Date(iso).toISOString();

router.get('/:userId', authenticate, authorizeSelf('userId'), (req, res) => {
  db.read();

  const user = db.data.users.find((item) => item.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const teachingSkills = db.data.skills
    .filter((skill) => skill.instructorId === user.id)
    .map((skill) => {
      const nextSession = db.data.sessions
        .filter((session) => session.skillId === skill.id && session.hostId === user.id)
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))[0];

      return {
        id: skill.id,
        title: skill.title,
        enrolled: skill.enrolledUserIds.length,
        nextSession: nextSession ? formatDate(nextSession.startTime) : null
      };
    });

  const learningSkills = db.data.skills
    .filter((skill) => skill.enrolledUserIds.includes(user.id))
    .map((skill) => {
      const instructor = db.data.users.find((u) => u.id === skill.instructorId);
      const nextSession = db.data.sessions
        .filter((session) => session.skillId === skill.id && session.participantIds.includes(user.id))
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))[0];

      return {
        id: skill.id,
        title: skill.title,
        instructor: instructor?.name || 'Unknown instructor',
        nextSession: nextSession ? formatDate(nextSession.startTime) : null
      };
    });

  const upcomingSessions = db.data.sessions
    .filter((session) => session.hostId === user.id || session.participantIds.includes(user.id))
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 5)
    .map((session) => {
      const skill = db.data.skills.find((skillItem) => skillItem.id === session.skillId);
      return {
        id: session.id,
        title: skill?.title || 'Skill session',
        type: session.hostId === user.id ? 'Teaching' : 'Learning',
        time: formatDate(session.startTime)
      };
    });

  const recentActivity = db.data.activity.slice(0, 5);

  const stats = {
    teaching: teachingSkills.length,
    learning: learningSkills.length,
    upcomingSessions: upcomingSessions.length,
    students: teachingSkills.reduce((count, skill) => count + skill.enrolled, 0)
  };

  res.json({
    welcomeMessage: `Welcome back, ${user.name}!`,
    teachingSkills,
    learningSkills,
    upcomingSessions,
    recentActivity,
    stats
  });
});

export default router;

