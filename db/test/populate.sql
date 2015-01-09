INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar) VALUES (1,'Bob','Boberson','bob','bob@boberson.com','$2a$08$R.0AulVHGikMqIPKdfpcPuPLzJwRoR.VRZElIEzfk5gVkvp5MiEMG','07d6e56b9a6d8bd7f0cdd9fbd36d221a703478c2', 'https://secure.gravatar.com/avatar/0c934e4e58e1a5ec2fda2c6b400b8c7c?s=200&d=mm&f=y');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar) VALUES (2,'Melanie','Fryman','mlfryman','melanie@fryman.io','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','fec8ec65e054c0b86c6e63c81300b16f6db65a3f', 'https://secure.gravatar.com/avatar/f090511516ed452381f275e5f4bad4bf?s=200&d=mm&f=y');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar) VALUES (3,'Buffy','Summers','buffy','buffy@summers.com','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','0f1d09709ae9e1ff231543bd03af788d3f01caf7', 'https://secure.gravatar.com/avatar/1aa1794dcc995b5a05e7b6a72c814840?s=200&d=mm&f=y');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar) VALUES (4,'William','Bloody','spike','spike@bloody.com','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','15fb7e6e7433d5c3d091d1237dd854de6cb89a7a', 'https://secure.gravatar.com/avatar/bb6af860d783b50f7247d18cde79bd5d?s=200&d=mm&f=y');

INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (13, 1, 3);
INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (14, 1, 4);
INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (23, 3, 2);
INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (34, 4, 3);

UPDATE friendships SET accepted = TRUE WHERE id = 13;
UPDATE friendships SET accepted = TRUE WHERE id = 23;
