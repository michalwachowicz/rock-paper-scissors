const score = document.querySelector(".score");
const roundResult = document.querySelector(".round-result");
const gameResult = document.querySelector(".game-result");
const gameButtonContainer = document.querySelector(".gamebutton-container");
const gameButtons = document.querySelectorAll(".gamebutton");
const newGameContainer = document.querySelector(".newgame-container");
const restartButton = document.querySelector(".restart-btn");

const choices = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;
let animating = false;

const isChoiceValid = (str) => typeof str === "string" && choices.includes(str);

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getComputerChoice = () =>
  choices[Math.floor(Math.random() * choices.length)];

const updateScore = () => {
  score.textContent = `${humanScore} : ${computerScore}`;
};

const restartGame = () => {
  humanScore = 0;
  computerScore = 0;

  updateScore();
  roundResult.textContent = "";
  newGameContainer.classList.add("hidden");
};

// A function created to avoid the callback hell in animate() function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const animate = async (gameButton, roundOutcome, computerChoice) => {
  const computerButton = document.querySelector(".computer-choice");

  animating = true;
  gameButtons.forEach((btn) => (btn.style.animation = "shake 0.5s ease"));
  await delay(500);

  gameButtons.forEach((btn) => {
    btn.style.animation = "";
    if (btn !== gameButton) btn.style.opacity = 0;
  });
  await delay(500);

  gameButtons.forEach((btn) => {
    if (btn !== gameButton) {
      btn.style.display = "none";
    }
  });

  gameButton.style.transform = "translateX(-100px)";
  computerButton.classList.remove("hidden");
  await delay(500);

  computerButton.children[0].src = `./resources/${computerChoice}.svg`;
  computerButton.style.opacity = "1";
  roundResult.textContent = roundOutcome;

  updateScore();
  await delay(1000);

  computerButton.style.opacity = "0";
  await delay(500);

  computerButton.classList.add("hidden");
  gameButton.style.transform = "translateX(0)";
  gameButtons.forEach((btn) => {
    if (btn !== gameButton) btn.style.display = "initial";
  });
  await delay(500);

  gameButtons.forEach((btn) => {
    if (btn !== gameButton) btn.style.opacity = "1";
  });
  animating = false;
};

const playRound = (humanChoice, computerChoice) => {
  const outcomes = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  let roundOutcome;

  if (humanChoice === computerChoice) {
    roundOutcome = "Tie!";
  } else if (outcomes[humanChoice] === computerChoice) {
    roundOutcome = `You win! ${capitalize(
      humanChoice
    )} beats ${computerChoice}!`;
    humanScore++;
  } else {
    roundOutcome = `You lose! ${capitalize(
      computerChoice
    )} beats ${humanChoice}!`;
    computerScore++;
  }

  if (humanScore >= 5 || computerScore >= 5) {
    roundOutcome = humanScore > computerScore ? "You won!" : "You lost!";
    newGameContainer.classList.remove("hidden");
  }

  return roundOutcome;
};

gameButtonContainer.addEventListener("click", (e) => {
  const gameButton = e.target.parentNode;

  if (!animating && gameButton.type === "submit" && gameButton.id) {
    const humanChoice = gameButton.id;
    if (!isChoiceValid(humanChoice)) return;

    const computerChoice = getComputerChoice();
    const roundOutcome = playRound(humanChoice, computerChoice);

    animate(gameButton, roundOutcome, computerChoice);
  }
});

restartButton.addEventListener("click", restartGame);
