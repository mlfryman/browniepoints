CREATE OR REPLACE FUNCTION find_categories ()
RETURNS TABLE ("categoryId" INTEGER, "name" VARCHAR, "image" VARCHAR) AS $$
DECLARE

BEGIN
  RETURN QUERY
    SELECT c.id AS "categoryId", c.name AS "name", c.image AS "image"
    FROM categories c
    ORDER BY c.name;

END;
$$ LANGUAGE plpgsql;
