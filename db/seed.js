const { Tent, Shirt, db } = require('./index.js');
const path = require('path');
const fs = require('fs');

// db.dropCollection('tents', ()=>{});
// db.dropCollection('shirts', ()=>{});

let campTitleOptions1 = ['REI', 'REI Co-op', 'Marmot', 'Mountain', 'Kelty', 'Tepui', 'Alps', 'Himalayan', 'Andes', 'Karakoram', 'Pyrenees', 'Sierra', 'Tian Shan', 'Ural', 'Cascade', 'Pamir', 'Alaska', 'Atlas', 'Uinta', 'Teton', 'Sawatch', 'Blue Ridge', 'Absaroka', 'Transantarctic', 'Big Agnes'];

let campTitleOptions2 = ['Limestone', 'Kingdom', 'Silhouette', 'Nature', 'Dome', 'Hut', 'Cabin', 'Lair', 'Quartz', 'Diamond', 'Jade', 'Howlite', 'Trailblazer', 'Obsidian', 'Coleman', 'Vango', 'Outwell', 'Cabella', 'Columbia', 'Castle', 'Fortress', 'Utopia', 'Safe Haven'];

let shirtTitleOptions1 = ['Intrepid', 'Sahara', 'Stealth', 'Bermuda', 'Backwoods', 'Patagonia', 'Bermuda', 'Balanced', 'All Around', 'Silver Woods', 'Bronze Ridge', 'Skyline', 'Shattered', 'Avant', 'REI Co-op', 'Bernal', 'Nine Trails', 'Lybek', 'Recycled', 'Columbia', 'Active', 'True Crew', 'Ollivanders'];

let shirtTitleOptions2 = ['Heathered', 'Mountain', 'Sweat-Resistant', 'Weatherproof', 'Sierra Collection', 'Lightweight', 'Tamiami', 'Henley', 'High Movement', 'Element', 'Breathable', 'Dry', 'Arcteryx', 'Middle-Earth', 'Asgard', 'Atlantis', 'Gotham', 'Ole', 'Trademark', 'Mithril'];

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
  let data = [];
  let limit = num + idCount;
  for(idCount; idCount < limit; idCount++) {

    let titlePart1 = shirtTitleOptions1[getRandInt(0, shirtTitleOptions1.length - 1)];
    let titlePart2 = shirtTitleOptions2[getRandInt(0, shirtTitleOptions2.length - 1)];

    let obj = {
      _id: idCount,
      imageURL: `https://s3-us-west-2.amazonaws.com/fec-project/shirtsResized/S${idCount}.jpg`,
      title: `${titlePart1} ${titlePart2} Shirt`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(10, 85),
      productType: 'Shirt'
    }
    data.push(obj);
  }
  return data;
}

function getTentData(num) {
  let data = [];
  let limit = num + idCount; //5005 + 1
  for(idCount; idCount < limit; idCount++) { // 1 1 < 5006

    let sleepNum = getRandInt(1, 10);
    let sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`

    let titlePart1 = campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
    let titlePart2 = campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

    let obj = {
      _id: idCount,
      imageURL: `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`,
      title: `${titlePart1} ${titlePart2} Tent`,
      ranking: getRandNum(0, 5),
      reviews: getRandInt(0, 100),
      price: getRandInt(100, 400),
      sleepingCapacity: sleepCap,
      packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
      numberOfDoors: getRandInt(1, 2),
      bestUse: 'Camping',
      productType: 'Tent'
    }
    data.push(obj);
  }
  return data;
}

const job_name = 'Job#1';
const start = new Date();

async function seedDB(outer, inner) {
  let counter = 0;
  for (let j = 0; j < outer; j++) {
    let inputArr = [];
    for (let i = 0; i < inner; i++) {
      let sleepNum = getRandInt(1, 10);
      let sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`

      let titlePart1 = campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
      let titlePart2 = campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];

      let obj = {
        _id: counter,
        imageURL: `http://artist-3d.com/free_3d_models/uploads/graphic-design-study-sample-img.jpg`,
        title: `${titlePart1} ${titlePart2} Tent`,
        ranking: getRandNum(0, 5),
        reviews: getRandInt(0, 100),
        price: getRandInt(100, 400),
        sleepingCapacity: sleepCap,
        packagedWeight: `${getRandInt(12, 25)} lbs. ${getRandInt(0, 16)} oz.`,
        numberOfDoors: getRandInt(1, 2),
        bestUse: 'Camping',
        productType: 'Tent'
      }
        inputArr.push(obj);
        counter++;
    }
    console.log(`${job_name} inserted ${counter} documents in ${(new Date() - start)/1000.0}s`);
    await Tent.insertMany(inputArr);
  }
}  

seedDB(1000, 10000)
.then(
  ()=> console.log(`${job_name} inserted ${1000*10000} documents in ${(new Date() - start)/1000.0}s`)
)
