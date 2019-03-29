/**
 * @author Jake Armendariz
 * Goal of game is to survive as long as possible while destroying asteroids
 * First created in July 2018
 * Space bar is shoot, the arrow keys move the rocket. Every asteroid    * destroyed     * in 20 points added to the total. 
 * */
 //Instance variables
var startTime = 0;
var counter = 0;
var gameStarted = false;
var xPos = 195;
var yPos = 322;
var aHeight = 35;
var aWidth = aHeight*(50/175);
var direction = 0;
var explosion = false;
var explosionSize = 10;
var astDestroyed = 0;
var hitCounter = [];
var highScore = 0;
//Increases difficulty
var speedInc = 3;
var gameSpeed = 4;
var canRestart = false;
var bullets;
var bullet;
var spaceObjects;
setup = function(){
  createCanvas(400, 400);
background(0, 0, 0);


//ROCKET SHOT///////////////////////////////////////////////////////////
bullets = [];
bullet = function(x, y){
   this.x = x;
   this.y = y;
};
  
  

  
  
spaceObjects = [
     {x : random(1, 380),
    y : random(-1, -100),
    size : random(30, 70),
    speed : random(1, 2) + speedInc},
     {x : random(1, 380),
    y : random(-100, -200),
    size : random(20, 50),
    speed : random(1, 2) + speedInc,},
    {x : random(1, 380),
    y : random(-200, -300),
    size : random(28, 45),
    speed : random(1, 3) + speedInc,
    },
     {x : random(1, 400),
    y : random(-50, -150),
    size : random(6, 30),
    speed : random(random(1, 2), random(2, 3)) + speedInc,
     },
     {x : random(1, 380),
    y : random(-200, -300),
    size : random(15, 30),
    speed : random(1, 3) + speedInc,
    },
];
  for(var i = 0; i < spaceObjects.length; i++)
{
    hitCounter[i] = 0;
}
  
  keyPressed = function(){
    if(!gameStarted)
    {
        gameStarted = true;
        startTime = millis();
    }
    if(keyCode === 37)
    {
        direction = 3;
        
    }
    else if(keyCode === 38)
    {
        direction = 0;
    }
    else if(keyCode === 39)
    {
        direction = 1;
    }
    else if(keyCode === 40)
    {
        direction = 2;
    }
    else if(keyCode === 32)
    {
        direction = -1;
        addShot();
    }
    else
    {
        text(keyCode, mouseX, mouseY);
    }
};
}


var drawRocket = function(){
    fill(250, 250, 250);
    rect(xPos, yPos, aWidth, aHeight);
    fill(255, 0, 0);
    triangle(xPos, yPos, xPos + aWidth/2, yPos- aHeight*(4/8), xPos + aWidth, yPos);
    triangle(xPos, yPos + aHeight, xPos - (aWidth/2), yPos + aHeight, xPos, yPos +  aHeight/4);
    triangle(xPos+ 3/2*(aWidth), yPos+aHeight, xPos+aWidth, yPos + aHeight, xPos + aWidth, yPos + aHeight/4);
    triangle(xPos + aWidth/3, yPos + aHeight, xPos + aWidth*(2/3), yPos + aHeight, xPos+ aWidth/2, yPos + aHeight/4);
    fill(255, 89, 0);
    triangle(xPos, yPos + aHeight, xPos + aWidth, yPos + aHeight, xPos + aWidth/2, yPos + aHeight*(9/6));
    fill(238, 255, 0);
    triangle(xPos+ aWidth/4, yPos + aHeight, xPos + aWidth - aWidth/4, yPos + aHeight, xPos + aWidth/2, yPos + aHeight*(8/6));
};



var addShot = function(){
    var b = new bullet(xPos + aWidth/2, yPos-aHeight*(1/2));
    bullets.push(b);
};
var displayBullets = function(){
    fill(255, 238, 0);
    for(var i = 0; i < bullets.length; i++)
    {
        rect(bullets[i].x, bullets[i].y, 3, aHeight/5);
    }
};
//Move up continously unless they contact a asteroid
var updateBullets = function(){
    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].y -=gameSpeed;
    }
};


//Draws all asteroids at their updated positions. When destroyed they will be shot out of view
var drawObjects = function(){
    
    for(var i = 0; i < spaceObjects.length; i++)
    {
        if(spaceObjects[i].size > 65){
            fill(255, 238, 0);}
        else if(spaceObjects[i].size < 45){
            fill(140, 138, 140);}
        else{
            fill(65, 72, 163);}
        ellipse(spaceObjects[i].x, spaceObjects[i].y, spaceObjects[i].size,spaceObjects[i].size);
        
        fill(247, 244, 244);
        textSize(12);
        //text(i, spaceObjects[i].x, spaceObjects[i].y);
    }
};

