var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
var balloonPosition=database.ref("balloon/position");
balloonPosition.on("value",readPosition,showError)
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}
function showError(){
  console.log("show the error")
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    balloon.x=balloon.x-10
    if(balloon.x<0){
      balloon.x=0
        }
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    balloon.x=balloon.x+10
    if(balloon.x>1500){
      balloon.x=1500
        }
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    if(balloon.y<0){
      balloon.y=0
        }
    //write code to move air balloon in up direction
    balloon.y=balloon.y-10
    balloon.scale=balloon.scale+0.009 }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    if(balloon.y>700){
      balloon.y=700
        }
    balloon.y=balloon.y+10
    balloon.scale=balloon.scale-0.009
   
  }
  if( keyDown(LEFT_ARROW)   ||
      keyDown(RIGHT_ARROW)  || 
      keyDown(UP_ARROW)     ||
      keyDown(DOWN_ARROW)){
        
      
    update();
    
      }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  //console.log("Position: ="+ balloon.x + ":" +balloon.y);
}

function update(){
  database.ref("balloon/position").set({
    x:balloon.x,
    y:balloon.y})

}
function readPosition(data){
  position=data.val();
  balloon.x=position.x
  balloon.y=position.y

}