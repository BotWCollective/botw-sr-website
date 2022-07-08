import { NextApiRequest, NextApiResponse } from 'next'
import { users_all, users_create_return_obj } from '../../../collections/Users'
import { loginRequired } from '../../../lib/loggedin'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await loginRequired(req, res, ['admin'])

  try {
    if (req.method === "GET") {
      res.status(200).json(users_all());
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
