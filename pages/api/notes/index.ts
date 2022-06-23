import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

import Database from 'better-sqlite3';

const options = {};
export const db = new Database('foobar.db', options);

function tables() {
  const stmt = db.prepare(`create table if not exists notes (
    id integer primary key autoincrement,
    text text not null,
    time real not null,
    video_id text not null,
    run_id text
);`);
  stmt.run([]);
  const notes = size_notes();
  if (notes.size == 0) {
    initial_data();
  }
}

export function notes_read(id: number) {
  const stmt = db.prepare(`SELECT * from notes where id = @id`);
  return stmt.all({ id: id });
}
export function notes_delete(id: number) {
  const stmt = db.prepare(`DELETE from notes where id = @id`);
  return stmt.run({ id: id });
}

function size_notes() {
  const stmt = db.prepare(`SELECT COUNT(*) as size from notes`);
  return stmt.get([]);
}

function notes_create(note: any) {
  const stmt = db.prepare(`INSERT into notes (text, time, video_id, run_id) values (@text, @time, @video_id, @run_id)`);
  note.run_id = note.run_id || null;
  const ret = stmt.run(note);
  return { id: ret.lastInsertRowid }
}

function notes_create_return_obj(note: any) {
  let ret = notes_create(note);
  return notes_read(ret.id);
}

function initial_data() {
  let items: any = JSON.parse(fs.readFileSync('./notes.json', 'utf8'));
  items.forEach(notes_create);
}

function notes_all() {
  const stmt = db.prepare(`SELECT * from notes`);
  const notes = stmt.all([]);
  return notes;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    tables();
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
