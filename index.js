const score = document.querySelector(".score");
const roundResult = document.querySelector(".round-result");
const gameButtons = document.querySelector(".gamebutton-container");

const choices = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;

const isChoiceValid = (str) => typeof str === "string" && choices.includes(str);

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getComputerChoice = () =>
  choices[Math.floor(Math.random() * choices.length)];

const playRound = (humanChoice, computerChoice) => {
  const outcomes = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (humanChoice === computerChoice) {
    roundResult.textContent = "Tie!";
  } else if (outcomes[humanChoice] === computerChoice) {
    roundResult.textContent = `You win! ${capitalize(
      humanChoice
    )} beats ${computerChoice}!`;
    humanScore++;
  } else {
    roundResult.textContent = `You lose! ${capitalize(
      computerChoice
    )} beats ${humanChoice}!`;
    computerScore++;
  }

  score.textContent = `${humanScore} : ${computerScore}`;
};

gameButtons.addEventListener("click", (e) => {
  const gameButton = e.target.parentNode;

  if (gameButton.type === "submit" && gameButton.id) {
    const humanChoice = gameButton.id;
    if (!isChoiceValid(humanChoice)) return;

    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }
});
