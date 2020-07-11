CREATE KEYSPACE IF NOT EXISTS carousel
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor': 1
  };

USE carousel;

CREATE TABLE places (
  placeId uuid,
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
)

/* GET user fav lists, POST room to fav list, DELETE room from fav list */
CREATE TABLE favorites (
  userId uuid,
  username text,
  listId uuid,
  listName text,
  placeId int,
  PRIMARY KEY ((userId), listId, placeId)
);

/* POST new fav list  */
CREATE TABLE lists (
  userId uuid,
  username text,
  listId uuid,
  list text,
  PRIMARY KEY ((userId), listId)
);
