import { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from './auth'
import { getUser } from './user'

export async function loginRequired(req: NextApiRequest, res: NextApiResponse, allowed_roles: string[] = []) {
  const user = await loginDetails(req);
  if (!user)
    unauthorized(res);
  if (!user.roles)
    unauthorized(res);
  const roles = user.roles.filter((role: string) => allowed_roles.includes(role));
  if (roles.length <= 0) {
    unauthorized(res);
  }
  return;
}

async function loginDetails(req: NextApiRequest) {
  const session = await getLoginSession(req);
  const user = (session && (await getUser(session))) ?? null;
  return user;
}

export async function isLoggedIn(req: NextApiRequest): boolean {
  return await loginDetails(req) != null;
}

export function unauthorized(res: NextApiResponse) {
  res.status(401).json({ message: 'Unauthorized' });
}
