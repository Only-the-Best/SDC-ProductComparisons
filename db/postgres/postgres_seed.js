const { Pool, Client } = require("pg");
const config = require("./config.json");

const table = "tents";

const createQuery = `CREATE TABLE IF NOT EXISTS (
  id SERIAL,
  image VARCHAR(255),
  title VARCHAR(50),
  ranking REAL,
  reviews INT,
  price INT,
  sleeping_capacity VARCHAR(25),
  packaged_Weight VARCHAR(25),
  numberOfDoors INT NOT null,
  bestUse VARCHAR(10),
  productType VARCHAR(25)
  PRIMARY KEY(id))`;

const client = new Client({
  user: config.USER,
  host: config.HOST,
  database: config.DATABASE,
  password: config.PASSWORD,
  port: config.PORT
});

client.connect();
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  user: "dbuser",
  host: "database.server.com",
  database: "mydb",
  password: "secretpassword",
  port: 3211
});
client.connect();

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});

// /////////////////
const executeQuery = targetTable => {
  client.query(`DROP TABLE IF EXISTS ${table}`);
  client.query(createQuery);
  const execute = (target, callback) => {
    client.query(`Truncate ${target}`, err => {
      if (err) {
        client.end();
        callback(err);
      } else {
        console.log(`Truncated ${target}`);
        callback(null, target);
      }
    });
  };
  execute(targetTable, err => {
    if (err) return console.log(`Error in Truncate: ${err}`);
    const stream = client.query(
      copyFrom(`COPY ${table} FROM STDIN (FORMAT CSV)`)
    );
    const fileStream = fs.createReadStream(dataFile);

    fileStream.on("error", error => {
      console.log(`Error in read stream: ${error}`);
    });
    stream.on("error", error => {
      console.log(`Error in creating stream: ${error}`);
    });
    stream.on("end", () => {
      console.log("Completed copy command.");
      client.end();
    });
    fileStream.pipe(stream);
  });
};

executeQuery(table);

// CREATE DATABASE products;

// CREATE TABLE IF NOT EXISTS(
//   id SERIAL,
//   image VARCHAR(255),
//   title VARCHAR(50),
//   ranking REAL,
//   reviews INT,
//   price INT,
//   sleeping_capacity VARCHAR(25),
//   packaged_Weight VARCHAR(25),
//   numberOfDoors INT NOT null,
//   bestUse VARCHAR(10),
//   productType VARCHAR(25)
//   PRIMARY KEY(id)
// )
