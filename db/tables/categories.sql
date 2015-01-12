CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image varchar(255) NOT NULL
);
