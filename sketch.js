const scenes = ["menu", "guess"];

let sceneIndex = 0;

let dictionary;
let chosenWord = "";
let formToGuess = 2;
const images = {};

let score = 0;

let backgroundWordsParams = [];
let backgroundWordsObject;

function preload() {
  dictionary = loadJSON("./database.json", () => {
    const x = Object.values(dictionary);
    dictionary = x;
  });

  images.background = loadImage("./assets/background.png");
  images.dialogCloud = loadImage("./assets/dialogCloud.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  init();
  chosenWord = shuffleWord();

  backgroundWordsObject = new BackgroundWords(dictionary);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  backgroundWordsObject.params.forEach((obj) => {
    obj.x = random(0, width);
    obj.y = random(0, height);
  });
}
function draw() {
  image(images.background, 0, 0, width, height);

  backgroundWordsObject.drawBackgroundWords(chosenWord.form1);
  backgroundWordsObject.updateBackgroundWords();
}

function init() {
  const scoreDisplay = createDiv();
  scoreDisplay.id("scoreDisplay");
  scoreDisplay.parent(document.querySelector("header"));

  const scoreP = createP(`Points: ${score}`);
  scoreP.id("scoreP");
  scoreP.parent(scoreDisplay);

  const failInfo = createP("");
  failInfo.id("failInfo");
  failInfo.parent(scoreDisplay);

  const givenWordBox = createDiv();
  givenWordBox.id("givenWordBox");
  givenWordBox.parent(document.querySelector("main"));
  // givenWordBox.center();
  givenWordBox.style("display", "flex");
  givenWordBox.style("flex-direction", "column");
  givenWordBox.style("align-items", "center");
  givenWordBox.style("justify-content", "space-between");
  givenWordBox.style("height", "30%");

  const givenWordBackground = createImg("./assets/dialogCloud.png");
  givenWordBackground.id("givenWordBackground");
  givenWordBackground.parent(givenWordBox);
  givenWordBackground.position(0, 0, "absolute");
  givenWordBackground.style("width", "100%");
  // givenWordBackground.style("height", "100%");
  givenWordBackground.style("z-index", "-1");

  const givenWordDisplay = createP(chosenWord.form1);
  givenWordDisplay.id("givenWordDisplay");
  givenWordDisplay.parent(givenWordBox);

  const givenWordInputBox = createDiv();
  givenWordInputBox.parent(givenWordBox);
  givenWordInputBox.style("display", "flex");

  const givenWordInput = createInput("");
  givenWordInput.id("givenWordInput");
  givenWordInput.parent(givenWordInputBox);

  const rd = random();
  if (rd < 0.5) formToGuess = 2;
  else formToGuess = 3;
  const placeholderText =
    formToGuess === 2 ? "Guess the second form" : "Guess the third form";

  givenWordInput.attribute("placeholder", placeholderText);

  const givenWordSubmit = createButton("Go");
  givenWordSubmit.id("givenWordSubmit");
  givenWordSubmit.mouseClicked(() =>
    handleGivenWordSubmit(givenWordInput, scoreP, failInfo)
  );
  givenWordSubmit.parent(givenWordInputBox);
}

let failTimeout;

function handleGivenWordSubmit(input, scoreP, failInfo) {
  const inp = input.value();
  const chosenWordDest =
    formToGuess === 2 ? chosenWord.form2 : chosenWord.form3;

  if (inp.toLowerCase() === chosenWordDest.toLowerCase()) {
    score++;
    scoreP.html(`Points: ${score}`);
    scoreP.style("color", "green");
    setTimeout = setTimeout(() => {
      scoreP.style("color", "black");
    }, 1000);
  } else {
    score--;
    if (score < 0) score = 0;
    scoreP.html(`Points: ${score}`);
    scoreP.style("color", "red");
    setTimeout(() => {
      scoreP.style("color", "black");
    }, 1000);

    failInfo.html(
      `The ${formToGuess === 2 ? "2nd" : "3rd"} form of ${
        chosenWord.form1
      } is ${formToGuess === 2 ? chosenWord.form2 : chosenWord.form3}`
    );
    clearTimeout(failTimeout);
    failTimeout = setTimeout(() => {
      failInfo.html("");
    }, 3000);
  }
  input.value("");

  const rd = random();
  if (rd < 0.5) formToGuess = 2;
  else formToGuess = 3;
  const placeholderText =
    formToGuess === 2 ? "Guess the second form" : "Guess the third form";

  input.attribute("placeholder", placeholderText);
  chosenWord = shuffleWord();
}

function shuffleWord() {
  const newWord = random(dictionary);
  newWord.form1 = newWord.form1[0].toUpperCase() + newWord.form1.slice(1);
  newWord.form2 = newWord.form2[0].toUpperCase() + newWord.form2.slice(1);
  newWord.form3 = newWord.form3[0].toUpperCase() + newWord.form3.slice(1);
  select("#givenWordDisplay").html(newWord.form1);

  return newWord;
}
