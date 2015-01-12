CREATE OR REPLACE FUNCTION add_transaction (friendshipId INTEGER, from_id INTEGER, to_id INTEGER, body TEXT, points INTEGER)
RETURNS INTEGER AS $$
DECLARE
  tid INTEGER;
BEGIN
    INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES (friendshipId, from_id, to_id, body, points) RETURNING id INTO tid;
    RETURN tid;
END;
$$ language plpgsql;
