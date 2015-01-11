CREATE OR REPLACE FUNCTION find_all_transactions (f_id INTEGER)
RETURNS TABLE ("transactionId" INTEGER, "fromId" INTEGER, "toId" INTEGER, "body" TEXT, "points" INTEGER, "date" TIMESTAMPTZ, "read" BOOLEAN) AS $$
DECLARE

BEGIN
  RETURN QUERY
    SELECT
      t.id AS "transactionId",
      t.from_id AS "fromId",
      t.to_id AS "toId",
      t.body AS "body",
      t.points AS "points",
      t.created_at AS "date",
      t.read AS "read"
    FROM transactions t
    INNER JOIN friendships f ON f.id = t.friendship_id
    WHERE f.id = f_id
    GROUP BY t.id, t.body
    ORDER BY t.created_at;

END;
$$ LANGUAGE plpgsql;
