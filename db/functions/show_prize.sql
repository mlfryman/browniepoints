CREATE OR REPLACE FUNCTION show_prize (uid integer, pid integer)
RETURNS table (prize_id integer, title varchar, description text, cost integer, updated_at timestamptz, tags varchar[], urls varchar[]) AS $$
DECLARE

BEGIN
  RETURN query
    SELECT p.id, p.title, p.description, p.cost, p.updated_at, array_agg(distinct t.name), array_agg(distinct i.url)
    FROM prizes p
    LEFT OUTER JOIN images i ON p.id = i.prize_id
    INNER JOIN prizes_tags pt ON p.id = pt.prize_id
    INNER JOIN tags t ON t.id = pt.tag_id
    INNER JOIN users u ON u.id = p.user_id
    WHERE p.id = pid AND u.id = uid
    GROUP BY p.id;

END;
$$ LANGUAGE plpgsql;
