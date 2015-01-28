INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar,avatar) VALUES (1,'Han','Solo','Solo','han@solo.io','$2a$08$R.0AulVHGikMqIPKdfpcPuPLzJwRoR.VRZElIEzfk5gVkvp5MiEMG','07d6e56b9a6d8bd7f0cdd9fbd36d221a703478c2', 'https://secure.gravatar.com/avatar/0c934e4e58e1a5ec2fda2c6b400b8c7c?s=200&d=mm&f=y', 'https://dl.dropboxusercontent.com/u/1699691/avatars/solo.png');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar,avatar) VALUES (2,'Chewbacca','son of Attichitcuk','Chewie','chewie@bacca.com','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','fec8ec65e054c0b86c6e63c81300b16f6db65a3f', 'https://secure.gravatar.com/avatar/f090511516ed452381f275e5f4bad4bf?s=200&d=mm&f=y', 'https://dl.dropboxusercontent.com/u/1699691/avatars/chewie.png');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar,avatar) VALUES (3,'Anakin','Skywalker','Darth Vader','darth@vader.ninja','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','0f1d09709ae9e1ff231543bd03af788d3f01caf7', 'https://secure.gravatar.com/avatar/1aa1794dcc995b5a05e7b6a72c814840?s=200&d=mm&f=y', 'https://dl.dropboxusercontent.com/u/1699691/avatars/darth.png');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar,avatar) VALUES (4,'Luke','Skywalker','Brat','luke@sky.com','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','15fb7e6e7433d5c3d091d1237dd854de6cb89a7a', 'https://secure.gravatar.com/avatar/bb6af860d783b50f7247d18cde79bd5d?s=200&d=mm&f=y', 'https://dl.dropboxusercontent.com/u/1699691/avatars/luke.png');
INSERT INTO users (id,first_name,last_name,username,email,password,token,gravatar,avatar) VALUES (5,'Leia','Skywalker','Princess','leia@sky.io','$2a$08$OQ4iM6SeHJbYfXeQvLnUqefN0ibl1OKDJwfUfBoj1ijJgVq2OFKBK','15fb7e6e7433d5c3d091d1237dd854de6cb89a7a', 'https://secure.gravatar.com/avatar/bb6af860d783b50f7247d18cde79bd5d?s=200&d=mm&f=y', 'https://dl.dropboxusercontent.com/u/1699691/avatars/leia.png');

INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (12, 1, 2);
INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (14, 1, 4);
INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (23, 3, 2);
INSERT INTO friendships (id, friend1_id, friend2_id) VALUES (34, 4, 3);

UPDATE friendships SET accepted = TRUE WHERE id = 12;
UPDATE friendships SET accepted = TRUE WHERE id = 23;

INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES (12, 1, 2, 'Thanks for helping me move!', 20);
INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES (12, 1, 2, 'You broke my lamp. Lame!', -10);
INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES (12, 2, 1, 'Just because!', 10);
INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES (12, 1, 2, 'You disappoint me.', -5);

INSERT INTO categories (id, name, image) VALUES (1, 'Misc', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/present.png');
INSERT INTO categories (id, name, image) VALUES (2, 'Event', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/calendar.png');
INSERT INTO categories (id, name, image) VALUES (3, 'Chores', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/dolly.png');
INSERT INTO categories (id, name, image) VALUES (4, 'Games', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/game.png');
INSERT INTO categories (id, name, image) VALUES (5, 'Movie', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/movie.png');
INSERT INTO categories (id, name, image) VALUES (6, 'Travel', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/car.png');
INSERT INTO categories (id, name, image) VALUES (7, 'Personal', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/heart.png');
INSERT INTO categories (id, name, image) VALUES (8, 'Surprise', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/magicwand.png');
INSERT INTO categories (id, name, image) VALUES (9, 'Concert', 'https://s3.amazonaws.com/mlf-browniepoints-test/categories/music.png');

INSERT INTO prizes (friendship_id, owner_id, from_id, to_id, title, description, cost, category_id) VALUES (12, 1, 1, 2, 'Game night', 'Choose a date for a game night.', 10, 4);
INSERT INTO prizes (friendship_id, owner_id, from_id, to_id, title, description, cost, category_id) VALUES (12, 2, 2, 1, 'Surprise', 'I hope you trust me, because this prize is a surprise!', 25, 8);
INSERT INTO prizes (friendship_id, owner_id, from_id, to_id, title, description, cost, category_id) VALUES (23, 2, 2, 3, 'Picnic', 'Picnic on a day of your choosing.', 60, 1);
INSERT INTO prizes (friendship_id, owner_id, from_id, to_id, title, description, cost, category_id) VALUES (23, 3, 3, 2, 'Black Sabbath', 'Black Sabbath Concert!', 100, 9);
INSERT INTO prizes (friendship_id, owner_id, from_id, to_id, title, description, cost, category_id) VALUES (12, 1, 1, 2, 'Unlimited Hugs', 'You get unlimited hugs for a week.', 35, 7);
