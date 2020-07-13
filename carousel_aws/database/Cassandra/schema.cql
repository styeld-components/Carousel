CREATE KEYSPACE IF NOT EXISTS carousel
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor': 1
  };

USE carousel;

CREATE TABLE places (
  placeId int,
  title text,
  zipcode smallint,
  placeType text,
  numberBeds smallint,
  price smallint,
  rating decimal,
  totalReviews smallint,
  picUrl text,
  placeUrl text,
  superHost boolean,
  hostPlus boolean,
  PRIMARY KEY ((zipcode, numberBeds), price)
);

CREATE TABLE lists (
  userId int,
  username text,
  listId int,
  listName text,
  favorites set<int>,
  PRIMARY KEY ((userId), listId)
);

