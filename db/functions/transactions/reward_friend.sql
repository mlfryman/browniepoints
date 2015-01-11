CREATE OR REPLACE FUNCTION reward_friend (f_id INTEGER, to_id INTEGER, from_id, INTEGER, body TEXT, points INTEGER)
RETURNS INTEGER AS $$

DECLARE
  tid INTEGER;

BEGIN
  INSERT INTO transactions (f_id, from_id, to_id, body, points) VALUES (friendship_id, to_id, from_id, body, points) RETURNING id INTO tid;

  RETURN tid;

END;
$$ LANGUAGE plpgsql;
