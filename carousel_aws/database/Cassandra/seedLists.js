const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

const writeLists = fs.createWriteStream('./csv/lists.csv');
writeLists.write('userId,listId,favorites,listName,username\n', 'utf8');

const generateRandomFavorites = () => {
  let randomNumberOfFaves = Math.floor(Math.random() * 10);
  let favorites = Array(randomNumberOfFaves);

  if (randomNumberOfFaves === 0) {
    return "[]";
  }

  for (let i = 0; i < randomNumberOfFaves; i++) {
    favorites[i] = Math.ceil(Math.random() * 10000000);
  }

  let joined = "[" + favorites.join(",") + "]";

  return joined;
}

const getUsername = () => {
  const random = faker.lorem.word();

  if (random === "") {
    random = "lilmeimei"
  }

  return random;
}

// const listsGen = (start, end) => {
//   var writer = csvWriter();
//   writer.pipe(fs.createWriteStream(`./csv/lists.csv`));

//   let listnames = ['Honeymoon', 'Next Spring', 'Vacation', 'Vacay with the kids', 'Weekend Getaway!', 'Winter Retreat'];

//   for (var i = start; i <= end; i++) {
//     writer.write({
//       userId: faker.random.number({min: 1, max: 500000}),
//       listId: faker.random.number(10),
//       favorites: generateRandomFavorites(),
//       listName: faker.random.arrayElement(listnames),
//       username: getUsername()
//     })
//   }

//   writer.end();
//   console.log('lists seed done');
// }

// listsGen(1, 500);
let listnames = ['Honeymoon', 'Next Spring', 'Vacation', 'Vacay with the kids', 'Weekend Getaway!', 'Winter Retreat'];

const listsGen = (writer, encoding, callback) => {
  let i = 50e6;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const userId = faker.random.number({min: 1, max: 10e6});
      const listId = id;
      const favorites = JSON.stringify(generateRandomFavorites());
      const listName = faker.random.arrayElement(listnames);
      const username = getUsername();
      const data = `${userId},${listId},${favorites},${listName},${username}\n`;
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

listsGen(writeLists, 'utf-8', () => {
  writeLists.end();
  console.log('done!')
});



