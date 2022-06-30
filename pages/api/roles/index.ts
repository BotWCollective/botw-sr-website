import { NextApiRequest, NextApiResponse } from 'next'
import { roles_all, roles_create_return_obj } from '../../../collections/Roles.ts'
import { loginRequired } from '../../../lib/loggedin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await loginRequired(req, res, ['admin']);
  try {
    if (req.method === "GET") {
      res.status(200).json(roles_all());
    } else if (req.method === "POST") {
      res.status(200).json(roles_create_return_obj(req.body.rolename));
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
