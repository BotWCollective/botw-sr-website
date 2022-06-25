import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

import { notes_read, notes_delete } from '../../../collections/Notes.ts';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = Number(req.query.id);
    if (req.method === "GET") {
      res.status(200).json(notes_read(id))
    } else if (req.method === "DELETE") {
      res.status(200).json(notes_delete(id));
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
