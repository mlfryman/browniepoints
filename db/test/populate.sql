INSERT INTO users (username,email,password,avatar,token) VALUES ('a1','b1','c','d','e');
INSERT INTO users (username,email,password,avatar,token) VALUES ('a2','b2','c','d','e');
INSERT INTO users (username,email,password,avatar,token) VALUES ('a3','b3','c','d','e');

DELETE FROM users;

INSERT INTO users (id,username,email,password,token, gravatar) VALUES (1,'bob','bob@boberson.com','$2a$08$R.0AulVHGikMqIPKdfpcPuPLzJwRoR.VRZElIEzfk5gVkvp5MiEMG','07d6e56b9a6d8bd7f0cdd9fbd36d221a703478c2', 'https://secure.gravatar.com/avatar/0c934e4e58e1a5ec2fda2c6b400b8c7c?s=200&d=mm&f=y');
INSERT INTO users (id,username,email,password,token, gravatar) VALUES (2,'mlfryman','melanie@fryman.io','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','fec8ec65e054c0b86c6e63c81300b16f6db65a3f', 'https://secure.gravatar.com/avatar/f090511516ed452381f275e5f4bad4bf?s=200&d=mm&f=y');
