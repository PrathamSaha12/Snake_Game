const board = document.querySelector('.board');
const blockHeight = 30;
const blockWidth = 30;

const cols = Math.floor(board.clientWidth/blockWidth);
const rows= Math.floor(board.clientHeight/blockHeight);

const blocks = [];
const snake= [{x:1,y:3},{x:1,y:4},{x:1,y:5}];


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
        block.innerText = `${i}-${j}`;  
        blocks[`${i}-${j}`] = block; 
    }
} 


function render(){
        snake.forEach(segment => {
             blocks[`${segment.x}-${segment.y}`].classList.add("fill");
        });

    }

    render();