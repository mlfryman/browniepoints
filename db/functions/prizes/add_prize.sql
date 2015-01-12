CREATE OR REPLACE FUNCTION add_prize (friendshipId INTEGER, owner_id INTEGER, from_id INTEGER, to_id INTEGER, title VARCHAR, description VARCHAR, category_id INTEGER, cost INTEGER)
RETURNS INTEGER AS $$

DECLARE
  pid INTEGER;

BEGIN
  INSERT INTO prizes (friendship_id, owner_id, from_id, to_id, title, description, category_id, cost) VALUES (friendshipId, owner_id, from_id, to_id, title, description, category_id, cost) RETURNING id INTO pid;

  RETURN pid;

END;
$$ LANGUAGE plpgsql;
