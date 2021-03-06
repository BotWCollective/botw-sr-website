
import { db } from './db.ts'
import User from '../models/User.ts'

import { v4 as uuidv4 } from 'uuid'

export function users_create(user: User) {
  const stmt = db.prepare(`INSERT into users (id, username, created, provider, token) VALUES (@id, @username, @created, @provider, @token)`);
  return stmt.run(user);
}

export function users_create_return_obj(user: User) {
  users_create(user);
  return users_read(user.username);
}

export function users_set_token(username: string, token: string) {
  const stmt = db.prepare(`UPDATE users SET token = @token where username = @username`);
  return stmt.run({ username, token });
}

export function users_read(username: string) {
  const stmt = db.prepare(`SELECT users.*, json_group_array(rolename) as roles
           from users
             left join user_roles on user_roles.user_id = users.id
             left join roles on roles.id = user_roles.role_id
           where username = @username group by username
           `);
  let user = stmt.get({ username });
  if (user && user.roles) {
    user.roles = roles_as_json(user.roles);
  }
  return user;
}

function roles_as_json(roles: string) {
  return JSON.parse(roles).filter(x => x);
}

export function users_delete(id: string) {
  const stmt = db.prepare('DELETE from users where id = ?');
  const ret = stmt.run(id);
  return ret.changes > 0;
}

export function users_all(): User[] {
  const stmt = db.prepare(`SELECT users.id, username, json_group_array(roles.rolename) as roles from users
          left join user_roles on user_roles.user_id = users.id
          left join roles on roles.id = user_roles.role_id
          group by users.id, users.username
`)
  const rows = stmt.all();
  rows.forEach(row => row.roles = roles_as_json(row.roles));
  return rows;
}

export function users_role_create(username: string, rolename: string) {
  const stmt = db.prepare(`INSERT into user_roles (user_id, role_id) VALUES (
         (select id from users where username = @username),
         (select id from roles where rolename = @rolename)
)`);
  return stmt.run({ username, rolename });
}
export function users_role_delete(username: string, rolename: string) {
  const stmt = db.prepare(`DELETE from user_roles where 
          user_id = (select id from users where username = @username) and 
          role_id = (select id from roles where rolename = @rolename)`)
  return stmt.run({ username, rolename });
}
