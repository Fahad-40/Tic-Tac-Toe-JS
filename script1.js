let boxes = document.querySelectorAll(".box");
let turnInfo = document.querySelector(".turn-info");
let resetBtn = document.querySelector(".reset-btn");

let userTurn = "X";
let isGameOver = false;

let changeTurn = () => {
    return userTurn === "X" ? "O" : "X";
}

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
}

let checkWin = () => {
    let boxText = document.querySelectorAll(".box-text");
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    win.forEach(element => {
        let a = boxText[element[0]].getAttribute("data-player");
        let b = boxText[element[1]].getAttribute("data-player");
        let c = boxText[element[2]].getAttribute("data-player");

        if (a && a === b && b === c) {
            turnInfo.innerText = `Player ${userTurn} Won`;
            isGameOver = true;
            turnInfo.classList.add("blink-text");
   fireConfetti();
            element.forEach(i => {

 boxes[i].classList.add("win-cell")

            })
        }

    })

}


let checkTie = () => {
    let boxText = document.querySelectorAll(".box-text");

    let allfilled = Array.from(boxText).every(box => box.getAttribute("data-player") !== null);

    if (allfilled && !isGameOver) {
        turnInfo.innerText = `Its a Tie`;
        isGameOver = true;
        turnInfo.classList.add("blink-text");
        document.querySelector(".board").classList.add("shake-board", "tie-flash");
    }

}

Array.from(boxes).forEach(box => {
    let boxText = box.querySelector(".box-text");

    box.addEventListener("click", () => {

        if (boxText.getAttribute("data-player") === null) {
            boxText.setAttribute("data-player", userTurn);
            boxText.innerHTML = renderMark(userTurn);
            checkWin();
            checkTie();

            if (!isGameOver) {
                userTurn = changeTurn();
                turnInfo.innerText = `Player ${userTurn} Turn`;
            }

        }

    })


})
resetBtn.addEventListener("click", () => {

    Array.from(boxes).forEach(box => {
        box.classList.remove("win-cell")
        let boxText = box.querySelector(".box-text");
        boxText.removeAttribute("data-player")
        boxText.innerHTML = "";
        isGameOver = false;
        turnInfo.classList.remove("blink-text");
        document.querySelector(".board").classList.remove("shake-board", "tie-flash");
        userTurn = changeTurn();
        turnInfo.innerText = `Player ${userTurn} Turn`;
    })

})