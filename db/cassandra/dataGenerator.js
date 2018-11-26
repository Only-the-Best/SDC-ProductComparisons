const path = require("path");
const fs = require("fs");
const stringify = require("csv-stringify/lib/sync");
const csv = require("fast-csv");
const { promisify } = require("util");
const {
  campTitleOptions1,
  campTitleOptions2,
  shirtTitleOptions1,
  shirtTitleOptions2
} = require("./dataTemplate");

const writeFileAsync = promisify(fs.writeFile);

let idCount = 1;

function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number((Math.random() * (max - min)).toFixed(2));
}

function getShirtData(num) {
  const data = [];
  const limit = num + idCount;
  for (idCount; idCount < limit; idCount++) {
    const titlePart1 =
      shirtTitleOptions1[getRandInt(0, shirtTitleOptions1.length - 1)];
    const titlePart2 =
      shirtTitleOptions2[getRandInt(0, shirtTitleOptions2.length - 1)];

    const obj = {
      _id: idCount,
      imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/shirtsResized/S${idCount}.jpg`,
      title: `${titlePart1} ${titlePart2} Shirt`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(10, 85),
      productType: "Shirt"
    };
    data.push(obj);
  }
  return data;
}

function getTentData(num) {
  const data = [];
  const limit = num + idCount;
  for (idCount; idCount < limit; idCount++) {
    const sleepNum = getRandInt(1, 10);
    const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;

    const titlePart1 =
      campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
    const titlePart2 =
      campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

    const obj = {
      _id: idCount,
      imageURL: `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`,
      title: `${titlePart1} ${titlePart2} Tent`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(100, 400),
      sleepingCapacity: sleepCap,
      packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
      numberOfDoors: getRandInt(1, 2),
      bestUse: "Camping",
      productType: "Tent"
    };
    data.push(obj);
  }
  return data;
}

// const start = new Date();

// const generateData = () => {
//   let id = 0;
//   id += 1;
//   const sleepNum = getRandInt(1, 10);
//   const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;

//   const titlePart1 =
//     campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
//   const titlePart2 =
//     campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];
//   return {
//     _id: id,
//     imageURL: `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`,
//     title: `${titlePart1} ${titlePart2} Tent`,
//     ranking: getRandNum(0, 5),
//     reviews: getRandInt(0, 100),
//     price: getRandInt(100, 400),
//     sleepingCapacity: sleepCap,
//     packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
//     numberOfDoors: getRandInt(1, 2),
//     bestUse: "Camping",
//     productType: "Tent"
//   };
// };

// const sdcSeed = () => {
//   console.time('time');
//   const csvStream = csv.createWriteStream({ headers: false });
//   const writableStream = fs.createWriteStream(`${__dirname}/data/products.csv`);

//   csvStream.on("finish", () => {
//     console.log("DONE!!!");
//   });

//   csvStream.pipe(writableStream);
//   for (let i = 0; i < 1000000; i++) {
//     csvStream.write(generateData());
//   }

//   csvStream.end();
//   console.timeEnd("time");
// };

// sdcSeed();

// module.exports = generateData();

const start = new Date();
const promised = [];
fs.readFile("./db/count.txt", "utf-8", (err, data) => {
  let round = Number(data);
  let counter = round * 500000;
  round += 1;
  const inputArr = [];
  for (let j = 0; j < 500000; j += 1) {
    const sleepNum = getRandInt(1, 10);
    const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;
    const titlePart1 =
      campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
    const titlePart2 =
      campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

    const obj = {
      _id: counter,
      imageURL: `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`,
      title: `${titlePart1} ${titlePart2} Tent`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(100, 400),
      sleepingCapacity: sleepCap,
      packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
      numberOfDoors: getRandInt(1, 2),
      bestUse: "Camping",
      productType: "Tent"
    };
    inputArr.push(obj);
    counter += 1;
    fs.writeFile("./db/count.txt", round, (err, data) => {});
  }

  const files = writeFileAsync(
    `db/data/tentsData${round}.csv`,
    stringify(inputArr, { headers: false })
  );

  promised.push(files);
  Promise.all(promised);
  console.log(`Documents inserted in ${(new Date() - start) / 1000.0}s`);
});

// const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
// const fs = require('fs');

// // Define minimum number of songs needed to be generated
// const minSongs = 10000000;

// // Define common file path for all JSON files with filenum prepended to the file names.
// const filePath = `db/data/`;

// // Define path for the CSV file.
// const artistsFile = `${filePath}artists.csv`;

// // A callback for fs functions that throws an error if there was an issue while accessing / modifying the file.
// const throwErr = err => {
//   if (err) {
//     throw err;
//   }
// };

// // Create / clear the files before beginning the data generation and populate it with the column names
// fs.writeFileSync(
//   artistsFile,
//   'artist_id|album_id|artist_name|album_name|album_image|published_year|song_name|song_streams|song_length|song_popularity',
//   throwErr
// );

// // Define empty string which will be populated wtih csv data and then pushed into file
// let entries = '';

// const max = Math.ceil(minSongs / 40);
// let iterations = 0;
// let albumCount = 0;
// let songCount = 0;
// for (let artistId = 1; artistId <= max; artistId += 1) {
//   console.log('Generating artist', artistId);
//   iterations += 1;

//   const artistName = faker.random.words().replace(/['"]+/g, '');

//   // Generate a random number of albums between 3 and 6
//   const albumNumber = faker.random.number({ min: 3, max: 6 });
//   for (let albumId = 1; albumId <= albumNumber; albumId += 1) {
//     albumCount += 1;
//     const albumName = faker.random.words().replace(/['"]+/g, '');
//     const imgNum = faker.random.number({ min: 1, max: 1000 });
//     const albumImage = `https://s3-us-west-1.amazonaws.com/spottyfi/images/${imgNum}.jpeg`;
//     const publishedYear = faker.random.number({ min: 1980, max: 2018 });

//     // Generate a random number of songs between 10 and 13
//     const songNumber = faker.random.number({ min: 10, max: 13 });
//     for (let songId = 1; songId <= songNumber; songId += 1) {
//       songCount += 1;
//       const songName = faker.random.words().replace(/['"]+/g, '');
//       const length = faker.random.number({ min: 30, max: 220 });
//       const popularity = faker.random.number({ min: 1, max: 8 }); // Popularity scale of 1 to 8. This measure is used to sort the popular songs
//       const streams = faker.random.number({ min: 1000, max: 250000000 }); // Streams is the secondary measure used to sort popular songs.

//       // Push a row to entries string with data for all the required columns
//       entries +=
//         `\n${artistId}|${albumId}|'${artistName}'|'${albumName}'|'${albumImage}'` +
//         `|${publishedYear}|'${songName}'|${streams}|${length}|${popularity}`;
//     }
//   }

//   // Writes to file every 5000 rows, or if we have reached the end, and clears the strings.
//   if (iterations === 5000 || artistId === max) {
//     fs.appendFileSync(artistsFile, entries, throwErr);
//     entries = '';
//     iterations = 0;
//   }
// }
// console.log(`NoSQL SEED: ${songCount} songs, ${albumCount} albums, and ${max} artists generated!`);

// const path = require("path");
// const fs = require("fs");

// const campTitleOptions1 = [
//   "REI",
//   "REI Co-op",
//   "Marmot",
//   "Mountain",
//   "Kelty",
//   "Tepui",
//   "Alps",
//   "Himalayan",
//   "Andes",
//   "Karakoram",
//   "Pyrenees",
//   "Sierra",
//   "Tian Shan",
//   "Ural",
//   "Cascade",
//   "Pamir",
//   "Alaska",
//   "Atlas",
//   "Uinta",
//   "Teton",
//   "Sawatch",
//   "Blue Ridge",
//   "Absaroka",
//   "Transantarctic",
//   "Big Agnes"
// ];

// const campTitleOptions2 = [
//   "Limestone",
//   "Kingdom",
//   "Silhouette",
//   "Nature",
//   "Dome",
//   "Hut",
//   "Cabin",
//   "Lair",
//   "Quartz",
//   "Diamond",
//   "Jade",
//   "Howlite",
//   "Trailblazer",
//   "Obsidian",
//   "Coleman",
//   "Vango",
//   "Outwell",
//   "Cabella",
//   "Columbia",
//   "Castle",
//   "Fortress",
//   "Utopia",
//   "Safe Haven"
// ];

// const shirtTitleOptions1 = [
//   "Intrepid",
//   "Sahara",
//   "Stealth",
//   "Bermuda",
//   "Backwoods",
//   "Patagonia",
//   "Bermuda",
//   "Balanced",
//   "All Around",
//   "Silver Woods",
//   "Bronze Ridge",
//   "Skyline",
//   "Shattered",
//   "Avant",
//   "REI Co-op",
//   "Bernal",
//   "Nine Trails",
//   "Lybek",
//   "Recycled",
//   "Columbia",
//   "Active",
//   "True Crew",
//   "Ollivanders"
// ];

// const shirtTitleOptions2 = [
//   "Heathered",
//   "Mountain",
//   "Sweat-Resistant",
//   "Weatherproof",
//   "Sierra Collection",
//   "Lightweight",
//   "Tamiami",
//   "Henley",
//   "High Movement",
//   "Element",
//   "Breathable",
//   "Dry",
//   "Arcteryx",
//   "Middle-Earth",
//   "Asgard",
//   "Atlantis",
//   "Gotham",
//   "Ole",
//   "Trademark",
//   "Mithril"
// ];

// let idCount = 1;

// function getRandInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandNum(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Number((Math.random() * (max - min)).toFixed(2));
// }

// function getShirtData(num) {
//   const data = [];
//   const limit = num + idCount;
//   for (idCount; idCount < limit; idCount++) {
//     const titlePart1 =
//       shirtTitleOptions1[getRandInt(0, shirtTitleOptions1.length - 1)];
//     const titlePart2 =
//       shirtTitleOptions2[getRandInt(0, shirtTitleOptions2.length - 1)];

//     const obj = {
//       _id: idCount,
//       imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/shirtsResized/S${idCount}.jpg`,
//       title: `${titlePart1} ${titlePart2} Shirt`,
//       ranking: getRandNum(0, 5),
//       reviews: getRandInt(0, 100),
//       price: getRandInt(10, 85),
//       productType: "Shirt"
//     };
//     data.push(obj);
//   }
//   return data;
// }

// function getTentData(num) {
//   const data = [];
//   const limit = num + idCount; // 5005 + 1
//   for (idCount; idCount < limit; idCount++) {
//     // 1 1 < 5006

//     const sleepNum = getRandInt(1, 10);
//     const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;

//     const titlePart1 =
//       campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
//     const titlePart2 =
//       campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

//     const obj = {
//       _id: idCount,
//       imageURL: `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`,
//       title: `${titlePart1} ${titlePart2} Tent`,
//       ranking: getRandNum(0, 5),
//       reviews: getRandInt(0, 100),
//       price: getRandInt(100, 400),
//       sleepingCapacity: sleepCap,
//       packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
//       numberOfDoors: getRandInt(1, 2),
//       bestUse: "Camping",
//       productType: "Tent"
//     };
//     data.push(obj);
//   }
//   return data;
// }

// const start = new Date();
// const minRecords = 10000000;

// const filePath = `db/data/`;

// const recordsFile = `${filePath}products.csv`;

// const throwErr = err => {
//   if (err) {
//     throw err;
//   }
// };

// fs.writeFileSync(
//   recordsFile,
//   "product_id|imgURL|title|ranking|reviews|price|sleepingCapacity|packagedWeight|numberOfDoors|bestUse|productType",
//   throwErr
// );

// let entries = "";

// const max = Math.ceil(minRecords / 40);
// let iterations = 0;
// // const productCount = 0;

// for (let productId = 1; productId <= max; productId += 1) {
//   iterations += 1;
//   for (let i = 0; i < 10; i += 1) {
//     const sleepNum = getRandInt(1, 10);
//     const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;
//     const
//     const titlePart1 =
//       campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
//     const titlePart2 =
//       campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

//     const imageURL = `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`;
//     const title = `${titlePart1} ${titlePart2} Tent`;
//     const ranking = getRandNum(0, 5);
//     const reviews = getRandInt(0, 100);
//     const price = getRandInt(100, 400);
//     const sleepingCapacity = sleepCap;
//     const packagedWeight = `${getRandInt(12, 25)} lbs. ${getRandInt(
//       0,
//       16
//     )} oz.`;
//     const numberOfDoors = getRandInt(1, 2);
//     const bestUse = "Camping";
//     const productType = "Tent";

//     entries +=
//       `\n${iterations}|${imageURL}|'${title}'|'${ranking}'|'${reviews}'` +
//       `|${price}|'${sleepingCapacity}'|${packagedWeight}|${numberOfDoors}|${bestUse}|${productType}`;
//   }
//   if (iterations === 5000 || productId === max) {
//     fs.appendFileSync(recordsFile, entries, throwErr);
//     entries = "";
//     iterations = 0;
//   }
// }

