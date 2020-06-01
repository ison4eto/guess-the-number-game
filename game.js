let generatedNumber;
let guesses;

$(document).ready(function () {
    newGame();
    let form = document.getElementById("form");
    function handleForm(event) { event.preventDefault(); processNumberEntered() }
    form.addEventListener('submit', handleForm);
});

/**
 * Checks if the entered number is valid.
 * If the user has guessed the right number or has go guesses left - end the game.
 * Otherwise, show message to the user if the number is smaller or bigger
 *
 */
function processNumberEntered() {
    let inputText = document.getElementById("guessed-number").value;
    //check if it is a number
    if(isNaN(inputText)) {
        alertUser(inputText + " is not a number.");
        return;
    }
    let enteredNumber = parseInt(inputText);
    if(enteredNumber < 0 || enteredNumber > 200) {
        alertUser("Number must be between 0 and 200");
    }
    else {
        // Game has finished
        if(enteredNumber === generatedNumber) {
            addNumberToGuessed(enteredNumber);
            gameFinished(true);
        } else if(guesses === 1) {
            gameFinished(false);
        } else { // New wrong guess
            changeNumberOfGuesses(guesses - 1);
            const isBigger = enteredNumber > generatedNumber;
            addNumberToGuessed(enteredNumber, isBigger);
            let text = isBigger ? "bigger" : "smaller";
            alertUser("Your number was " + text + " than the generated one.");
        }
    }
}

/**
 * Show alert in the messages-box.
 * @param message the text of the message
 * @param isAlert if false the text will be red, otherwise it is green
 */
function alertUser(message, isAlert = true) {
    $("#messages-box").addClass(isAlert ? "red" : "green");
    $("#messages-box").text(message);
}

/**
 * Finish the game and show "Next Game" button
 * @param userWon indicates if the user has guessed the number
 */
function gameFinished(userWon) {
    if(userWon)
        alertUser("Congrats, you've guessed the right number!", false);
    else
        alertUser("You've lost. The number was " + generatedNumber);
    showNewGameButton()
}

function showNewGameButton() {
    document.getElementById("new-game").hidden = false;
    document.getElementById("game").hidden = true;
}

function newGame() {
    document.getElementById("new-game").hidden = true;
    changeNumberOfGuesses(15);
    getGenerateNumber();
    $("#guesses").empty();
    $("#messages-box").empty();
    document.getElementById("guessed-number").value = 0;
    document.getElementById("game").hidden = false;

}

function addNumberToGuessed(number, bigger) {
    let ul = document.getElementById("guesses");
    let li = document.createElement("li");
    let text = bigger ? number + " ↓" : number + " ↑";
    if(bigger == null) text = number;
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
}

function getGenerateNumber() {
    const n = Math.floor(Math.random() * 200);
    console.log("The generated number is " + n);
    generatedNumber = n;
}

function changeNumberOfGuesses(numberOfGuesses) {
    guesses = numberOfGuesses;
    $("#guesses-remaining").text(guesses);
}