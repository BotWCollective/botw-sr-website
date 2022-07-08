import { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from './auth'
import { findUser, stripUser } from './user'
import { unstable_getServerSession } from "next-auth/next"


export async function loginRequired(req: NextApiRequest, res: NextApiResponse, allowed_roles: string[] = []) {
  const user = await loginDetails(req);
  if (!user || !user.roles) {
    return null;
  }
  if (allowed_roles.length > 0) {
    const roles = user.roles.filter((role: string) => allowed_roles.includes(role));
    if (roles.length <= 0) {
      return null;
    }
  }
  return user;
}

export async function loginDetails(req: NextApiRequest) {
  const session = await getLoginSession(req);
  const user = (session && (await findUser(session))) ?? null;
  if (!user || user.token != session.token) {
    return null;
  }
  return stripUser(user);
}

export async function isLoggedIn(req: NextApiRequest): boolean {
  return await loginDetails(req) != null;
}

export function unauthorized(res: NextApiResponse) {
  res.status(401).json({ message: 'Unauthorized' });
}
