INSERT INTO users (username,email,password,avatar,token) VALUES ('a1','b1','c','d','e');
INSERT INTO users (username,email,password,avatar,token) VALUES ('a2','b2','c','d','e');
INSERT INTO users (username,email,password,avatar,token) VALUES ('a3','b3','c','d','e');

DELETE FROM users;

INSERT INTO users (id,username,email,password,token) VALUES (1,'bob','bob@boberson.com','$2a$08$R.0AulVHGikMqIPKdfpcPuPLzJwRoR.VRZElIEzfk5gVkvp5MiEMG','tok');
