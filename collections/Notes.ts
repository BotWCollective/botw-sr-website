import Database from 'better-sqlite3';

import Note from '.,/models/Note.ts'

let db = global.sqlite

if (!db) {
  const options = {};
  db = new Database('foobar.db', options);
  global.sqlite = db;
}

function tables() {
  const stmt = db.prepare(`create table if not exists notes (
    id integer primary key autoincrement,
    text text not null,
    time real not null,
    video_id text not null,
    run_id text
);`);
  stmt.run([]);
  const notes = notes_size();
  if (notes.size == 0) {
    notes_initial_data();
  }
}
function notes_size() {
  const stmt = db.prepare(`SELECT COUNT(*) as size from notes`);
  return stmt.get([]);
}

function notes_initial_data() {
  let items: any = JSON.parse(fs.readFileSync('./notes.json', 'utf8'));
  items.forEach(notes_create);
}

export function notes_read(id: number): Note[] {
  const stmt = db.prepare(`SELECT * from notes where id = @id`);
  return stmt.all({ id: id });
}

export function notes_delete(id: number) {
  const stmt = db.prepare(`DELETE from notes where id = @id`);
  return stmt.run({ id: id });
}

export function notes_create(note: any): any {
  const stmt = db.prepare(`INSERT into notes (text, time, video_id, run_id) values (@text, @time, @video_id, @run_id)`);
  note.run_id = note.run_id || null;
  const ret = stmt.run(note);
  return { id: ret.lastInsertRowid }
}

export function notes_create_return_obj(note: any): Note[] {
  let ret = notes_create(note);
  return notes_read(ret.id);
}

export function notes_all(): Note[] {
  const stmt = db.prepare(`SELECT * from notes`);
  const notes = stmt.all([]);
  return notes;
}

