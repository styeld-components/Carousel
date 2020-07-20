const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

// const favoritesGen = (start, end, fileNum) => {
//   var writer = csvWriter();
//   writer.pipe(fs.createWriteStream(`./csv/favorites${fileNum}.csv`));

//   for (var i = start; i <= end; i++) {
//     writer.write({
//       favoriteId: faker.random.number(10),
//       placeId: faker.random.number(10000000),
//       listId: faker.random.number(10)
//     })
//   }

//   writer.end();
//   console.log(`favorites seed done, file ${fileNum}`);
// }

const writeFavorites = fs.createWriteStream('./csv/favorites2.csv');
writeFavorites.write('favoriteId,placeId,listId\n', 'utf8');

const favoritesGen = (writer, encoding, callback) => {
  let i = 1e6;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const favoriteId = id;
      const placeId = faker.random.number({min: 1, max: 70000000});
      const listId = faker.random.number({min: 1, max: 14999999});
      const data = `${favoriteId},${placeId},${listId}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

favoritesGen(writeFavorites, 'utf-8', () => {
  writeFavorites.end();
  console.log('done!')
});