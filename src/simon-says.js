let cpuPattern = [];
let playerPattern = [];
let round = 0;
let score = 0;

document.querySelector("#start-button").onclick = function () {
  startGame();
};

document.querySelector("#buttons-container").onclick = function (event) {
  const $clickedButton = event.target.id;
  console.log($clickedButton);
  if ($clickedButton) {
    activateButton($clickedButton);
    handleClicks($clickedButton);
  }
};

function startGame() {
  hideStartButton();
  displayRounds(round);
  displayCpuTurn();
  nextRound();
  resetScore();
  setAlertInfo();
}

function nextRound() {
  round++;
  const nextSequence = Array.from(cpuPattern);
  nextSequence.push(randomButton());
  disableButtons();
  playRound(nextSequence);
  displayCpuTurn();
  cpuPattern = Array.from(nextSequence);

  setTimeout(() => {
    playerTurn(round);
  }, round * 1000 + 1000);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, i) => {
    setTimeout(() => {
      activateButton(color);
    }, (i + 1) * 1000);
  });
}

function randomButton() {
  const $buttons = document.querySelectorAll("#buttons-container .col-5");
  const randomButton = $buttons[Math.floor(Math.random() * $buttons.length)];
  return randomButton.id;
}

function playerTurn(round) {
  enableButtons();
  displayRounds(round);
  displayUserTurn();
}

function activateButton(color) {
  const $button = document.querySelector(`#${color}`);
  const $buttonSound = document.querySelector(`#audio-${color}-button`);

  $button.style.opacity = 1;
  $buttonSound.play();

  setTimeout(() => {
    $button.style.opacity = 0.5;
  }, 200);
}

function handleClicks(clickedButton) {
  const $pattern = playerPattern.push(clickedButton) - 1;
  const $buttonSound = document.querySelector(`#audio-${clickedButton}-button`);
  $buttonSound.play();

  if (playerPattern[$pattern] !== cpuPattern[$pattern]) {
    displayScore(score);
    gameOver();
    return;
  }

  if (playerPattern.length === cpuPattern.length) {
    score++;
    console.log(score);
    if (playerPattern.length === 1) {
      displayScore(score);
      announceWinner();
      return;
    }
    playerPattern = [];
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
}

function announceWinner() {
  resetGame();
  setAlert("success");
  document.querySelector("#game-instructions h6").innerText = "Press start to play again";
  document.querySelector("#turn-state .h3").innerText = "Simon says you are the winner !";
  const $winnerSound = document.querySelector("#winner-sound");
  $winnerSound.play();
}

function gameOver() {
  resetGame();
  setAlert("danger");
  document.querySelector("#game-instructions h6").innerText = "Press start to play again";
  document.querySelector("#turn-state .h3").innerText = "Simon says game over !";
  const $gameOverSound = document.querySelector("#game-over-sound");
  $gameOverSound.play();
}

function resetGame() {
  playerPattern = [];
  cpuPattern = [];
  round = 0;
  disableButtons();
}

function resetScore() {
  score = 0;
}

function enableButtons() {
  const $buttons = document.querySelector("#buttons");
  $buttons.style.pointerEvents = "auto";
}

function disableButtons() {
  const $buttons = document.querySelector("#buttons");
  $buttons.style.pointerEvents = "none";
}

function hideStartButton() {
  document.querySelector("#start-button").className = "hidden";
}

function displayRounds(number) {
  document.querySelector("#game-information").className = "col-5 alert alert-info h3";
  document.querySelector("#game-information .h3").innerText = `Round: ${number} / 10`;
}

function displayScore(score) {
  document.querySelector("#game-information .h3").innerText = `Your score is ${score} / 10`;
}

function displayUserTurn() {
  document.querySelector("#turn-state .h3").innerText = "Your turn !";
}

function displayCpuTurn() {
  document.querySelector("#turn-state").className = "col-5 alert alert-info";
  document.querySelector("#turn-state .h3").innerText = "It is the computer turn!";
}

function setAlert(context) {
  document.querySelector("#game-instructions").className = `row alert alert-${context}`;
  document.querySelector("#game-information").className = `col-5 alert alert-${context}`;
  document.querySelector("#turn-state").className = `col-5 alert alert-${context}`;
  document.querySelector("#start-button").className = `col-md-1 offset-md-1 btn btn-${context}`;
}

function setAlertInfo() {
  document.querySelector("#game-instructions h6").innerText = "Memorize the sequence";
  document.querySelector("#game-instructions").className = "alert alert-info";
}
