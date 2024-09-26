const MAX_ROUNDS = 5;
const ROCK_BUTTON = "rock-button";
const PAPER_BUTTON = "paper-button";
const SCISSORS_BUTTON = "scissors-button";

let round = 1;
let humanScore = 0;
let computerScore = 0;
let finishedGame = false;

let options = new Map();
options.set(0, "rock");
options.set(1, "paper");
options.set(2, "scissors");


function getComputerChoice(minRange, maxRange) {
    const num = Math.floor(Math.random() * 3);
    return options.get(num);
}

function clearChildrenBorders (parent) {
    const children = parent.querySelectorAll(".element");
    
    for (child of children) {
        child.classList.remove("with-outer-green");
        child.classList.remove("with-outer-red");
        child.classList.remove("with-outer-gold");
    }
}

function playRoundByInput(option) {
    let compChoice = getComputerChoice(0, 3);
    const computerButton = document.querySelector(`#${compChoice}-button`);

    let signal = new CustomEvent("updateState", {detail : {result : ""}});
    if (option === compChoice) { // draw condition
        signal.detail.result = "draw";
        computerButton.parentElement.parentElement.classList.add("with-outer-gold");
    }
    else {
        
        if ((option === "rock" && compChoice === "scissors") ||
        (option === "paper" && compChoice === "rock") ||
        (option === "scissors" && compChoice === "paper")) { // win condition
        signal.detail.result = "win";
        }
        else { // lose condition
            signal.detail.result = "lose";
        }
        computerButton.parentElement.parentElement.classList.add("with-outer-red");
    }


    document.dispatchEvent(signal);
}

function playGame () {
    const container = document.querySelector(".container");

    container.addEventListener("click", (clickEvent) => {
        var target = clickEvent.target.id;
        clearChildrenBorders(container);

        switch (target) {
            case ROCK_BUTTON: {
                playRoundByInput("rock");
                break;
            }
            case PAPER_BUTTON: {
                playRoundByInput("paper");
                break;
            }
            case SCISSORS_BUTTON: {
                playRoundByInput("scissors");
                break;
            }
            default: {
                break;
            }
        }

        const element = clickEvent.target.parentElement.parentElement;
        element.classList.add("with-outer-green");
    });

    document.addEventListener("updateState", (updateEvent) => {
        const playerScoreField = document.querySelector(".player-score");
        const computerScoreField = document.querySelector(".computer-score");
        const roundInfo = document.querySelector(".round-info");

        if (++round > MAX_ROUNDS) {
            if (!finishedGame) endGame();
            return;
        }

        const result = updateEvent.detail.result;
        switch (result) {
            case "win": {
                humanScore++;
                playerScoreField.textContent = `Player score: ${humanScore}`;
                break;
            }
            case "lose": {
                computerScore++;
                computerScoreField.textContent = `Computer score: ${computerScore}`;
                break;
            }
            case "draw": {
                break;
            }
            default: {
                console.error("Error! Result is not recognized");
                break;
            }
        }

        roundInfo.textContent = `Round ${round} of ${MAX_ROUNDS}`;        

    });
}


function endGame() {
    const scoreContainer = document.querySelector(".score-container");
    const infoContainer = document.querySelector(".info");
    const resultBox = document.querySelector(".result-box");

    const restartButton = document.createElement("button");
    restartButton.classList.add("restart-button");
    const finalMessage = document.createElement("p");
    finalMessage.classList.add("message");

    if (humanScore > computerScore) {
        finalMessage.textContent = "🎉 Congratulation! You won this time! 🎉";
        infoContainer.style["background-color"] = "lightgreen";
        infoContainer.style["border-color"] = "green";
        restartButton.style["background-color"] = "rgb(175, 255, 175)";
        restartButton.style["border-color"] = "green";
    }
    else if (computerScore > humanScore) {
        finalMessage.textContent = "💀 This time computer was stronger! You lost! 💀";
        infoContainer.style["background-color"] = "lightcoral";
        infoContainer.style["border-color"] = "red";
        restartButton.style["background-color"] = "#fc9b9e";
        restartButton.style["border-color"] = "red";
    }
    else {
        finalMessage.textContent = "⚔️ That was a good fight! It's a draw! ⚔️";
        infoContainer.style["background-color"] = "gold";
        infoContainer.style["border-color"] = "goldenrod";
        restartButton.style["background-color"] = "rgb(236, 218, 116)";
        restartButton.style["border-color"] = "goldenrod";
    }

    scoreContainer.style["border-bottom"] = "1px solid black";
    restartButton.textContent = "Press restart to play again";

    resultBox.appendChild(finalMessage);
    resultBox.appendChild(restartButton);
    finishedGame = true;

    
    restartButton.addEventListener("click", () => {
        computerScore = 0;
        humanScore = 0;
        round = 1;
        const playerScoreField = document.querySelector(".player-score");
        const computerScoreField = document.querySelector(".computer-score");
        const roundInfo = document.querySelector(".round-info");
        playerScoreField.textContent = `Player score: ${humanScore}`;
        computerScoreField.textContent = `Computer score: ${computerScore}`;
        roundInfo.textContent = `Round ${round} of ${MAX_ROUNDS}`;

        scoreContainer.style["border-bottom"] = "none";
        infoContainer.style["background-color"] = "transparent";
        infoContainer.style["border-color"] = "black";

        const container = document.querySelector(".container");
        clearChildrenBorders(container);

        finalMessage.remove();
        restartButton.remove();

        finishedGame = false;
    })
}


playGame ();