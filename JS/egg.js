
//**** Variables
let body = document.querySelector("body");
let egg = document.getElementById("egg");
let basket = document.getElementById("basket");
let crashed = document.getElementById("crashed")
let container = document.getElementById("cont");
let score = document.getElementById("score");
let lose = document.getElementById("lost");
let lastScore = document.getElementById("lastScore");
let gameOver =document.querySelector(".gameEnd");
let button = document.getElementById("btn");
let losing = 0 ,scoring = 0


let last = localStorage.getItem("last");

//Score at the begining
score.innerText = `Score : ${scoring}`;
lose.innerText = `Lost : ${losing}`;
lastScore.innerText = `Last Score : ${last}`
gameOver.style.display="none";



// Sound Effects
function wsound(){
    var snd = new Audio('../sounds/bite.mp3');
    snd.play();       
}
function lsound(){
    var snd = new Audio('../sounds/lose point .mp3');
    snd.play();        
}
function gosound(){
    var snd = new Audio('../sounds/gameover.mp3');
    snd.play();        
}


function start(){
      
    button.style.display="none";
    egg.classList.remove("invis");
// Horizontal Movement of The Basket on Key Down

basket.style.left= "500px" ;    

window.addEventListener("keydown", function(e){       

let move = 10 ;  
                                                                                
if(e.code ==  "ArrowRight") {
     
    basket.style.left = parseInt(basket.style.left) + move +"px";

    if(basket.getBoundingClientRect().right > container.getBoundingClientRect().right){
        
        basket.style.left = (container.getBoundingClientRect().right-basket.width )  + "px"}

}else if(e.code ==  "ArrowLeft"){

    basket.style.left = parseInt(basket.style.left) - move +"px";
    if(basket.getBoundingClientRect().x < container.getBoundingClientRect().x){
        
        basket.style.left = (container.getBoundingClientRect().x )  + "px"}

}else;
})                                                                                                   
                                                                                                   

// ****Adding Function to make the intial horizontal position randomize
let hPos = function(){

let hEgg =  Math.ceil(Math.random()*1000);

if(hEgg > (window.innerWidth - egg.style.width)-100 ){
    hEgg = 500;
}
egg.style.left = hEgg + "px";
}
// Intial H-Position
hPos();
// Intial V-Position
let down=5;
// Vertical Movement (Fn)
function moveDwn(){

down += 100;

// Egg Reached the end of screen
if(down > (window.innerHeight - egg.style.height)-100){

// Case Catched
if( Math.abs(basket.getBoundingClientRect().x - egg.getBoundingClientRect().x) < 40 ){
  
    crashed.classList.add("invis") 
    wsound();
    scoring++;
    //Scoring
    score.innerText = `Score : ${scoring}`;
    crashed.style.left = egg.style.left;
// Case If not catched 
}else{
    crashed.style.left = egg.style.left;
    crashed.classList.remove("invis")
    lsound(); 
    losing ++;
    console.log(losing);
    lose.innerText = `Lost : ${losing}`;
    //GAME OVER
    if(losing == 5){
        // Saving The Last Score in local storage
        window.localStorage.setItem("last",`${scoring}`);
        // Stopping the Game 
         clearInterval(id);
         gosound();
         body.classList.add("darker-span");
         gameOver.style.display="flex";
        }
}
//***invoking the H postion function
hPos();
// intial vertical value
down = 5;
}
egg.style.top = down + "px";
}
let id = setInterval(moveDwn,500);
};

// GAME START @ PRESS 
button.addEventListener("click",start);