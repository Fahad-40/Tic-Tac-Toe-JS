let turnInfo = document.querySelector(".turn-info");
let resetBtn = document.querySelector(".reset-btn");
let boxes = document.querySelectorAll(".box");

let turnTune = new Audio("Assets/sounds/click.wav");
let winTune = new Audio("Assets/sounds/achievement.wav");
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

let fireConfetti = () => {
    // left side se
    confetti({
        particleCount: 90,
        angle: 60,           // right ki taraf angle
        spread: 75,
        origin: { x: 0, y: 0.7 }   // x:0 = bilkul left edge
    });

    // right side se
    confetti({
        particleCount: 90,
        angle: 120,          // left ki taraf angle
        spread: 75,
        origin: { x: 1, y: 0.7 }   // x:1 = bilkul right edge
    });
}

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
        let a = boxText[index[0]].getAttribute("data-player");
        let b = boxText[index[1]].getAttribute("data-player");
        let c = boxText[index[2]].getAttribute("data-player");
        if (a && a === b && b === c) {
            turnInfo.innerText = `Player ${a} Won!`
            isGameOver = true;

            index.forEach(i => {
                boxes[i].classList.add("win-cell")
            })

            fireConfetti();
            turnInfo.classList.add("blink-text")
            winTune.play();
        }

    })
}

let checkTie = () => {
    let boxTexts = document.querySelectorAll(".box-text");
    let allfilled = Array.from(boxTexts).every(box => box.getAttribute("data-player") !== null)

    if (allfilled && !isGameOver) {
        turnInfo.innerText = "It's a Tie!";
        isGameOver = true;
        turnInfo.classList.add("blink-text");
        // document.querySelector(".board").classList.add("shake-board");
        // document.querySelector(".board").classList.add("shake-board");
        document.querySelector(".board").classList.add("shake-board", "tie-flash");
    }
}

let TextBoxes = document.querySelectorAll(".box");

Array.from(TextBoxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxText.getAttribute("data-player") === null) {
            boxText.setAttribute("data-player", userTurn);
            boxText.innerHTML = renderMark(userTurn);
            turnTune.play();
            userTurn = changeTurn();

            // turnTune.play();
            checkWin();
            checkTie();
            if (!isGameOver) {

                turnInfo.innerText = `Player ${userTurn} turn`
            }
        }
    })
});


resetBtn.addEventListener("click", () => {

    let boxtexts = document.querySelectorAll(".box-text");

    Array.from(boxtexts).forEach(element => {
        element.innerHTML = "";
        element.removeAttribute("data-player")
    });
    Array.from(boxes).forEach(box => {
        box.classList.remove("win-cell")
    })
    userTurn = "X";
    isGameOver = false;
    turnInfo.classList.remove("blink-text")
    turnInfo.innerText = `Player ${userTurn} turn`
    document.querySelector(".board").classList.remove("shake-board", "tie-flash");
    // void board.offsetWidth; 
})
