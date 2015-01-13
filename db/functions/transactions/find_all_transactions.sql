CREATE OR REPLACE FUNCTION find_all_transactions (f_id INTEGER)
RETURNS TABLE (
               "transactionId" INTEGER,
               "body" TEXT,
               "points" INTEGER,
               "date" TIMESTAMPTZ,
               "fromId" INTEGER,
               "fromName" TEXT,
               "fromUsername" VARCHAR,
               "fromGravatar" VARCHAR,
               "fromAvatar" VARCHAR,
               "toId" INTEGER,
               "toName" TEXT,
               "toUsername" VARCHAR,
               "toGravatar" VARCHAR,
               "toAvatar" VARCHAR
              ) AS $$
DECLARE
BEGIN
  RETURN QUERY
    SELECT
      t.id AS "transactionId",
      t.body AS "body",
      t.points AS "points",
      t.created_at AS "date",
      t.from_id AS "fromId",
      RTRIM(s.first_name) || ' ' || RTRIM(s.last_name) AS "fromName",
      s.username AS "fromUsername",
      s.gravatar AS "fromGravatar",
      s.avatar AS "fromAvatar",
      t.to_id AS "toId",
      RTRIM(r.first_name) || ' ' || RTRIM(r.last_name) AS "toName",
      r.username AS "fromUsername",
      r.gravatar AS "fromGravatar",
      r.avatar AS "fromAvatar"
    FROM transactions t
    INNER JOIN friendships f ON f.id = t.friendship_id
    INNER JOIN users s ON s.id = t.from_id
    INNER JOIN users r ON r.id = t.to_id
    WHERE f.id = f_id
    GROUP BY
      t.id,
      t.body,
      s.first_name,
      s.last_name,
      s.username,
      s.gravatar,
      s.avatar,
      r.first_name,
      r.last_name,
      r.username,
      r.gravatar,
      r.avatar
    ORDER BY t.created_at DESC;

END;
$$ LANGUAGE plpgsql;
