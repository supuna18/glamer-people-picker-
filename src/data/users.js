// src/data/users.js
export const USERS = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? 'Developer' : i % 3 === 1 ? 'Designer' : 'Manager',
  email: `user${i + 1}@glamer.com`,
  status: i % 4 === 0 ? 'Offline' : 'Active', // Add new status field
  avatarUrl: null
}));