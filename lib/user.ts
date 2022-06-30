
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { users_create, users_read } from '../collections/Users'


export async function createUser({ username, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    created: Date.now(),
    username,
    hash,
    salt,
  }

  users_create(user);

  return { username, createdAt: Date.now() }
}

// Get full user details, including hash and salt
export async function findUser({ username }) {
  return users_read(username);
}

// Get user's username, crated and roles
export async function getUser({ username }) {
  const user = await findUser({ username });
  return { username: user.username, created: user.created, roles: user.roles };
}

// Compare the password of an already fetched user and compare the
// password for a potential match
export function validatePassword(user: any, inputPassword: string) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
