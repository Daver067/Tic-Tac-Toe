let turnCounter = 0;

let game = (()=>{

    //building game board function
    function makeSection(section){
        let container = document.querySelector(".container");
        let newSection = document.createElement('div');
        newSection.classList.add("board", section);
        container.appendChild(newSection);
        newSection = document.querySelector(`.${section}`)

        

    // The return object
        let actualObject = {
        placement: section,
        value: 0,
        currentInnerContent: "",
        InnerContent: function(newInnerHTML){
            let innerContent2 = document.querySelector(`.${this.placement}`);
            innerContent2.innerHTML = newInnerHTML;
            this.currentInnerContent = innerContent2.innerHTML;
        }
        }
        //adding event listener to the newly created div
        newSection.addEventListener('click', () => {selectSquare(actualObject)})

        return actualObject;
    }
    // player clicking on a square
    function selectSquare(squareSelected){
        if (squareSelected.value != 0) {
            alert("You must play in an un-occupied square");
            return;
        }
        if ((turnCounter == 0) || (turnCounter % 2 == 0)){
        squareSelected.InnerContent("X");
        squareSelected.value = 1;
        }
        else {
            squareSelected.InnerContent("O")
            squareSelected.value = 10;
        }
        win.UpdateWins(squareSelected);
        turnCounter++;
        win.CheckForWin();

    }

    
    // the game board setup
    let gameBoard = [
    new makeSection("topLeft"),
    new makeSection("topMid"),
    new makeSection("topRight"),
    new makeSection("midLeft"),
    new makeSection("midMid"),
    new makeSection("midRight"),
    new makeSection("bottomLeft"),
    new makeSection("bottomMid"),
    new makeSection("bottomRight"),
]
    return {gameBoard,};
    })();

const win = (()=>{
//adding values to update win conditions
let UpdateWins = function updateWins(squareSelected) {
    if (squareSelected.placement.includes("top")){ winConditions.row1 += squareSelected.value}
    if (squareSelected.placement.includes("mid")){ winConditions.row2 += squareSelected.value};
    if (squareSelected.placement.includes("bottom")){ winConditions.row3 += squareSelected.value};
    if (squareSelected.placement.includes("Left")){ winConditions.column1 += squareSelected.value};
    if (squareSelected.placement.includes("Mid")){ winConditions.column2 += squareSelected.value};
    if (squareSelected.placement.includes("Right")){ winConditions.column3 += squareSelected.value};
    if (squareSelected.placement.includes("topLeft")){ winConditions.diag1 += squareSelected.value};
    if (squareSelected.placement.includes("midMid")){ winConditions.diag1 += squareSelected.value};
    if (squareSelected.placement.includes("bottomRight")){ winConditions.diag1 += squareSelected.value};
    if (squareSelected.placement.includes("topRight")){ winConditions.diag2 += squareSelected.value};
    if (squareSelected.placement.includes("bottomLeft")){ winConditions.diag2 += squareSelected.value};
    if (squareSelected.placement.includes("midMid")){ winConditions.diag2 += squareSelected.value};
    }

//the rows and columns to check for winning
    let winConditions = {
        row1: 0,
        row2: 0,
        row3: 0,
        column1: 0,
        column2: 0,
        column3: 0,
        diag1: 0,
        diag2: 0,
    }


  //checking for a win condition
  let CheckForWin = function checkForWin(){
    let winKeys = Object.keys(winConditions)
        winKeys.forEach((key) => {
            if (winConditions[key] === 3){
                alert("X wins the game!")
                return;
            }
            else if (winConditions[key] === 30){
                alert("O wins the game")
                return;
            }
            else if (((turnCounter === 9) && (winConditions[key] !==3)) && ((turnCounter === 9) && (winConditions[key] !==30))){
                alert("it was a draw")
                turnCounter = 0;
                return;
            }
        })
    };


    // reset game
    let resetgame = function resetGame(){
        let container = document.querySelector(".container");
        while (container.firstChild){
            container.removeChild(container.firstChild)
        }
        gameBoard = [
            new makeSection("topLeft"),
            new makeSection("topMid"),
            new makeSection("topRight"),
            new makeSection("midLeft"),
            new makeSection("midMid"),
            new makeSection("midRight"),
            new makeSection("bottomLeft"),
            new makeSection("bottomMid"),
            new makeSection("bottomRight"),
        ]
        winConditions = {
            row1: 0,
            row2: 0,
            row3: 0,
            column1: 0,
            column2: 0,
            column3: 0,
            diag1: 0,
            diag2: 0,
        }
        turnCounter = 0;
    }
    return {resetgame, CheckForWin, winConditions, UpdateWins}
    })();