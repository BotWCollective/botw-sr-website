import { NextApiRequest, NextApiResponse } from 'next'
import { notes_table, notes_all, notes_create_return_obj } from '../../../collections/Notes.ts'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      res.status(200).json(notes_all());
    } else if (req.method === "POST") {
      res.status(200).json(notes_create_return_obj(req.body));
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
