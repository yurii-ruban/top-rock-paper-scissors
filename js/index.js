function getComputerChoice(options, minRange, maxRange) {
    const num = Math.floor(Math.random() * 3);
    return options[num];
}

function getHumanChoice() {
    let answer = prompt("Please enter your choice (rock, paper or scissors): ");
    return answer.toLowerCase();
}

let validateHumanAnswer = (answer, options) => {
    return options.includes(answer);
} 

function notifyRound (humanChoice, computerChoice, roundResult) {
    if (roundResult === 0) {
        alert (`Draw! You both have ${humanChoice}.`);
    }
    else if (roundResult === 1) {
        alert (`You won this round! ${humanChoice} beats ${computerChoice}!`);
    } else {
        alert (`You lost this round! ${humanChoice} loses to ${computerChoice}!`);
    }
}

let rules = (humanAnswer, computerAnswer) => {
    let result = 0; // 0 = draw, 1 = human win, 2 = computer win

    if (computerAnswer === humanAnswer) return result;

    switch (humanAnswer) {
        case "rock": {
            if (computerAnswer === "scissors") {
                result = 1;
            } else {
                result = 2;
            }
            break;
        }
        case "scissors": {
            if (computerAnswer === "paper") {
                result = 1;
            } else {
                result = 2;
            }
            break;
        }
        case "paper": {
            if (computerAnswer === "rock") {
                return 1;
            } else {
                return 2;
            }
        }
    }

    return result;
}

function playGame () {
    const ROUNDS = 5;
    let humanScore = 0;
    let computerScore = 0;

    function playRound (humanChoice, computerChoice) {
        // Functions
        function applyResults(result) {
            switch (result) {
                case 1: {
                    humanScore++;
                    break;
                }
                case 2: {
                    computerScore++;
                    break;
                }
            }
        }

        // Logic
        const humanAns = humanChoice();
        const computerAns = computerChoice(options, 0, options.length);
    
        if (!validateHumanAnswer(humanAns, options)) {
            computerScore++;
            alert(`You have enterred incorrect answer: ${humanAns}! Computer won this round`);
            return;
        }
    
        const roundResult = rules(humanAns, computerAns);
        applyResults(roundResult);
        notifyRound(humanAns, computerAns, roundResult);
    }

    for (let i = 0; i < ROUNDS; ++i) {
        playRound (getHumanChoice, getComputerChoice);
        alert(`Round ${i + 1} ended!. Your score: ${humanScore}. Computer score: ${computerScore}`)
    }

    const winner = humanScore > computerScore ? "Congratulation! You are the winner this time!" : "This time computer is stronger. Try to beat him next time!";
    alert (winner);
}

// Start game
const options = ["rock", "paper", "scissors"];
//playGame();
