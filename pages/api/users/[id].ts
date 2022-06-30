import { NextApiRequest, NextApiResponse } from 'next'
import { loginRequired } from '../../../lib/loggedin';

import { users_read, users_delete, users_role_create, users_role_delete } from '../../../collections/Users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await loginRequired(req, res, ['admin']);
  try {
    const id: string = req.query.id.toString();
    if (req.method === "GET") {
      res.status(200).json(users_read(id))
    } else if (req.method === "DELETE") {
      if (req.body.action == 'USER_REMOVE_ROLE') {
        res.status(200).json(users_role_delete(req.body.username, req.body.rolename));
      } else {
        res.status(200).json(users_delete(id));
      }
    } else if (req.method === "POST") {
      if (req.body.action == 'USER_ADD_ROLE') {
        res.status(200).json(users_role_create(req.body.username, req.body.rolename));
      }
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
