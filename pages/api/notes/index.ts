import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let items: any = JSON.parse(fs.readFileSync('./notes.json', 'utf8'));
    if (req.method === "GET") {
      res.status(200).json(items)
    } else if (req.method === "POST") {
      let max_id = 1;
      if (items.length > 0) {
        max_id = Math.max(...items.map((item: any) => item.id));
      }
      const item = {
        id: max_id + 1,
        video_id: req.body.video_id || '',
        text: req.body.text || '',
        time: (req.body.time !== undefined) ? req.body.time : 0.0,
      };
      items.push(item);
      fs.writeFileSync('./notes.json', JSON.stringify(items));
      res.status(200).json([item]);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
