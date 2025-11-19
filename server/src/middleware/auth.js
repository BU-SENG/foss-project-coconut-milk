import jwt from 'jsonwebtoken';
import db from '../data/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    db.read();
    const user = db.data.users.find((u) => u.id === payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeSelf = (paramKey = 'userId') => {
  return (req, res, next) => {
    if (!req.user || req.user.id !== req.params[paramKey]) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

