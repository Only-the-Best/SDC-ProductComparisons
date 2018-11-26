const { Pool, Client } = require("pg");
const fs = require("fs");
// const config = require("./config.json");

const table = "tents";

const connect = "postgres://postgres:@localhost:5432/products";
const db = new Client(connect);
db.connect();

const createQuery = `CREATE TABLE IF NOT EXISTS TENTS (
    id INT,
    image VARCHAR(255),
    title VARCHAR(50),
    ranking DECIMAL,
    reviews INT,
    price INT,
    sleeping_capacity VARCHAR(25),
    packaged_Weight VARCHAR(25),
    numberOfDoors INT,
    bestUse VARCHAR(10),
    productType VARCHAR(25)
  )`;

// const client = new Client({
//   user: config.USER,
//   host: config.HOST,
//   database: config.DATABASE,
//   password: config.PASSWORD,
//   port: config.PORT
// });

// db.query(createQuery)
//   .then(res => {
//     console.log("CREATE TABLE SUCCESS", res.command);
//     db.end();
//   })
//   .catch(err => {
//     console.log(err);
//     db.end();
//   });

const csvSeed = `\COPY TENTS FROM '/home/jack/HRR34/SDC-ProductComparisons/data.csv' WITH (FORMAT CSV);`;

db.query(csvSeed)
  .then(res => {
    console.log(res);
    db.end();
  })
  .catch(err => {
    console.log(err);
    db.end();
  });

module.exports = db;

// const executeQuery = targetTable => {
//   client.query("DROP TABLE IF EXISTS details");
//   client.query(createQuery);
//   const execute = (target, callback) => {
//     client.query(`Truncate ${target}`, err => {
//       if (err) {
//         client.end();
//         callback(err);
//       } else {
//         console.log(`Truncated ${target}`);
//         callback(null, target);
//       }
//     });
//   };
//   execute(targetTable, err => {
//     if (err) return console.log(`Error in Truncate: ${err}`);
//     let stream = client.query(
//       copyFrom(`COPY ${table} FROM STDIN (FORMAT CSV)`)
//     );
//     let fileStream = fs.createReadStream(dataFile);
//     fileStream.on("error", error => {
//       console.log(`Error in read stream: ${error}`);
//     });
//     stream.on("error", error => {
//       console.log(`Error in creating stream: ${error}`);
//     });
//     stream.on("end", () => {
//       console.log("Completed copy command.");
//       client.end();
//     });
//     fileStream.pipe(stream);
//   });
// };

// executeQuery(table);
