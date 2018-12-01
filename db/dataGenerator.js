// const path = require("path");
const fs = require("fs");
// const stringify = require("csv-stringify/lib/sync");
const csv = require("fast-csv");
const { generateData } = require("./data_generator.js");
// const { promisify } = require("util");

// const appendFileAsync = promisify(fs.appendFile);

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

// const start = new Date();
// const promised = [];
// fs.readFile("./db/count.txt", "utf-8", (err, data) => {
//   let round = Number(data);
//   let counter = round * 500000;
//   round += 1;
//   const inputArr = [];
//   for (let j = 0; j < 500000; j += 1) {
//     const sleepNum = getRandInt(1, 10);
//     const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;
//     const titlePart1 =
//       campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
//     const titlePart2 =
//       campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

//     const obj = {
//       _id: counter,
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
//     inputArr.push(obj);
//     counter += 1;
//     fs.writeFile("./db/count.txt", round, (err, data) => {});
//   }

//   const files = appendFileAsync(
//     `db/data/tentsData${round}.csv`,
//     stringify(inputArr, { headers: false })
//   );

//   promised.push(files);
//   Promise.all(promised);
//   console.log(`Documents inserted in ${(new Date() - start) / 1000.0}s`);
// });

// const fs = require("fs");
// const faker = require("faker");
// const csv = require("fast-csv");
// const {
//   campTitleOptions1,
//   campTitleOptions2,
//   shirtTitleOptions1,
//   shirtTitleOptions2
// } = require("./dataTemplate");

// let idCount = 1;

// const generateData = () => {
//   idCount++;
//   const sleepNum = getRandInt(1, 10);
//   const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;
//   const titlePart1 =
//     campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
//   const titlePart2 =
//     campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];
//   return {
//     _id: idCount,
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

const startTime = new Date();
// console.time("Generatedata");

const generateCSVFile = async () => {
  // console.time("Start generating data");
  const csvStream = csv.createWriteStream({ headers: false, objectMode: true });
  const writableStream = fs.createWriteStream("db/data/data.csv");
  writableStream.on("finish", () => {
    console.time("Generated CSV file");
  });
  csvStream.pipe(writableStream);
  for (let i = 0; i < 10000000; i += 1) {
    csvStream.write(generateData());
  }
  csvStream.end();
  // await console.timeEnd("Done generating data");
};

generateCSVFile();
// console.timeEnd("Generatedata");
console.log(
  `Finished generating data in ${(new Date() - startTime) / 1000.0}s`
);
