import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import db, { saveDb } from '../data/db.js';
import { loginSchema, registerSchema, validate } from '../utils/validators.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const TOKEN_EXPIRY = '7d';

const signToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

const sanitizeUser = (user) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

router.post('/register', async (req, res, next) => {
  try {
    const payload = validate(registerSchema, req.body);

    db.read();

    const emailExists = db.data.users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase());

    if (emailExists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);

    const newUser = {
      id: nanoid(),
      name: payload.name,
      email: payload.email.toLowerCase(),
      passwordHash,
      bio: payload.bio || '',
      interests: '',
      phone: '',
      location: '',
      teachingSkillIds: [],
      learningSkillIds: [],
      createdAt: new Date().toISOString()
    };

    db.data.users.push(newUser);
    saveDb();

    return res.status(201).json({
      user: sanitizeUser(newUser),
      token: signToken(newUser)
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const payload = validate(loginSchema, req.body);

    db.read();
    const user = db.data.users.find((u) => u.email === payload.email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(payload.password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      user: sanitizeUser(user),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
});

export default router;

