
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { users_create, users_read, users_set_token } from '../collections/Users'

export function setUserToken(username, token) {
  users_set_token(username, token);
}

export async function createUser({ username, provider }) {
  users_create({ username, provider, created: Date.now(), id: uuidv4(), token: uuidv4() });
}

// Get full user details, including hash and salt
export async function findUser({ username }) {
  return users_read(username);
}

export function stripUser(user) {
  if (user) {
    return { username: user.username, created: user.created, roles: user.roles, provider: user.provider };
  }
  return null;
}

// Get user's username, crated and roles
export async function getUser({ username }) {
  const user = await findUser({ username });
  return stripUser(user);
}

