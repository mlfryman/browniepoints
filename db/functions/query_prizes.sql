CREATE OR REPLACE FUNCTION query_prizes (uid integer, lmt integer, ofst integer, tag varchar)
RETURNS table (prize_id integer, title varchar, description text, cost integer, updated_at timestamp, tags varchar[]) AS $$
DECLARE

BEGIN
  RETURN query
    SELECT p.id, p.title, p.description, p.cost, p.updated_at, array_agg(t.name)
    FROM prizes_tags pt
    INNER JOIN prizes p ON p.id = pt.prize_id
    INNER JOIN tags t ON t.id = pt.tag_id
    WHERE p.user_id = uid AND t.name LIKE tag
    GROUP BY p.id
    ORDER BY title DESC
    OFFSET ofst
    LIMIT lmt;

END;
$$ LANGUAGE plpgsql;
