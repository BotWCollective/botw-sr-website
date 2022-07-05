create table if not exists notes (
    id integer primary key autoincrement,
    text text not null,
    time real not null,
    video_id text not null,
    server text not null,
    run_id text
);

create table if not exists videos (
  video_id text not null,
  server text not null,
  text text not null
);

create table if not exists users (
  id text unique,
  username text unique,
  created text,
  provider text,
  token text unique
);
create table if not exists roles (
  id text unique,
  rolename text unique
);
create table if not exists user_roles (
  user_id text,
  role_id text
);


CREATE VIRTUAL TABLE if not exists
  notes_fts using fts5(content="", text, video_id, run_id);

DROP TRIGGER if exists notes_before_update;
CREATE TRIGGER notes_before_update
  BEFORE UPDATE ON notes
  BEGIN
    -- DELETE FROM notes_fts WHERE rowid=old.rowid;
    INSERT into notes_fts(ft, rowid, text, video_id, run_id) VALUES ('delete', old.rowid, old.text, old.video_id, old.run_id);
  END;

DROP TRIGGER if exists notes_before_delete;
CREATE TRIGGER notes_before_delete
  BEFORE DELETE ON notes
  BEGIN
    --DELETE FROM notes_fts WHERE rowid=old.rowid;
    INSERT into notes_fts(notes_fts, rowid, text, video_id, run_id) VALUES ('delete', old.rowid, old.text, old.video_id, old.run_id);
  END;

DROP TRIGGER if exists notes_after_update;
CREATE TRIGGER notes_after_update
  AFTER UPDATE ON notes
  BEGIN
    INSERT INTO notes_fts( text, video_id, run_id)
    SELECT  text, video_id, run_id
      FROM notes
     WHERE new.rowid = notes.id;
  END;

DROP TRIGGER if exists notes_after_insert;
CREATE TRIGGER notes_after_insert
  AFTER INSERT ON notes
  BEGIN
    INSERT INTO notes_fts( text , video_id, run_id )
    SELECT text, video_id, run_id
      FROM notes
     WHERE new.rowid = notes.id;
  END;


--- Roles
insert into roles (id, rolename) VALUES ('1a891159-ab3e-4be6-8f03-577261cc78c9', 'kilton');
insert into roles (id, rolename) VALUES ('cbca822f-3342-43a8-a3c7-cc364bdb82de', 'chuchu');

--- Data

INSERT into notes (video_id, server, text, time) VALUES ('5iVrLMDynsQ', 'youtube', 'Start', 104.829499666667);
INSERT into notes (video_id, server, text, time) VALUES ('5iVrLMDynsQ', 'youtube', 'Paraglider', 885.197236);
INSERT into notes (video_id, server, text, time) VALUES ('5iVrLMDynsQ', 'youtube', 'Bombs', 337.618924333333);
INSERT into notes (video_id, server, text, time) VALUES ('5iVrLMDynsQ', 'youtube', 'Unloaded Gate', 975.008144480519);

INSERT into notes (video_id, server, text, time) VALUES ('zFcdS_RDacQ', 'youtube', 'New WR', 0.0);

INSERT into notes (video_id, server, text, time) VALUES ('1498971641270845444', 'twitter', 'No Warp Snuggle', 975.008144480519);

INSERT into notes (video_id, server, text, time) VALUES ('MZqANcvFr4c', 'youtube', 'pizza pref', 12345.0);


INSERT into videos (video_id, server, text) VALUES ('5iVrLMDynsQ', 'youtube', 'player5 Any%');
INSERT into videos (video_id, server, text) VALUES ('zFcdS_RDacQ', 'youtube', 'Koroks Any%');
INSERT into videos (video_id, server, text) VALUES ('1498971641270845444', 'twitter', 'No Warp Snuggle');
INSERT into videos (video_id, server, text) VALUES ('MZqANcvFr4c', 'youtube', 'All Shrines Guide');

select * from notes where id in (SELECT rowid from notes_fts('gate'));
select '---';
select * from notes where id in (SELECT rowid from notes_fts('paraglider'));
select '---';
select * from notes where id in (SELECT rowid from notes_fts('bombs'));
select '---';
select * from notes where id in (SELECT rowid from notes_fts('start'));

delete from notes where text = 'pizza pref';

