const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const startModal = document.querySelector('.startgame')
const overtModal = document.querySelector('.gameover')
const restartButton = document.querySelector('.btn-restart')
const highScoreElement= document.querySelector('.high-score')
const scoreElement= document.querySelector('.score')
const timeElement = document.querySelector('.time')


const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth/blockWidth);
const rows= Math.floor(board.clientHeight/blockHeight);

const blocks = [];
let snake= [{x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}];
let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
let direction = 'right';

let game;
let timestamp;

let highscore = localStorage.getItem("highscore") || 0;;
let score = 0;
let time = `00-00`;
highScoreElement.innerText = highscore;


for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
        /*create a div like<div></div>*/
        const block = document.createElement('div');
        /*<div class="block"></div>*/
        block.classList.add("block");


        // <div class="board">
        // <div class="block"></div>    ...
        // </div>
        board.appendChild(block);
        //block.innerText = `${i}-${j}`;  
        blocks[`${i}-${j}`] = block; 
    }
} 


function render(){
    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.forEach(segment => {
         blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });

}



let head = null;
function moveSnake(){
    
    if(direction == 'up'){
        head = {x:snake[0].x-1,y:snake[0].y};
    }
    else if(direction == 'down'){
        head = {x:snake[0].x+1,y:snake[0].y};
    }
    else if(direction == 'right'){
        head = {x:snake[0].x,y: snake[0].y+1};
    }
    else if(direction == 'left'){
        head = {x:snake[0].x,y:snake[0].y-1};
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });
    snake.unshift(head);
    snake.pop();


    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        clearInterval(game);
        modal.style.display = "flex";
        startModal.style.display = "none";
        overtModal.style.display = "flex";
        return;
    }
    
}


function foodGeneate_SnakeLength(){
    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food");
        snake.unshift(head);
        score += 10;
        scoreElement.innerText = score;

        if(score>highscore){
            highscore = score;
            localStorage.setItem("highscore",highscore);
        }
    }
}



startButton.addEventListener("click",event=>{
    modal.style.display = "none";
    game = setInterval(() => {
    moveSnake();
    foodGeneate_SnakeLength();
    render();
    }, 200);
    timestamp = setInterval(()=>{
        let[min,sec] = time.split('-').map(Number);

        if(sec == 59){
            sec = 0;
            min ++;
        }
        else{
            sec++;
        }
        time =`${min}-${sec}`;
        timeElement.innerText = time;
    },1000)
})



restartButton.addEventListener("click",restartGame)
function restartGame(){
    modal.style.display = "none";
    score = 0;
    time = `00-00`;
    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highscore;
    
    snake= [{x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}];
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
    direction = 'right';
    
    clearInterval(game);
    game = setInterval(() => {
    moveSnake();
    foodGeneate_SnakeLength();
    render();
    }, 200);
}

addEventListener("keydown",event=>{
    if(event.key == "ArrowUp" || event.key == "w"){
        direction = "up";
    }
    else if(event.key =="ArrowDown" || event.key == "s"){
        direction = "down";
    }
    else if(event.key =="ArrowRight" || event.key == "d"){
        direction ="right";
    }
    else if(event.key =="ArrowLeft" || event.key == "a"){
        direction = "left";
    }
})