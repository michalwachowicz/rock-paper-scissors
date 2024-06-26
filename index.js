const choices = ["rock", "paper", "scissors"];

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

const playGame = () => {
  let humanScore = 0;
  let computerScore = 0;

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

  for (let i = 0; i < 5; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
  }

  const scoreRestartMessage = `(${humanScore} vs ${computerScore})! Restart the page to play a new game!`;
  if (humanScore > computerScore) {
    alert(`You won the game ${scoreRestartMessage}`);
  } else if (computerScore > humanScore) {
    alert(`You lost the game ${scoreRestartMessage}`);
  } else {
    alert(`Tie ${scoreRestartMessage}`);
  }
};

playGame();
