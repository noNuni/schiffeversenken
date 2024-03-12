class Ship{
    cords = [];
    destroyed = false;

    constructor(length, type){
        this.type = type;
        this.length = length;
        
    }
}

let fliped = false

let hitCoords = [];
let enemyShips = [];
let playerShips = [];
let width = 10;
let currentTurn = "Player";



function setup(){
    createPlayArea("enemy")
    createPlayArea("player")

    const enem1 = new Ship(2);
    const enem2 = new Ship(3);
    const enem3 = new Ship(3);
    const enem4 = new Ship(4);
    const enem5 = new Ship(5);

    enemyShips = [enem1,enem2, enem3, enem4, enem5];

    const player1 = new Ship(2);
    const player2 = new Ship(3);
    const player3 = new Ship(3);
    const player4 = new Ship(4);
    const player5 = new Ship(5);

    playerShips = [player1,player2, player3, player4, player5];

    enemyShips.forEach(ship => placeShip(ship, "_enemy"))

}

setup();


function createPlayArea(container){
    for (let index = 0; index < width * width; index++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = index + "_" + container;
        console.log(cell.id);
        cell.addEventListener("click", function() {
            clickedCell(cell.id);
        })
        document.getElementById(container).append(cell);
    }
}

function flip(){
    if (fliped == true){
            fliped = false;
        Array.from(document.getElementById("ships").children).forEach(ship => {
            ship.style.transform = "rotate(0deg)"
        });
    } 
    else{
        fliped = true;
        Array.from(document.getElementById("ships").children).forEach(ship => {
            ship.style.transform = "rotate(90deg)"
        });
    }
}

function clickedCell(cord){
    console.log(cord);
}



//todo built startup

function placeShip(ship, player){
    let isFlipped = Math.random() < 0.5;
    let validCells;

    //get random placement
    while(validCells != ship.length){
        validCells = 0;
        let startIndex = Math.floor(Math.random() * width * width);
        ship.cords = [];

        for (let i = 0; i < ship.length; i++) {
            let cellIndex = isFlipped ? startIndex+i : startIndex +i*width;
            if (isFlipped && cellIndex%width < startIndex%width){
                break;
            }

            if (cellIndex < width* width && !document.getElementById(cellIndex+player).classList.contains("blocked")){
                ship.cords.push(cellIndex+player);
                validCells++;
            }
        }
    }

    //only reached if valid
    ship.cords.forEach(cord => {
        document.getElementById(cord).classList.add("blocked");
        document.getElementById(cord).classList.add("ship-style")
    });


}