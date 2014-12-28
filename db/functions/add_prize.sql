CREATE OR REPLACE FUNCTION add_prize (user_id integer, title varchar, description text, cost integer, tags varchar)
RETURNS integer AS $$

DECLARE
  pid integer;
  tid integer;
  names varchar[];
  tagname varchar;

BEGIN
  INSERT INTO prizes (title, description, cost, user_id) VALUES (title, description, cost, user_id) RETURNING id INTO pid;
  -- turn tag string into array
  SELECT string_to_array(tags, ',') INTO names;
  RAISE NOTICE 'pid: %', pid;
  RAISE NOTICE 'names: %', names;
  -- create temporary table
  CREATE TEMP TABLE tagger ON COMMIT DROP AS SELECT pid, t.id AS tid, t.name AS tname FROM tags t WHERE t.name = any(names);

  -- loop over all the tags
  FOREACH tagname in array names
  LOOP
    tid := (SELECT t.tid FROM tagger t WHERE t.tname = tagname);
    RAISE NOTICE 'tid: %', tid;

    -- if the tag does not exist, then insert it
    IF tid is NULL then
      INSERT INTO tags (name) VALUES (tagname) RETURNING id INTO tid;
      INSERT INTO tagger VALUES (pid, tid, tagname);
    END if;
  END LOOP;

  -- take the temporary table and insert it into the join table
  INSERT INTO prizes_tags SELECT t.pid, t.tid FROM tagger t;
  -- return the prize id
  RETURN pid;

END;
$$ LANGUAGE plpgsql;
