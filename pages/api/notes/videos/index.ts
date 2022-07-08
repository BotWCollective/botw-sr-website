import { NextApiRequest, NextApiResponse } from 'next'
import { notes_videos } from '../../../../collections/Notes.ts'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      res.status(200).json(notes_videos());
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
