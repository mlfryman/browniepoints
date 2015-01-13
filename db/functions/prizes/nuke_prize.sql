CREATE OR REPLACE FUNCTION nuke_prize (fid INTEGER, pid INTEGER)
RETURNS INTEGER AS $$
DECLARE

BEGIN
  pid := (SELECT p.id FROM prizes p WHERE p.id = pid AND p.friendship_id = fid);
  DELETE FROM prizes p WHERE p.id = pid;

  RETURN pid;

END;
$$ LANGUAGE plpgsql;
