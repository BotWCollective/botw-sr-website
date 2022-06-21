import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let items = JSON.parse(fs.readFileSync('./notes.json', 'utf8'));
    if (req.method === "GET") {
      items = items.filter((item: any) => item.id === req.query.id);
      res.status(200).json(items)
    } else if (req.method === "DELETE") {
      let id = Number(req.query.id);
      if (!(items.find((item: any) => item.id === id))) {
        res.status(404).json([]);
      } else {
        items = items.filter((item: any) => item.id !== id);
        fs.writeFileSync('./notes.json', JSON.stringify(items));
        res.status(200).json([]);
      }
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
