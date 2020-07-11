DROP DATABASE carousel;
CREATE DATABASE carousel;

\connect carousel;

CREATE TABLE places (
  placeId SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  zipcode INT(10) NOT NULL,
  placeType VARCHAR(30) NOT NULL,
  numberBeds SMALLINT NOT NULL,
  price SMALLINT NOT NULL,
  rating DECIMAL NOT NULL,
  totalReviews SMALLINT NOT NULL,
  picUrl VARCHAR(2000) NOT NULL,
  placeUrl VARCHAR(2000) NOT NULL,
  superHost BOOLEAN NOT NULL,
  hostPlus BOOLEAN NOT NULL
);

CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  userName VARCHAR(20) NOT NULL
);

CREATE TABLE lists (
  listId SERIAL PRIMARY KEY,
  listName VARCHAR(20) NOT NULL,
  userId INTEGER NOT NULL REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE favorites (
  favoriteId SERIAL PRIMARY KEY,
  placeId INTEGER REFERENCES places (placeId) ON DELETE CASCADE,
  listId INTEGER REFERENCES lists (listId) ON DELETE CASCADE
);