//Problem here
var intersection = function(){
    var place = -1;
    var aPlace = -1;
    var bigHit = false;
    var hit = 0;
    for(var i = 0; i < spaceObjects.length; i++)
    {
        for(var j = 0; j < bullets.length; j++)
        {
            var di = dist(bullets[j].x, bullets[j].y, spaceObjects[i].x, spaceObjects[i].y);
            if(di < spaceObjects[i].size/2)
            {
                hit++;
                place = i;
                aPlace = j;
            }
           
        }
         hitCounter[i] += hit;
        hit = 0;
    }
    //Depending on size it takes # of hits to destroy
    if(place !== -1)
    {
        if(spaceObjects[place].size < 45){
            spaceObjects[place].y = -75;
            spaceObjects[place].x = random(0, 400);
            hitCounter[place] = 0;astDestroyed++; }
        else if(hitCounter[place] >= 2 && spaceObjects[place].size < 65){
            spaceObjects[place].y = -75;spaceObjects[place].x = random(0, 400);
            hitCounter[place] = 0;astDestroyed++;
        }
        else if(hitCounter[place] >= 3)
        {
            spaceObjects[place].y = -75;spaceObjects[place].x = random(0, 400);
            hitCounter[place] = 0;astDestroyed++;
        }
       // print("before: " + bullets.length);
       //This should be enough but sometimes it gets rid of all bullets
       bullets.splice(aPlace, 1);
      // println("after " + bullets.length);
        counter += 20;
        
    }
};

//leftArrow = 37 //TopArrow = 38 //rightArrow = 39 //leftArrow = 40
//= 0 north, 1= east, 2 = south, 3 = west

//Main method of the program
draw = function() {
    background(0, 0, 0);
    if(!gameStarted)
    {
        fill(255, 0, 0);
        textSize(43);
        text("SpaceWars", 80, 100);
        textSize(20);
        text("Press any button to begin", 85, 150);
    }
    else if(!explosion){
    canRestart = false;
    counter++;
    
    if(keyIsPressed)
    {
        if(direction === 0)
        {
           yPos-=gameSpeed;
            
        }
        else if(direction === 1)
        {
            
            xPos+=gameSpeed;
        }
        else if(direction ===2)
        {
            yPos+=gameSpeed;
            
        }
        else if(direction === 3){
            xPos-=gameSpeed;
           
        }
        else{
            
        }
    }
    
    if(xPos < -70)
    {
        xPos = 400;
    }
    else if(xPos > 420){
        xPos = -50;
    }
    
    if((yPos + aHeight) > 400)
    {
        yPos = 400 -aHeight;
    }
    else if(yPos < 0)
    {
        yPos = 0;
    }
    
    for(var i = 0; i < spaceObjects.length; i++)
    {
        
        spaceObjects[i].y +=spaceObjects[i].speed;
        if(spaceObjects[i].y > 450)
        {
            spaceObjects[i].y = -50;
            spaceObjects[i].x = random(0, 400);
            spaceObjects[i].size += random(-10, 15);
        }
        if(spaceObjects[i].size < 15)
        {
            spaceObjects[i].size = 15;
        }
        var d = dist(xPos + aWidth/2, yPos -aHeight/2, spaceObjects[i].x, spaceObjects[i].y);
        if(spaceObjects[i].x > (xPos) && spaceObjects[i].x < (xPos + 30) && spaceObjects[i].y > yPos && spaceObjects[i].y < yPos + 58 || d < spaceObjects[i].size/2)
        {
            explosion = true;
            startTime = millis();
        }
    }
    //Adds Asteroids to increase difficulty as program continues
    if(counter%1000 === 0 )
    {
       // println("in");
        spaceObjects.push({x : random(1, 400),
        y : random(-50, -150),
        size : random(15, 40),
        speed : random(counter/1000, counter/1500 + 2) + speedInc,
     });
    }
    
    displayBullets();
    updateBullets();
    drawRocket();
    drawObjects();
    intersection();
    fill(255, 0, 0);
    text(counter, 350, 20);
    }
    else
    {
        drawRocket();
        drawObjects();
        fill(255, 180, 0);
        ellipse(xPos, yPos, explosionSize, explosionSize);
        explosionSize+=10;
        if(explosionSize > 200)
        {
            textSize(40);
            fill(0, 0, 0);
            text("Score: " + counter, 116, 170);
            if(counter > highScore){
                highScore = counter;
            }
            textSize(24);
            text("High score: " + highScore, 125, 215);
            text("Asteroids Destroyed: " + astDestroyed, 87, 260);
            text("Press any button to restart", 66, 306);
           
        }
        if(millis() - startTime > 1500){
           canRestart = true; 
        }
         if(keyIsPressed && canRestart){
                explosion = false;
                gameStarted = true;
                counter = 0;
                xPos = 195;
                yPos = 322;
                bullets.splice(0);
                spaceObjects.splice(5);
                astDestroyed = 0;
                for(var i = 0; i< spaceObjects.length; i ++)
                {
                    spaceObjects[i].y = random(-200, -40);
                    if(spaceObjects[i].size > 35){
                        spaceObjects[i].size = random(15, 40);
                    }
                }
            }
        
    }
};