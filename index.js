const choices = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;

const isChoiceValid = (str) => {
  if (typeof str != "string") return false;

  for (let choice of choices) {
    if (str === choice) {
      return true;
    }
  }

  return false;
};

const getComputerChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const getHumanChoice = () => {
  let choice;

  do {
    choice = prompt(
      "What's your choice? (rock | paper | scissors)"
    ).toLowerCase();
  } while (!isChoiceValid(choice));

  return choice;
};

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const playRound = (humanChoice, computerChoice) => {
  const outcomes = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (humanChoice === computerChoice) {
    alert("Tie!");
  } else if (outcomes[humanChoice] === computerChoice) {
    alert(`You win! ${capitalize(humanChoice)} beats ${computerChoice}!`);
    humanScore++;
  } else {
    alert(`You lose! ${capitalize(computerChoice)} beats ${humanChoice}!`);
    computerScore++;
  }
};

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

playRound(humanChoice, computerChoice);
