import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.js';
import skillsRoutes from './routes/skills.js';
import usersRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

// Configure CORS for your Vercel frontend
const allowedOrigins = [
  'https://foss-project-coconut-milk.vercel.app', // Your production Vercel domain
  'https://foss-project-coconut-milk-*-elphie-pro.vercel.app', // PR deployments with your username
  'https://foss-project-coconut-milk-*-git-*.vercel.app', // General PR deployments
  'https://foss-project-coconut-milk-*.vercel.app', // Branch deployments
  'http://localhost:3000', // Create React App
  'http://localhost:5173', // Vite dev server
  'http://localhost:4000'  // Your local backend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = '^' + allowedOrigin.replace(/\*/g, '.*') + '$';
        return new RegExp(pattern).test(origin);
      }
      return origin === allowedOrigin;
    });
    
    if (isAllowed) {
      return callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({ 
    message: 'Skill Exchange API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      skills: '/api/skills',
      users: '/api/users',
      dashboard: '/api/dashboard'
    }
  });
});

// Your routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  console.error('Error:', error.message);
  res.status(statusCode).json({
    message: error.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Skill Exchange API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});