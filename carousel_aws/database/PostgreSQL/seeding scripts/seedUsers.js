const fs = require('fs');
const csvWriter = require('csv-write-stream');
var faker = require('faker');

const writeUsers = fs.createWriteStream('./csv/users.csv');
writeUsers.write('userId,username\n', 'utf8');

const getUsername = () => {
  const random = faker.lorem.word();

  if (random === '') {
    random = 'lilmeimei'
  }

  return random;
}

// const usersGen = (start, end, fileNum) => {
//   var writer = csvWriter();
//   writer.pipe(fs.createWriteStream(`./csv//users${fileNum}.csv`));

//   for (var i = start; i <= end; i++) {

//     writer.write({
//       userId: i,
//       userName: getUsername()
//     })
//   }

//   writer.end();
//   console.log(`users seed done, file ${fileNum}`);
// }

// usersGen(1, 5000000, 1);


const usersGen = (writer, encoding, callback) => {
  let i = 5e6;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const userId = id;
      const username = getUsername();

      const data = `${userId},${username}\n`;
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

usersGen(writeUsers, 'utf-8', () => {
  writeUsers.end();
  console.log('done!')
});

