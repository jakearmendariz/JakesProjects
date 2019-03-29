/**
* Snake
* By Jake Armendariz
* Written in javascript using the p5 library
*/
var s;
var food;
var scale = 20;
var body;
var gameOver = false;
var gameStarted = false;
//1 is easy, 2 is medium, and 3 is hard
var difficulty = -1;
//0:east 1:south 3:north 2: west
var direction = 0;

//Begis the program, intitalizes the varibles
function setup() 
{
  createCanvas(600, 600);
  s = new Snake();
  body = [];
  body[0] = s;
  frameRate(10);
  food = createVector(20*Math.round(random((width-20)/20)), 20*Math.round(random((height-20)/20)));
}


function draw() {
  if(!gameStarted){
    background(0);
    textSize(80);
    fill(100, 255, 100);
    text("Snakers", 130, 270);
    textSize(12);
    
    text("By Jake Armendariz", 210, 310);
    textSize(20);
    fill(200, 200, 200);
    text("Enter a number", 200, 360);
    text("Easy: 1", 240, 390);
    text("Medium: 2", 240, 420);
    text("Hard: 3", 240, 450);
  }
  else if(!gameOver){
    background(0);
    s.update();
  
    fill(255, 100, 100);
     if(s.x === food.x && s.y === food.y){
      changeFoodLocation();
      eaten();
    }
    //s.show();
    showSnake();
    fill(100, 255, 100);
    rect(food.x, food.y, 20, 20);
    if(death()){
      gameOver = true;
      var time = millis();
     
    }
  }
  if(gameOver){
     background(0);
     textSize(80);
      fill(255);
      text("Game Over", 100, 280);
    var st = body.length-1;
    var t = "scored: " + st + "";
    textSize(40);
    text(t, 200, 350);
     
  }
}

//Assigns the new location for the food
changeFoodLocation = function(){
   food.x =  20*Math.round(random((width-20)/20));
   food.y = 20*Math.round(random((height-20)/20));
  //console.log("x: " + food.x + ", y: "+  food.y);
  
}

/**
* Handles user controls
* on easy mode it will keep the snake from turning around and eating itself
*/
function keyPressed(){
  if(!gameStarted){
    
    if(keyCode == 49){
      difficulty = 1;
      frameRate(10);
    }
    else if(keyCode == 51){
      difficulty = 3;
      frameRate(12);
    }
    else{
      difficulty = 2;
      frameRate(11);
    }
    gameStarted = true;
  }
  if(difficulty == 1){
  if(keyCode == UP_ARROW && direction !== 1){
   s.dir(0, -1); 
    direction = 3;
  }
  else if(keyCode == DOWN_ARROW&& direction !== 3){
    s.dir(0, 1);
    direction = 1;
  }
  else if(keyCode == RIGHT_ARROW && direction !== 2){
    s.dir(1, 0);
    direction = 0;
  }
  else if(keyCode == LEFT_ARROW&& direction !== 0){
    s.dir(-1, 0);
    direction = 2;
  }
  }
  else{
    if(keyCode == UP_ARROW ){
   s.dir(0, -1); 
    direction = 3;
  }
  else if(keyCode == DOWN_ARROW){
    s.dir(0, 1);
    direction = 1;
  }
  else if(keyCode == RIGHT_ARROW ){
    s.dir(1, 0);
    direction = 0;
  }
  else if(keyCode == LEFT_ARROW){
    s.dir(-1, 0);
    direction = 2;
  }
    
    
  }
  if(keyCode == 81){
    gameOver = true;
    gameStarted = true;
  }
  
}

/**
* Creates the next part of snake, locates it off screen to be moved once the head increase position
*/
eaten = function(){
  var a = new Snake();
  a.x = width;
  a.y = height
  body[body.length] = a;
  
  
}

/**
Snake is not the actual snake but just one part
The snake is an array of Snake objects
*/
function Snake(){
 this.x = 40;
 this.y = 40;
  this.scale = 20;
 this.xSpeed = this.scale;
 this.ySpeed = 0;
 //a, b represent the initial values of head
  
  this.update = function(){
   var a = this.x;
   var b = this.y;
   this.x += this.xSpeed;
   this.y += this.ySpeed;
    if(difficulty != 3){
      if(this.x >= width){
        this.x = 0;
      }
      if(this.x <= -20){
        this.x = width - this.scale;
      }
       if(this.y >= height){
        this.y = 0;
      }
      if(this.y <= -20){
        this.y = height -this.scale;
      }
    }
    else{// On hard mode leaving the bounds kills you
      if(this.x >= width){
        gameOver = true;
      }
      if(this.x <= -20){
        gameOver = true;
      }
      if(this.y >= height){
        gameOver = true;
      }
      if(this.y <= -20){
        gameOver = true;
      }
      
    }
    
    for(var i = body.length-1; i > 0; i--){
      if(i == 1){
        body[i].x = a;
        body[i].y = b;
      }
      else{
        body[i].x = body[i-1].x;
        body[i].y = body[i-1].y;
        
      }
    }
    
    
    
    
  }
  
  this.show = function(){
   fill(255); 
    rect(this.x, this.y, 20, 20);
    
  }
  
  this.dir = function(x, y){
    this.xSpeed = x*this.scale;
    this.ySpeed = y*this.scale;
  }
  
  
  
  
}

//If the snake eats itself death is invoked
death = function(){
 var a = body[0].x;
 var b = body[0].y;
  for(var i = 1; i < body.length; i++){
    var d = dist(a, b, body[i].x, body[i].y);
    if(d == 0){
      return true;
    }
  }
  return false;
}


//Prints entire snake
showSnake = function(){
  //console.log(body.length);
  for(var i = 0; i < body.length; i++){
    body[i].show();
  }
  
}