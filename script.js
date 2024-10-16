let randomNum = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
let guessRemains = document.querySelector('.lastResult');
const indicate = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let guessNum = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guessedNum = parseInt(userInput.value);
    console.log(guessedNum);
    validateGuess(guessedNum);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number more than 1');
  } else if (guess > 100) {
    alert('Please enter a number less than 100');
  } else {
    prevGuess.push(guess);
    if (guessNum === 11) {
      displayGuess(guess);
      displayMsg(`Game Over, Random number was ${randomNum}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNum) {
    displayMsg('Guessed Right Number');
    endGame();
  } else if (guess < randomNum) {
    displayMsg('Number is tooo low');
  } else {
    displayMsg('Number is tooo high');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  guessNum++;
  guessRemains.innerHTML = `${11 - guessNum}`;
}

function displayMsg(message) {
  indicate.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameBtn = document.querySelector('#newGame');
  newGameBtn.addEventListener('click', (e) => {
    randomNum = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    guessNum = 1;
    guessSlot.innerHTML = '';
    guessRemains.innerHTML = `${11 - guessNum}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
