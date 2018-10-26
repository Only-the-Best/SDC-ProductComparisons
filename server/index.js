const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Tent, Shirt } = require('../db/index.js');
// const { tentData, shirtData } = require('../db/seed.js');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));



let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});