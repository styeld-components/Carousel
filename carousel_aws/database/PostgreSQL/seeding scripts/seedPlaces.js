const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

const placesGen = (start, end, fileNum) => {
  var writer = csvWriter();
  writer.pipe(fs.createWriteStream(`./csv/places${fileNum}.csv`));

  const titleAdjs = ['Spacious', 'Cozy', 'Artistic', 'Private', 'Charming', 'Lovely'];
  const titleNouns = ['Room', 'Treehouse', 'Cabin', 'Home', 'Cottage', 'Bed & Breakfast'];
  const placeTypes = ['Camper/RV', 'Entire house', 'Entire townhouse', 'Entire condominium', 'Entire guesthouse', 'Entire guest suite', 'private room', 'apartment'];

  for (var i = start; i <= end; i++) {

    if (i % 100000 === 0) {
      console.log(i);
    }

    let numBeds = Math.ceil(Math.random() * 10)
    let bed = numBeds === 1 ? 'bed' : 'beds';
    let booleans = [true, false];

    writer.write({
      placeId: i,
      title: `${faker.random.arrayElement(titleAdjs)} ${faker.random.arrayElement(titleNouns)}`,
      zipcode: faker.address.zipCode("#####"),
      placeType: faker.random.arrayElement(placeTypes),
      numberBeds: `${numBeds} ${bed}`,
      price: faker.random.number({min: 29, max: 900}),
      rating: faker.finance.amount(1, 5, 2),
      totalReviews: faker.random.number(1000),
      picUrl: faker.image.city(),
      placeUrl: "https://www.youtube.com/",
      superHost: faker.random.arrayElement(booleans),
      hostPlus: faker.random.arrayElement(booleans)
    })
  }

  writer.end();
  console.log(`places seed done, file ${fileNum}`);
}

// placesGen(1, 2500000, 1);
// placesGen(2500001, 5000000, 2);
// placesGen(5000001, 7500000, 3);
placesGen(7500001, 10000000, 4);