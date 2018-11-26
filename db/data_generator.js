const {
  campTitleOptions1,
  campTitleOptions2,
  shirtTitleOptions1,
  shirtTitleOptions2
} = require("./dataTemplate");

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

let idCount = 1;

const generateData = () => {
  idCount += 1;
  const sleepNum = getRandInt(1, 10);
  const sleepCap = sleepNum > 7 ? `8+ people` : `${sleepNum}-person`;
  const titlePart1 =
    campTitleOptions1[getRandInt(0, campTitleOptions1.length - 1)];
  const titlePart2 =
    campTitleOptions2[getRandInt(0, campTitleOptions2.length - 1)];
  return {
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
};

module.exports.generateData = generateData;
