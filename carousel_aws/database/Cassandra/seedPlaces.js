const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

const placesGen = (start, end, fileNum) => {
  var writer = csvWriter();
  writer.pipe(fs.createWriteStream(`./csv/places${fileNum}.csv`));

  for (var i = start; i <= end; i++) {

    let numBeds = Math.ceil(Math.random() * 10)
    let bed = numBeds === 1 ? 'bed' : 'beds';

    writer.write({
      placeId: i,
      title: faker.lorem.word(3),
      zipcode: faker.address.zipCode(),
      placeType: faker.lorem.word(2),
      numberBeds: `${numBeds} ${bed}`,
      price: faker.random.number({min: 29, max: 900}),
      rating: faker.finance.amount(1, 5, 2),
      totalReviews: faker.random.number(1000),
      picUrl: faker.image.city(),
      placeUrl: "https://www.youtube.com/",
      SuperHost: faker.random.boolean(),
      HostPlus: faker.random.boolean()
    })
  }

  writer.end();
  console.log(`places seed done, file ${fileNum}`);
}

placesGen(1, 1500000, 1);
console.log('reached 1M files');
placesGen(1500001, 2500000, 1);

// placesGen(2500001, 4000000, 2);
// console.log('reached 4M files');
// placesGen(4000001, 5000000, 2);


// placesGen(5000001, 6000000, 3);
// console.log('reached 6M files');
// placesGen(6000001, 7500000, 3);

// placesGen(7500001, 9000000, 4);
// console.log('reached 9M files');
// placesGen(9000001, 10000000, 4);