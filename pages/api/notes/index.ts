import { NextApiRequest, NextApiResponse } from 'next'
import { notes_query, notes_create_return_obj } from '../../../collections/Notes.ts'
import { loginRequired } from '../../../lib/loggedin'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      if (req.query.q === undefined) {
        res.status(200).json([]);
      } else {
        res.status(200).json(notes_query(req.query.q))
      }
    } else if (req.method === "POST") {
      await loginRequired(req, res, ['editor']);
      res.status(200).json(notes_create_return_obj(req.body));
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
