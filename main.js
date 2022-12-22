let btnRef = document.querySelectorAll(".button-option")
let popupRef = document.querySelector(".popup")
let newGameBtn = document.getElementById("new-game")
let restartBtn = document.getElementById("restart")
let msgRef = document.getElementById("message")

//winning patern array
let winningPatern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
]

//player 'X' first
let xTurn = true
let count = 0

//Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disable = true))
    //Enable Popup
    popupRef.classList.remove("hide")
}

//Enable All Buttton (for new game an restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = ""
        element.disable = false
    })
    //disable popup
    popupRef.classList.add("hide")
}

//This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons()
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins"
    } else {
        msgRef.innerHTML = "&#x1F389; <br> '0' Wins"
    }
}

//function for draw
const drawFunction = () => {
    disableButtons()
    msgRef.innerHTML = "&#x1F60E; <br> its a Draw"
}

//New Game
newGameBtn.addEventListener("click", () => {
    count = 0
    enableButtons()
})

restartBtn.addEventListener("click", () => {
    count = 0
    enableButtons()
})

//win logic
const winChecker = () => {
    for (let i of winningPatern) {
        //loop through all win patterns
        let [element1, element2, element3] = [btnRef[i[0]].innerText, btnRef[i[1]].innerText, btnRef[i[2]].innerText]
        //check if elements are filled
        //if 3 empty elements are same and would give win as would
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //if all 3 button have same values then pass the value to winfunction
                winFunction(element1)
            }
        }
    }
}

//display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false
            //display x
            element.innerText = "X"
            element.disable = true
        } else {
            xTurn = true
            //display Y
            element.innerText = "0"
            element.disable = true
        }
        //Increment Count on each click
        count += 1
        if (count == 9) {
            drawFunction()
        }
        winChecker()
    })
})
//Enable Buttons and disable popup on page load
window.ondload = enableButtons
