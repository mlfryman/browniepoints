CREATE OR REPLACE FUNCTION find_all_prizes (f_id INTEGER)
RETURNS TABLE (
               "prizeId" INTEGER,
               "title" VARCHAR,
               "description" VARCHAR,
               "category" VARCHAR,
               "cost" INTEGER,
               "date" TIMESTAMPTZ,
               "image" VARCHAR,
               "fromId" INTEGER,
               "fromName" TEXT,
               "fromUsername" VARCHAR,
               "fromGravatar" VARCHAR,
               "fromAvatar" VARCHAR,
               "toId" INTEGER,
               "toName" TEXT,
               "toUsername" VARCHAR,
               "toGravatar" VARCHAR,
               "toAvatar" VARCHAR,
               "ownerId" INTEGER,
               "ownerName" TEXT,
               "ownerUsername" VARCHAR,
               "ownerGravatar" VARCHAR,
               "ownerAvatar" VARCHAR
               ) AS $$
DECLARE
BEGIN
  RETURN QUERY
    SELECT
      p.id AS "prizeId",
      p.title AS "title",
      p.description AS "description",
      c.name AS "category",
      p.cost AS "cost",
      p.created_at AS "date",
      c.image AS "image",
      p.from_id AS "fromId",
      RTRIM(s.first_name) || ' ' || RTRIM(s.last_name) AS "fromName",
      s.username AS "fromUsername",
      s.gravatar AS "fromGravatar",
      s.avatar AS "fromAvatar",
      p.to_id AS "toId",
      RTRIM(r.first_name) || ' ' || RTRIM(r.last_name) AS "toName",
      r.username AS "fromUsername",
      r.gravatar AS "fromGravatar",
      r.avatar AS "fromAvatar",
      p.owner_id AS "ownerId",
      RTRIM(o.first_name) || ' ' || RTRIM(o.last_name) AS "ownerName",
      o.username AS "ownerUsername",
      o.gravatar AS "ownerGravatar",
      o.avatar AS "ownerAvatar"

    FROM prizes p
    INNER JOIN categories c ON c.id = p.category_id
    INNER JOIN friendships f ON f.id = p.friendship_id
    INNER JOIN users s ON s.id = p.from_id
    INNER JOIN users r ON r.id = p.to_id
    INNER JOIN users o ON o.id = p.owner_id
    WHERE f.id = f_id
    GROUP BY
      p.id,
      s.first_name,
      s.last_name,
      s.username,
      s.gravatar,
      s.avatar,
      r.first_name,
      r.last_name,
      r.username,
      r.gravatar,
      r.avatar,
      o.first_name,
      o.last_name,
      o.username,
      o.gravatar,
      o.avatar,
      c.name,
      c.image
    ORDER BY p.created_at DESC;

END;
$$ LANGUAGE plpgsql;
