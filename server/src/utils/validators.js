import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Email is invalid'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  bio: z.string().max(600).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const skillSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(2),
  description: z.string().min(30),
  duration: z.string().min(2),
  format: z.string().min(3),
  schedule: z.string().min(3),
  prerequisites: z.array(z.string().min(1)).optional(),
  learningOutcomes: z.array(z.string().min(1)).optional()
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(600).optional(),
  interests: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional()
});

export const enrollmentSchema = z.object({
  note: z.string().max(300).optional()
});

export const validate = (schema, payload) => {
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    const message = parsed.error.errors.map((err) => err.message).join(', ');
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }

  return parsed.data;
};

