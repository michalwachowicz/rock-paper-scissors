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
