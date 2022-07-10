import { NextApiRequest, NextApiResponse } from 'next'

import { loginRequiredFn, unauthorized } from '@/lib/loggedin';
import { db } from '@/collections/db'


function articles_all() {
  const stmt = db.prepare('SELECT articles.title, articles.id, articles.created, users.username from articles join users on users.id = articles.author_id ');
  return stmt.all();
}
function articles_with_status(status: string) {
  const stmt = db.prepare(`SELECT articles.title, articles.id, articles.created, users.username from articles
     join users on users.id = articles.author_id
     join status_enum on status_enum.id = articles.status_id
     where status_enum.status = @status`);
  return stmt.all({ status });
}


function articles_read(id: string) {
  const stmt = db.prepare('SELECT articles.*, users.username from articles join users on users.id = articles.author_id where articles.id = @id ');
  return stmt.all({ id });
}
function articles_delete(id: string) {
  const stmt = db.prepare('DELETE from articles where id = @id');
  let ret = stmt.run({ id });
  return ret.changes > 0
}

function articles_set_status(id: string, old_status: string, new_status: string) {
  const stmt = db.prepare(`UPDATE articles SET status_id = (select id from status_enum where status = @new_status)
         where id = @id and status_id = (select id from status_enum where status = @old_status)`)
  let ret = stmt.run({ id, old_status, new_status });
  if (ret.changed > 0) {
    return articles_read(id);
  }
  return null;
}

function articles_set_review(id: string) {
  return articles_set_status(id, 'draft', 'review');
}
function articles_set_publish(id: string) {
  return articles_set_status(id, 'review', 'publish');
}
function articles_set_unpublish(id: string) {
  return articles_set_status(id, 'publish', 'review');
}
function articles_set_revision(id: string) {
  return articles_set_status(id, 'review', 'draft');
}


// Insert or Update and article
// To update the status of an article, use articles_set_...() functions
function articles_upsert(body: any) {
  const stmt = db.prepare(`INSERT into articles (id, title, text, created, author_id, status_id) VALUES (
    @id, @title, @text, @created,
      (select id from users where username = @username),
      (select id from status_enum where status = 'draft')
    )
    ON CONFLICT(id) DO UPDATE SET
       title = excluded.title,
       text = excluded.text,
       created = excluded.created,
       author_id = excluded.author_id`);
  let ret = stmt.run(body);
  if (ret.changes > 0) {
    return articles_read(body.id);
  }
  return null;
}

function articles_action(id: string, action: string, url: string) {
  if (action == "publish") {
    return articles_set_publish(id);
  } else if (action == "review") {
    return articles_set_review(id);
  } else if (action == "unpublish") {
    return articles_set_unpublish(id);
  } else if (action == "revision") {
    return articles_set_revision(id);
  }
  throw new Error(`Unknown article action ${action} url ${url} [publish, review, unpublish, revision]`)

}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug || [];
  try {
    if (req.method === "GET") {
      if (slug.length == 0) {
        res.status(200).json(articles_all());
      } else if (slug.length == 1) {
        const id = slug[0];
        if (id.toLowerCase() == 'publish') {
          return res.status(200).json(articles_with_status('publish'));
        } else if (id.toLowerCase() == 'review') {
          await loginRequiredFn(req, res, ['editor', 'moderator', 'author'], unauthorized);
          return res.status(200).json(articles_with_status('review'));
        } else if (id.toLowerCase() == 'draft') {
          const user = await loginRequiredFn(req, res, ['author', 'editor', 'moderator'], unauthorized);
          if ('editor' in user.roles || 'moderator' in user.roles) {
            return res.status(200).json(articles_with_status('draft'));
          } else {
            return res.status(200).json(articles_with_status_and_author('draft'));
          }
        } else {
          res.status(200).json(articles_read(id));
        }
      } else if (slug.length == 2) {
        await loginRequiredFn(req, res, ['editor', 'moderator'], unauthorized);
        return articles_action(slug[0], slug[1].toLowerCase(), req.url);
      } else {
        throw new Error(`Unknown GET url ${req.url}`)
      }
      return;
    }

    await loginRequiredFn(req, res, ['editor'], unauthorized);
    if (slug.length != 1) {
      throw new Error(`Unknown ${req.method} url ${req.url}`);
    }
    const id = slug[0];

    if (req.method === "DELETE") {
      if (articles_delete(id)) {
        res.status(200).json({ id, action: 'deleted' })
      } else {
        res.status(404).json({ id: slug[0], message: 'Not Found' });
      }

    } else if (req.method === "POST") {
      const article = articles_upsert(req.body);
      if (article) {
        res.status(200).json(article);
      } else {
        throw new Error('Unable to create to article');
      }
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
