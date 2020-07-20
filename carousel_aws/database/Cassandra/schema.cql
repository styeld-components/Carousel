CREATE KEYSPACE IF NOT EXISTS carousel
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor': 1
  };

USE carousel;

CREATE TABLE places1 (
  zipcode text,
  numberBeds text,
  price smallint,
  hostPlus boolean,
  picUrl text,
  placeId int,
  placeType text,
  placeUrl text,
  rating decimal,
  superHost boolean,
  title text,
  totalReviews smallint,
  PRIMARY KEY ((zipcode, numberBeds), price)
);

CREATE TABLE lists (
  userId int,
  listId int,
  favorites set<int>,
  listName text,
  username text,
  PRIMARY KEY ((userId), listId)
);

-- COPY carousel.places FROM '/Users/eleenyeh/carousel_aws2/carousel_aws/database/Cassandra/csv/places.csv' WITH DELIMITER=',' AND HEADER=TRUE;

-- COPY carousel.lists FROM '/Users/eleenyeh/carousel_aws2/carousel_aws/database/Cassandra/csv/lists.csv' WITH DELIMITER=',' AND HEADER=TRUE;