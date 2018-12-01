// require("newrelic");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const { Tent, Shirt } = require("../db/index.js");
const { Pool, Client } = require("pg");

const connect = "postgre://jack:@localhost:5432/sdcproducts";
const db = new Client(connect);
db.connect();
// db.query("SELECT * FROM tents OFFSET floor(random() * 1000) LIMIT 5").then(
//   resp => {
//     console.log("resp is", resp);
//   }
// );
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`, { maxAge: "365d" })); // setting cache heading to save this file on your computer for a year and if a file requests then do'nt get it just use the saved copy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes-Endpoints
app.get("/product/:id", (req, res) => {
  const file = path.join(`${__dirname}/../client/dist/index.html`);
  res.sendFile(file); // When using sendFile if you have '..' in the file name the browser thinks its malicious. Need to use path.join or path.resolve to bypass'
});

app.get("/product/data/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.query(`SELECT * FROM tents WHERE id = ${id}`)
    .then(resp => {
      console.log("resp.rows is ", resp.rows[0]);
      res.send(resp.rows[0]);
    })
    .catch(() =>
      res.status(500).send("BEEP: could not receive GET request - ")
    );
});

app.get("/data/tents", (req, res) => {
  db.query("SELECT * FROM tents OFFSET floor(random() * 1000) LIMIT 5")
    .then(resp => {
      console.log("Fetching tents Arr..", resp.rows);
      res.send(resp.rows);
    })
    .catch(() =>
      res.status(500).send("BEEP: could not receive GET request - ")
    );
});

const port = 8082;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// /////////////////////////////////////////////////////
// app.get("/product/data/:id", (req, res) => {
//   const { id } = req.params;
//   const model = id <= 51 ? Tent : Shirt;

//   model
//     .find({ _id: id })
//     .exec()
//     .then(item => res.status(200).send(item))
//     .catch(err => console.log("error", err));
// });

// app.get("/data/shirts", (req, res) => {
//   Shirt.aggregate([{ $sample: { size: 4 } }]).exec((err, data) => {
//     if (err) {
//       console.log("Server Error", err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.get("/data/tents", (req, res) => {
//   Tent.aggregate([{ $sample: { size: 5 } }]).exec((err, data) => {
//     if (err) {
//       console.log("Server Error", err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// const port = process.env.PORT || 3000;
// const port = 8081;
// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });
