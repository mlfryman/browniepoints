CREATE TABLE users(
  id serial PRIMARY KEY,
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password char(60) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  token char(96) NOT NULL,
  gravatar varchar(200),
  first_name varchar(50),
  last_name varchar(50),
  tagline varchar(255),
  points integer NOT NULL DEFAULT 0
);
