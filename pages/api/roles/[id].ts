import { NextApiRequest, NextApiResponse } from 'next'
import { roles_read, roles_delete } from '../../../collections/Roles';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id: string = req.query.id.toString();
    if (req.method === "GET") {
      res.status(200).json(roles_read(id))
    } else if (req.method === "DELETE") {
      res.status(200).json({ ok: roles_delete(id) });
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
