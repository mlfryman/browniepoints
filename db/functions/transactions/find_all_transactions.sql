CREATE OR REPLACE FUNCTION find_all_transactions (f_id INTEGER)
RETURNS TABLE (
               "transactionId" INTEGER, "body" TEXT, "points" INTEGER, "date" TIMESTAMPTZ, "read" BOOLEAN,
               "fromId" INTEGER, "fromName" VARCHAR, "fromUsername" VARCHAR,
               "toId" INTEGER, "toName" VARCHAR, "toUsername" VARCHAR
) AS $$
DECLARE

BEGIN
  RETURN QUERY
    SELECT
      t.id AS "transactionId",
      t.body AS "body",
      t.points AS "points",
      t.created_at AS "date",
      t.read AS "read",
      uf.id AS "fromId",
      uf.first_name AS "fromName",
      uf.username AS "fromUsername",
      ut.id AS "toId",
      ut.first_name AS "toName",
      ut.username AS "toUsername"
    FROM transactions t
    INNER JOIN friendships f ON f.id = t.friendship_id
    INNER JOIN users u AS uf ON u.id = t.from_id
    INNER JOIN users u AS ut ON u.id = t.to_id
    WHERE f.id = f_id
    GROUP BY t.id, t.body;

END;
$$ LANGUAGE plpgsql;

