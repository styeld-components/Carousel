const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

const writePlaces = fs.createWriteStream('./csv/places.csv');
writePlaces.write('zipcode,numberBeds,price,hostPlus,picUrl,placeId,placeType,placeUrl,rating,superHost,title,totalReviews\n', 'utf8');

const titleAdjs = ['Spacious', 'Cozy', 'Artistic', 'Private', 'Charming', 'Lovely'];
const titleNouns = ['Room', 'Treehouse', 'Cabin', 'Home', 'Cottage', 'Bed & Breakfast'];
const placeTypes = ['Camper/RV', 'Entire house', 'Entire townhouse', 'Entire condominium', 'Entire guesthouse', 'Entire guest suite', 'private room', 'apartment'];

const placesGen = (writer, encoding, callback) => {
  let i = 80e6;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let numBeds = Math.ceil(Math.random() * 10);
      let booleans = [true, false];
      let bed = numBeds === 1 ? 'bed' : 'beds';

    if (i % 2000000 === 0) {
      console.log(i);
    }
    const zipcode = faker.address.zipCode("#####");
    const numberBeds = `${numBeds} ${bed}`;
    const price = faker.random.number({min: 29, max: 900});
    const hostPlus = faker.random.arrayElement(booleans);
    const picUrl = faker.image.city();
    const placeId = id;
    const placeType = faker.random.arrayElement(placeTypes);
    const placeUrl = "https://www.youtube.com/";
    const rating = faker.finance.amount(1, 5, 2);
    const superHost = faker.random.arrayElement(booleans);
    const title = `${faker.random.arrayElement(titleAdjs)} ${faker.random.arrayElement(titleNouns)}`;
    const totalReviews = faker.random.number(1000);
    const data = `${zipcode},${numberBeds},${price},${hostPlus},${picUrl},${placeId},${placeType},${placeUrl},${rating},${superHost},${title},${totalReviews}\n`;
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

placesGen(writePlaces, 'utf-8', () => {
  writePlaces.end();
  console.log('done!')
});

// const placesGen = (start, end, fileNum) => {
//   var writer = csvWriter();
//   writer.pipe(fs.createWriteStream(`./csv/places${fileNum}.csv`));


//   const titleAdjs = ['Spacious', 'Cozy', 'Artistic', 'Private', 'Charming', 'Lovely'];
//   const titleNouns = ['Room', 'Treehouse', 'Cabin', 'Home', 'Cottage', 'Bed & Breakfast'];
//   const placeTypes = ['Camper/RV', 'Entire house', 'Entire townhouse', 'Entire condominium', 'Entire guesthouse', 'Entire guest suite', 'private room', 'apartment'];

//   for (var i = start; i <= end; i++) {

//     let numBeds = Math.ceil(Math.random() * 10)
//     let bed = numBeds === 1 ? 'bed' : 'beds';
//     let booleans = [true, false];

//     if (i % 100000 === 0) {
//       console.log(i);
//     }

//     writer.write({
//       zipcode: faker.address.zipCode("#####"),
//       numberBeds: `${numBeds} ${bed}`,
//       price: faker.random.number({min: 29, max: 900}),
//       hostPlus: faker.random.arrayElement(booleans),
//       picUrl: faker.image.city(),
//       placeId: i,
//       placeType: faker.random.arrayElement(placeTypes),
//       placeUrl: "https://www.youtube.com/",
//       rating: faker.finance.amount(1, 5, 2),
//       superHost: faker.random.arrayElement(booleans),
//       title: `${faker.random.arrayElement(titleAdjs)} ${faker.random.arrayElement(titleNouns)}`,
//       totalReviews: faker.random.number(1000)
//     })
//   }

//   writer.end();
//   console.log(`places seed done, file ${fileNum}`);
// };


