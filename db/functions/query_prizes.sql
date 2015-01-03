CREATE OR REPLACE FUNCTION query_prizes (uid INTEGER, lmt INTEGER, ofst INTEGER, tag VARCHAR)
RETURNS table (prize_id INTEGER, title VARCHAR, description VARCHAR, cost INTEGER, created_at TIMESTAMPTZ, tags VARCHAR[]) AS $$
DECLARE

BEGIN
  RETURN query
    SELECT p.id, p.title, p.description, p.cost, p.created_at, array_agg(t.name)
    FROM prizes_tags pt
    INNER JOIN prizes p ON p.id = pt.prize_id
    INNER JOIN tags t ON t.id = pt.tag_id
    WHERE p.user_id = uid AND t.name LIKE tag
    GROUP BY p.id
    ORDER BY title ASC
    OFFSET ofst
    LIMIT lmt;

END;
$$ LANGUAGE plpgsql;
