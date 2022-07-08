
import { db } from './db.ts'
import Role from '../models/Role.ts'

import { v4 as uuidv4 } from 'uuid'

export function roles_all(): Role[] {
  const stmt = db.prepare('SELECT * from roles');
  return stmt.all();
}

function roles_read(id: string): Note[] {
  const stmt = db.prepare(`SELECT * from roles where id = @id`);
  return stmt.all({ id: id });
}

function roles_create(rolename: string): any {
  const stmt = db.prepare(`INSERT into roles (id, rolename) VALUES (@id, @rolename)`);
  const id = uuidv4();
  const ret = stmt.run({ id, rolename });
  return { id };
}

export function roles_create_return_obj(rolename: string): Role[] {
  let ret = roles_create(rolename);
  return roles_read(ret.id);
}

export function roles_delete(id: string) {
  const stmt = db.prepare(`DELETE from roles where id = ?`)
  const out = stmt.run(id);
  return out.changes > 0;
}
