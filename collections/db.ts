
import Database from 'better-sqlite3';

export let db = null;

if (!db) {
  const options = {};
  db = new Database('foobar.db', options);
}

