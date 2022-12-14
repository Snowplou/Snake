// Create game variables
let board = []
let boardSize = 20
let score = 0
let grow = 0;
let directionChanged = false

for (let i = 0; i < boardSize; i++) {
    let row = document.createElement("div")
    row.id = "row" + i
    document.getElementById("board").appendChild(row)
    row = document.getElementById("row" + i)
    row.className = "row"
    board.push([])
    for (let j = 0; j < boardSize; j++) {
        let square = document.createElement("div")
        square.id = "square " + j + " " + (19 - i)
        square.className = "square"
        row.appendChild(square)
        board[i].push("empty")
    }
    row.appendChild(document.createElement("br"))
}

// Control snake
let direction = "none"
addEventListener("keydown", function (event) {
    if ((event.key == "ArrowUp" || event.key == "w") && direction != "down" && !directionChanged) {
        direction = "up"
        directionChanged = true
    }
    else if ((event.key == "ArrowLeft" || event.key == "a") && direction != "right" && direction != "none" && !directionChanged) {
        direction = "left"
        directionChanged = true
    }
    else if ((event.key == "ArrowDown" || event.key == "s") && direction != "up" && !directionChanged) {
        direction = "down"
        directionChanged = true
    }
    else if ((event.key == "ArrowRight" || event.key == "d") && direction != "left" && !directionChanged) {
        direction = "right"
        directionChanged = true
    }
})

// Intitalize snake and food
let snake = [[6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10]]
let food = []
displaySnake()
placeFood()

let runningGame = setInterval(function(){

    directionChanged = false;

    if(direction == "up"){
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1])
    }
    else if(direction == "left"){
        snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]])
    }
    else if(direction == "down"){
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1])
    }
    else if(direction == "right"){
        snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]])
    }

    if(snake[snake.length - 1][0] >= boardSize || snake[snake.length - 1][1] >= boardSize || snake[snake.length - 1][0] < 0 || snake[snake.length - 1][1] < 0){
        gameOver(2)
    }
    else{
        document.getElementById("square " + snake[0][0] + " " + snake[0][1]).style.backgroundColor = "black"
    }

    if(direction != "none" && grow == 0){
        snake.shift()
    }

    if(grow > 0){
        grow--
    }

    displaySnake()

    for(let i = 0; i < snake.length - 1; i++){
        if(snake[i][0] == snake[snake.length - 1][0] && snake[i][1] == snake[snake.length - 1][1]){
            gameOver(1)
            return
        }
    }

    if(snake[snake.length - 1][0] == food[0] && snake[snake.length - 1][1] == food[1]){
        score++
        placeFood()
        grow += 3
    }

}, 150)

function displaySnake(){
    for(let coord in snake){

        let red = coord / (snake.length - 1) * 255
        let blue = 255 - red

        document.getElementById("square " + snake[coord][0] + " " + snake[coord][1]).style.backgroundColor = "rgb(" + red + ",0," + blue + ")"
    }
}

function placeFood(){
    let x = Math.round(Math.random() * 19)
    let y = Math.round(Math.random() * 19)
    for(let i = 0; i < snake.length - 1; i++){
        if(snake[i][0] == x && snake[i][1] == y){
            placeFood()
        }
        else{
            food[0] = x
            food[1] = y
            document.getElementById("square " + x + " " + y).style.backgroundColor = "rgb(0, 155, 0)"
        }
    }
}

function gameOver(square){

    let cycleTime = 750
    let cycles = 3

    clearInterval(runningGame)
    for(let i = 1; i <= 2 * cycles; i++){
        setTimeout(() => {
            if(i % 2){
                document.getElementById("square " + snake[snake.length - square][0] + " " + snake[snake.length - square][1]).style.backgroundColor = "white"
            }
            else{
                document.getElementById("square " + snake[snake.length - square][0] + " " + snake[snake.length - square][1]).style.backgroundColor = "red"
            }
        }, i*cycleTime)
    }
    setTimeout(() => {
        document.getElementById("gameOver").style.display = "block"
        document.getElementById("board").style.display = "none"
    }, (((cycles + 1) * 2) - 1) * cycleTime)
}

function restartGame(){
    location.reload()
}