
import { db } from './db.ts'
import Note from '../models/Note.ts'


export function notes_read(id: number): Note[] {
  const stmt = db.prepare(`SELECT * from notes where id = @id`);
  return stmt.all({ id: id });
}

export function notes_delete(id: number) {
  const stmt = db.prepare('DELETE from notes where id = ?');
  return stmt.run(id);
}

export function notes_create(note: any): any {
  const stmt = db.prepare(`INSERT into notes (text, time, video_id, server, run_id) values (@text, @time, @video_id, @server, @run_id)`);
  note.run_id = note.run_id || null;
  const ret = stmt.run(note);
  return { id: ret.lastInsertRowid }
}

export function notes_query(query: string): Note[] {
  const stmt = db.prepare(`SELECT * from notes where id in (SELECT rowid FROM notes_fts(@query)`);
  return stmt.all({ query: query });
}

export function notes_by_video_id(video_id: string): Note[] {
  const stmt = db.prepare(`SELECT * from notes where video_id = @video_id`);
  return stmt.all({ video_id: video_id });
}

export function notes_videos(): Note[] {
  const stmt = db.prepare(`SELECT * from videos`);
  return stmt.all({});
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

