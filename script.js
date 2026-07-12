let turnInfo = document.querySelector(".turn-info");
let resetBtn = document.querySelector(".reset-btn");

let turnTune = new Audio("Assets/sounds/turn.mp3");
let gameOverTune = new Audio("Assets/sounds/gameover.mp3");
let userTurn = "X";
let isGameOver = false;

let changeTurn = () => {
    return userTurn === "X" ? "O" : "X";
}

let renderMark = (player) => {
    if (player === "X") {
        return `
          <div class="relative w-10 h-10">
            <div class="absolute top-1/2 left-1/2 w-full h-1 bg-player-x rounded-full -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            <div class="absolute top-1/2 left-1/2 w-full h-1 bg-player-x rounded-full -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
          </div>`;
    }
    if (player === "O") {
        return `<div class="w-10 h-10 rounded-full border-4 border-player-o"></div>`;
    }
    return "";
};

let checkWin = () => {
    let boxText = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    wins.forEach(index => {
        if ((boxText[index[0]].innerText === boxText[index[1]].innerText) && (boxText[index[1]].innerText === boxText[index[2]].innerText) && (boxText[index[0]].innerText !== "")) {
            turnInfo.innerText = `Player ${boxText[index[0]].innerText} Won!`
            isGameOver = true;
        }
    })
}

let boxes = document.querySelectorAll(".box");

Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxText.innerText === "") {
            boxText.innerText = userTurn;
            userTurn = changeTurn();

            // turnTune.play();
            checkWin();
            if (!isGameOver) {

                turnInfo.innerText = `Player ${userTurn} turn`
            }
        }
    })
});


resetBtn.addEventListener("click", () => {

    let boxtexts = document.querySelectorAll(".box-text");

    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    userTurn = "X";
    isGameOver = false;
    turnInfo.innerText = `Player ${userTurn} turn`

})
