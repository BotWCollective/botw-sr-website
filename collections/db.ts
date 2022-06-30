
import Database from 'better-sqlite3';

export let db = global.sqlite

if (!db) {
  const options = {};
  db = new Database('foobar.db', options);
  global.sqlite = db;
}

