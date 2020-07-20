DROP DATABASE carousel;
CREATE DATABASE carousel;

\connect carousel;

CREATE TABLE places (
  zipcode VARCHAR(6) NOT NULL,
  numberBeds VARCHAR(8) NOT NULL,
  price SMALLINT NOT NULL,
  hostPlus BOOLEAN NOT NULL,
  picUrl VARCHAR(2000) NOT NULL,
  placeId INT PRIMARY KEY,
  placeType VARCHAR(30) NOT NULL,
  placeUrl VARCHAR(2000) NOT NULL,
  rating DECIMAL NOT NULL,
  superHost BOOLEAN NOT NULL,
  title VARCHAR(50) NOT NULL,
  totalReviews SMALLINT NOT NULL
);

CREATE TABLE users (
  userId INT PRIMARY KEY,
  userName VARCHAR(20) NOT NULL
);

CREATE TABLE lists (
  listId INT PRIMARY KEY,
  listName VARCHAR(20) NOT NULL,
  userId INTEGER NOT NULL REFERENCES users (userId) ON DELETE CASCADE
);

CREATE TABLE favorites (
  favoriteId INT PRIMARY KEY,
  placeId INTEGER REFERENCES places (placeId) ON DELETE CASCADE,
  listId INTEGER REFERENCES lists (listId) ON DELETE CASCADE
);

COPY places FROM '/Users/eleenyeh/carousel_aws2/carousel_aws/database/Cassandra/csv/places.csv' DELIMITER ',' CSV HEADER;

COPY users FROM '/Users/eleenyeh/carousel_aws2/carousel_aws/database/PostgreSQL/csv/users.csv' DELIMITER ',' CSV HEADER;

COPY lists FROM '/Users/eleenyeh/carousel_aws2/carousel_aws/database/PostgreSQL/csv/lists.csv' DELIMITER ',' CSV HEADER;

COPY favorites FROM '/Users/eleenyeh/carousel_aws2/carousel_aws/database/PostgreSQL/csv/favorites.csv' DELIMITER ',' CSV HEADER;