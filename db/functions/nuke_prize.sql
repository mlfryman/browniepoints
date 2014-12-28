CREATE OR REPLACE FUNCTION nuke_prize (uid integer, pid integer)
RETURNS integer AS $$
DECLARE

BEGIN
  pid := (SELECT p.id from prizes p WHERE p.id = pid AND p.user_id = uid);
  DELETE FROM prizes_tags pt WHERE pt.prize_id = pid;
  DELETE FROM images i WHERE i.prize_id = pid;
  DELETE FROM prizes p WHERE p.id = pid;

  RETURN pid;

END;
$$ LANGUAGE plpgsql;
