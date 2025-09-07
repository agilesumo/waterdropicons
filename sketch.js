//

const ONE_PERCENT_WEIGHT = 6;

const WASH_MACHINE_PERCENT = 11;
const SHOWER_PERCENT = 14;
const TUB_PERCENT = 15;
const TOILET_PERCENT = 28;
const TAP_PERCENT = 32;
const ICON_SIZE = 50;
const BASE_Y_LOCATION = 30;

let washMachineObject;
let showerObject;
let tubObject;
let toiletObject;
let tapObject;

let imageShower;
let imgToilet;
let imgTub;
let imgTap;
let imgWashMachine;

let imgWaterDrop;

// Load the image.
function preload() {
  imgWashMachine = loadImage("/assets/washing_machine.png");

  imgToilet = loadImage("/assets/toilet.png");
  imgShower = loadImage("/assets/shower.png");
  imgTap = loadImage("/assets/tap.png");
  imgTub = loadImage("/assets/bathtub.png");
  imgWaterDrop = loadImage("/assets/water-drop.png");
}

function setup() {
  canvas = createCanvas(512, 512);

  washMachineObject = {
    name: "Washing Machine",
    theImage: imgWashMachine,
    percent: WASH_MACHINE_PERCENT,
    xPosition: 80,
    numberIcons: 2.2,
  };
  showerObject = {
    name: "Shower",
    theImage: imgShower,
    percent: SHOWER_PERCENT,
    xPosition: 140,
    numberIcons: 2.8,
  };
  tubObject = {
    name: "Bathtub",
    theImage: imgTub,
    percent: TUB_PERCENT,
    xPosition: 220,
    numberIcons: 3,
  };
  toiletObject = {
    name: "Toilet",
    theImage: imgToilet,
    percent: TOILET_PERCENT,
    xPosition: 300,
    numberIcons: 5.6,
  };
  tapObject = {
    name: "Tap",
    theImage: imgTap,
    percent: TAP_PERCENT,
    xPosition: 380,
    numberIcons: 6.4,
  };

  noLoop();
}

function draw() {
  //Light Silver background
  background(217, 217, 217);
  drawIcons();
  textSize(25);
  text("%", 5, 10);
  stroke("black");
  strokeWeight(2);
  line(40, 100, 40, 450);
  strokeWeight(1);

  let percentageLabel = 0;
  textAlign(CENTER);
  fill("black");
  textSize(28);
  text("%", 25, 50);
  textSize(18);

  for (i = 100; i <= 450; i += 50) {
    line(35, i, 45, i);
    text(percentageLabel, 15, i);
    percentageLabel += 5;
  }

  for (i = 100; i <= 450; i += 50) {
    stroke("#7393B3");
    strokeWeight(1);
    line(45, i, 450, i);
  }
}

function drawIcons() {
  drawIcon(washMachineObject);
  drawIcon(showerObject);
  drawIcon(tubObject);
  drawIcon(toiletObject);
  drawIcon(tapObject);
}

function drawIcon(category) {
  if (over(category)) {
    print("Worked");
    tint(175, 180);
    fill("black");
    stroke("yellow");
    strokeWeight(3);
    textSize(28);
    textStyle(BOLD);

    textAlign(CENTER);
    text(
      category.name + " : " + category.percent + " %",
      width / 2,
      height - 25
    );
    textStyle(NORMAL);
  } else {
    noTint();
  }

  image(category.theImage, category.xPosition, 30, ICON_SIZE, ICON_SIZE);

  drawWaterDrops(category);
  loop();
}

function drawWaterDrops(category) {
  let yPosition = 100;
  for (i = 0; i < Math.floor(category.numberIcons); i++) {
    image(imgWaterDrop, category.xPosition, yPosition, ICON_SIZE, ICON_SIZE);
    yPosition += 50;
  }

  partialIconPercent = category.numberIcons - Math.floor(category.numberIcons);
  roundedPercentage = Math.round(partialIconPercent * 10) / 10;
  print(roundedPercentage);
  if (roundedPercentage >= 0.1) {
    image(imgWaterDrop, category.xPosition, yPosition, ICON_SIZE, ICON_SIZE);
    strokeWeight(0);
    fill(217, 217, 217);

    print("y position is" + yPosition);
    rect(
      category.xPosition,
      yPosition + ICON_SIZE * roundedPercentage,
      ICON_SIZE,
      ICON_SIZE * (1 - roundedPercentage)
    );
  }
}

function over(category) {
  if (
    mouseX > category.xPosition &&
    mouseX < category.xPosition + ICON_SIZE &&
    mouseY > BASE_Y_LOCATION &&
    mouseY < 100 + ICON_SIZE * category.numberIcons
  ) {
    print("Worked true");

    return true;
  } else {
    print("Worked false");

    return false;
  }
}
