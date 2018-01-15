// store the quote-box div in a variable
const quoteBox = document.getElementById('quote-box');
const loadQuote = document.getElementById('loadQuote');
const body = document.querySelector('body');

// timeoutID is useful to reset the timer every time the user manually changes the random quote
let timeoutID = null;

// quotes will contain all my quoteObjects
let quotes = [];

// add quote objects to the quotes array
let initQuotes = function() {
  quotes.push({
    quote: "I don't know",
    source: "Anonymous",
    tags: [
      "uninteresting"
    ]
  });
  quotes.push({
    quote: "I'm really not sure",
    source: "Someone",
    citation: "Somewhere",
    year: "Sometimes",
    tags: [
      "doubt",
      "uncertainty"
    ]
  });
  quotes.push({
    quote: "You can do anything but not everything",
    source: "David Allen",
    citation: "Making It All Work",
    year: 2009,
    tags: [
      "wisdom",
      "good advice"
    ]
  });
  quotes.push({
    quote: "Be yourself, everyone else is already taken.",
    source: "Oscar Wilde",
    year: 2009,
    tags: [
      "humour"
    ]
  });
  quotes.push({
    quote: "S'il n'y a pas de solution, c'est qu'il n'y a pas de problème.",
    source: "Les Shadoks",
    year: 1968,
    tags: [
      "wisdom",
      "analytical philosophy",
      "paradox"
    ]
  });
  quotes.push({
    quote: "Trying to explain music is like trying to dance architecture.",
    source: "Thelonius Monk",
    tags: [
      "genius",
      "music"
    ]
  });
  quotes.push({
    quote: "Science is what we understand well enough to explain to a computer. Art is everything else we do.",
    source: "Donald Knuth",
    tags: [
      "computer science",
      "art"
    ]
  });
  quotes.push({
    quote: "The computer can't tell you the emotional story. It can give you the exact mathematical design, but what's missing is the eyebrows.",
    source: "Frank Zappa",
    tags: [
      "computer science",
      "art",
      "psychology",
      "emotions"
    ]
  });
};

// puts a random quote in the quote-box div
let printQuote = function() {
  const quoteObject = getRandomQuote();
  let html = `<p class="quote"> ${quoteObject.quote} </p>
  <p class="source"> ${quoteObject.source}`;
  if (quoteObject.citation) {
    html += `<span class="citation"> ${quoteObject.citation} </span>`;
  }
  if (quoteObject.year) {
    html += `<span class="year"> ${quoteObject.year} </span>`;
  }
  html += `</p>`;
  quoteBox.innerHTML = html;

  changeBackgroundColor();
  window.clearTimeout(timeoutID);
  timeoutID = window.setTimeout(printQuote, 30000);
}

// returns a quote object from quotes array
let getRandomQuote = function() {
  return quotes[differentRandomInt(quotes.length)];
}

// returns a random integer number smaller than max
let randomInt = function(max) {
  return Math.floor(Math.random() * max);
}

// a function that get a DIFFERENT random number every time
// so you don't get the feeling that the app didn't react to the click
let differentRandomInt = (function() {
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
let getRandomColorHexa = function() {
  let color = '#';
  do {
    let randHex = Math.floor(Math.random() * 128).toString(16);
    if (randHex.length < 2) {
      randHex = "0" + randHex;
    }
    color += randHex;
  } while (color.length < 7)
  return color;
}

// changes backgroundcolor and button color
let changeBackgroundColor = function() {
  let nextColor = getRandomColorHexa();
  body.style.backgroundColor = nextColor;
  loadQuote.style.backgroundColor = nextColor;
}

// event listener to respond to "Show another quote" button clickswhen user clicks anywhere on the button, the "printQuote" function is called
loadQuote.addEventListener("click", printQuote, false);

// initialize the quotes array
initQuotes();
// invoke the function once so the page loads with a random quote
printQuote();

//le changement de backgroundColor property du bouton efface le hover ... pourquoi ?
