let turnTune = new Audio("Assets/sounds/turn.mp3");
let gameOverTune = new Audio("Assets/sounds/gameover.mp3");
let userTurn = "X";

let changeTurn = () => {
    return userTurn === "X" ? "O" : "X";
}

let boxes = document.querySelectorAll(".box");

Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click" , () => {
        if (boxText.innerText === "") {
            boxText.innerText = userTurn;
            userTurn = changeTurn();
        }
    })
});
