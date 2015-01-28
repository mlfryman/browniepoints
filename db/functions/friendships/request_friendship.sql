CREATE OR REPLACE FUNCTION request_friendship (friendshipId INTEGER, friend1Id INTEGER, friend2Id INTEGER)
RETURNS INTEGER AS $$

DECLARE
  fid INTEGER;

BEGIN
  INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (friendshipId, friend1Id, friend2Id) RETURNING id INTO fid;

  RETURN fid;

END;
$$ LANGUAGE plpgsql;

