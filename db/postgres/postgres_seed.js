const { Pool, Client } = require("pg");
const fs = require("fs");
// const config = require("./config.json");

const connect = "postgresql://jack:@localhost:5432/sdcproducts";
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

db.query(createQuery)
  .then(res => {
    console.log("CREATE TABLE SUCCESS", res.command);
    db.end();
  })
  .catch(err => {
    console.log(err);
    db.end();
  });

const csvSeed = "copy TENTS FROM '/home/jack/HRR34/SDC-ProductComparisons/data.csv' WITH CSV";

db.query(csvSeed)
  .then(res => {
    console.log(res);
    db.end();
  })
  .catch(err => {
    console.log(err);
    db.end();
  });

