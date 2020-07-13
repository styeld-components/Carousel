const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

const generateRandomFavorites = () => {
  let randomNumberOfFaves = Math.floor(Math.random() * 10);
  let favorites = Array(randomNumberOfFaves);

  if (randomNumberOfFaves === 0) {
    return [];
  }

  for (let i = 0; i < randomNumberOfFaves; i++) {
    favorites[i] = Math.ceil(Math.random() * 10000000);
  }

  return favorites;
}

const listsGen = (start, end, fileNum) => {
  var writer = csvWriter();
  writer.pipe(fs.createWriteStream(`./csv/lists${fileNum}.csv`));
  for (var i = start; i <= end; i++) {
    writer.write({
      userId: faker.random.number({min: 1, max: 300}),
      username: faker.lorem.word(),
      listId: faker.random.number,
      listName: faker.lorem.word(),
      favorites: generateRandomFavorites()
    })
  }

  writer.end();
  console.log('lists seed done');
}

listsGen(1, 1500000, 1);
console.log('reached 1M files');
listsGen(1500001, 2500000, 1);

// listsGen(2500001, 4000000, 2);
// console.log('reached 4M files');
// listsGen(4000001, 5000000, 2);


// listsGen(5000001, 6000000, 3);
// console.log('reached 6M files');
// listsGen(6000001, 7500000, 3);

// listsGen(7500001, 9000000, 4);
// console.log('reached 9M files');
// listsGen(9000001, 10000000, 4);
