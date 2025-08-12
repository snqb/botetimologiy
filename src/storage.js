import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERS_FILE = join(__dirname, '../data/users.json');

function loadUsers() {
  if (!existsSync(USERS_FILE)) {
    return {};
  }
  try {
    const data = readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
    return {};
  }
}

function saveUsers(users) {
  try {
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

export function getUser(userId) {
  const users = loadUsers();
  return users[userId] || null;
}

export function saveUser(userId, userData) {
  const users = loadUsers();
  users[userId] = {
    ...users[userId],
    ...userData,
    lastUpdated: new Date().toISOString()
  };
  saveUsers(users);
}

export function getAllUsers() {
  return loadUsers();
}

export function getUsersWithIntervals() {
  const users = loadUsers();
  return Object.entries(users)
    .filter(([_, user]) => user.interval && user.language && user.interests)
    .map(([userId, user]) => ({ userId, ...user }));
}
