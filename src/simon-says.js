let cpuPattern = [];
let playerPattern = [];
let round = 0;
let score = 0;

document.querySelector("#start-button").onclick = function () {
  startGame();
};

document.querySelector("#buttons-container").onclick = function (event) {
  const $clickedButton = event.target.className;
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
}

function nextRound() {
  round++;
  score++;
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
  const $buttons = document.querySelectorAll("#buttons-container button");
  const randomButton = $buttons[Math.floor(Math.random() * $buttons.length)];
  return randomButton.className;
}

function playerTurn(round) {
  enableButtons();
  displayRounds(round);
  displayUserTurn();
}

function activateButton(color) {
  const $button = document.querySelector(`.${color}`);
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
    displayScore(score + 1);
    gameOver();
    return;
  }

  if (playerPattern.length === cpuPattern.length) {
    if (playerPattern.length === 10) {
      displayScore(score + 1);
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
  document.querySelector("#start-button").innerText = "Play again";
  document.querySelector(".round-state").innerText = "Simon says you are the winner !";
  const $winnerSound = document.querySelector("#winner-sound");
  $winnerSound.play();
}

function gameOver() {
  resetGame();
  document.querySelector("#start-button").innerText = "PLAY AGAIN";
  document.querySelector(".round-state").innerText = "Simon says game over !";
  const $gameOverSound = document.querySelector("#game-over-sound");
  $gameOverSound.play();
}

function resetGame() {
  playerPattern = [];
  cpuPattern = [];
  round = 0;
  displayStartButton();
  disableButtons();
}

function enableButtons() {
  const $buttons = document.querySelectorAll("#buttons-container button");

  $buttons.forEach((button) => {
    button.disabled = false;
  });
}

function disableButtons() {
  const $buttons = document.querySelectorAll("#buttons-container button");

  $buttons.forEach((button) => {
    button.disabled = true;
  });
}

function hideStartButton() {
  document.querySelector("#start-button").className = "hidden";
}

function displayStartButton() {
  document.querySelector("#start-button").className = "";
}

function displayRounds(number) {
  document.querySelector("#game-information").innerText = `Round: ${number} / 10`;
}

function displayScore(score) {
  document.querySelector("#game-information").innerText = `Your score is ${score} / 10`;
}

function resetScore() {
  score = 0;
}

function displayUserTurn() {
  document.querySelector(".round-state").innerText = "Your turn !";
}

function displayCpuTurn() {
  document.querySelector("#turn-message h2").className = "round-state";
  document.querySelector(".round-state").innerText = "It is the computer turn !";
}
