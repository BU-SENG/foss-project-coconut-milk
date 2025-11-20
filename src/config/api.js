const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  AUTH: `${API_BASE_URL}/api/auth`,
  SKILLS: `${API_BASE_URL}/api/skills`,
  USERS: `${API_BASE_URL}/api/users`,
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  HEALTH: `${API_BASE_URL}/api/health`
};

console.log('API Base URL:', API_BASE_URL); // For debugging

export default API_BASE_URL;