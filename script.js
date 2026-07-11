let turnTune = new Audio("Assets/sounds/turn.mp3");
let gameOverTune = new Audio("Assets/sounds/gameover.mp3");
let userTurn = "X";
// turn.play();
// let gameOver = new Audio()

let changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

