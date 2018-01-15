// store the quote-box div in a variable
const quoteBox = document.getElementById('quote-box');
const loadQuote = document.getElementById('loadQuote');
const body = document.querySelector('body');

// timeoutID is useful to reset the timer every time the user manually changes the random quote
let timeoutID = null;

// quotes will contain all my quoteObjects
let quotes = [];

// add quote objects to the quotes array
const initQuotes = function() {
  quotes.push({
    quote: "I don't know",
    source: "Anonymous",
    tags: [
      "uninteresting"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "I'm really not sure",
    source: "Someone",
    citation: "Somewhere",
    year: "Sometimes",
    tags: [
      "doubt",
      "uncertainty"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "You can do anything but not everything",
    source: "David Allen",
    citation: "Making It All Work",
    year: 2009,
    tags: [
      "wisdom",
      "good advice"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "Be yourself, everyone else is already taken.",
    source: "Oscar Wilde",
    year: 2009,
    tags: [
      "humour"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "S'il n'y a pas de solution, c'est qu'il n'y a pas de problème.",
    source: "Les Shadoks",
    year: 1968,
    tags: [
      "wisdom",
      "analytical philosophy",
      "paradox"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "Trying to explain music is like trying to dance architecture.",
    source: "Thelonius Monk",
    tags: [
      "genius",
      "music"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "Science is what we understand well enough to explain to a computer. Art is everything else we do.",
    source: "Donald Knuth",
    tags: [
      "computer science",
      "art"
    ],
    dateAdded: "01-15-2018"
  });
  quotes.push({
    quote: "The computer can't tell you the emotional story. It can give you the exact mathematical design, but what's missing is the eyebrows.",
    source: "Frank Zappa",
    tags: [
      "computer science",
      "art",
      "psychology",
      "emotions"
    ],
    dateAdded: "01-15-2018"
  });
};

// puts a random quote in the quote-box div
const printQuote = function() {
  // get a quote object
  const quoteObject = getRandomQuote();
  // store a template in a variable
  let html = `<p class="quote"> ${quoteObject.quote} </p>
  <p class="source"> ${quoteObject.source}`;
  // test for citation property in quoteObject
  if (quoteObject.citation) {
    html += `<span class="citation"> ${quoteObject.citation} </span>`;
  }
  // test for year property in quoteObject
  if (quoteObject.year) {
    html += `<span class="year"> ${quoteObject.year} </span>`;
  }
  // close the <p> tag
  html += `</p>`;
  // change the quoteBox innerHTML property
  quoteBox.innerHTML = html;
  // change the background color
  changeBackgroundColor();
  // clear the timer
  window.clearTimeout(timeoutID);
  // start a new timer to printQuote again in 30 sec.
  timeoutID = window.setTimeout(printQuote, 30000);
}

// returns a quote object from quotes array
const getRandomQuote = function() {
  return quotes[differentRandomInt(quotes.length)];
}

// returns a random integer number smaller than max
const randomInt = function(max) {
  return Math.floor(Math.random() * max);
}

// a function that get a DIFFERENT random number every time
// so you don't get the feeling that the app didn't react to the click
const differentRandomInt = (function() {
  let previousOutput = null;
  let differentRandomInt = function(max) {
    let output = 0;
    do {
      output = randomInt(max);
    } while (output === previousOutput)
    previousOutput = output;
    return output;
  }
  return differentRandomInt;
}());

// returns a hexadecial color css style string #ff45e8
const getRandomColorHexa = function() {
  let color = '#';
  // pick 3 hexadecial values between 00 and ff
  do {
    let randHex = Math.floor(Math.random() * 128).toString(16);
    // make sure it's 2 characters long
    if (randHex.length < 2) {
      randHex = "0" + randHex;
    }
    color += randHex;
  } while (color.length < 7)
  return color;
}

// changes backgroundcolor and button color
const changeBackgroundColor = function() {
  let nextColor = getRandomColorHexa();
  body.style.backgroundColor = nextColor;
  // also change the button's color
  loadQuote.style.backgroundColor = nextColor;
}

// event listener to respond to "Show another quote" button clickswhen user clicks anywhere on the button, the "printQuote" function is called
loadQuote.addEventListener("click", printQuote, false);

// initialize the quotes array
initQuotes();
// invoke the function once so the page loads with a random quote
printQuote();
