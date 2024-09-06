let color1 = 20
let color2 = 30
let color3 = 40

let gameOver = false
let reset = false

let score1 = 0
let score2 = 0


function preload(){
  appleImage = loadImage("apple.png");
  appleBite = loadImage("apple bite.png");
  orange = loadImage("orange.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  app = new apple(100,100)
  or = new Orange(500,500,75)
  paddle = new paddle(windowWidth - 100, 100)
  text(score1, 30, 20)

}

function draw(){
  background(150,230,250);
  x = -245
  y = -200
  
  if(keyIsPressed == true){
    color1 += 10
    color2 += 20
    color3 += 30
  }
  

  if(color1 > 150){
    color1 = 10
  }
  if(color2 > 150){
    color2 = 20
  }
  if(color3 > 150){
    color3 = 20
  }


  if(!gameOver)
  {

     for(i = 0; i < windowWidth; i += 25)
  {
    for(j = 0; j < windowHeight; j += 25){
        noStroke()
        fill(color1,color2,color3)
        ellipse(i,j,20)
    }
  }


    fill(255,255,255)
    textSize(100)
    text(score1, windowWidth/3, 100)
    text(score2, (windowWidth*2)/3, 100)

    or.drawOrange()

    //paddle 1
    app.drawApple()
    app.updatePos(mouseY)
    app.checkBite(or)
    app.drawApple()

    //paddle 2
    paddle.drawPaddle()
    paddle.checkMove()
    paddle.checkBite(or)
    paddle.drawPaddle()

    //orange
    or.moveOrange()


    //check score
    if(reset){
      or.x = 500
      or.y = 500
      reset = false
    }

    if(score1 == 7 || score2 == 7){
      gameOver = true;
    }
  }
  else{
    if(score1 > score2){
      text("Player1 Wins!", windowWidth/2 - 300, windowHeight/2)
    }
    else if(score1 < score2){
      text("Player2 Wins!", windowWidth/2 - 300, windowHeight/2)
    }
  }

}


class apple{

  constructor(x,y){
    this.x = x
    this.y = y
  }
  

  drawApple(){
    fill(500, 200, 300)
    rect(this.x, this.y, 30, 200)
  }

  updatePos(y){
    this.y = y
  }

  checkBite(og){
    if(abs(this.x - og.x) < 15 && abs(this.y - og.y) < 150){

      og.changeDir(this.x, 100)
    }
  }
  
}


class paddle{

  constructor(x,y){
    this.x = x
    this.y = y
  }
  

  drawPaddle(){
    fill(200, 500, 300)
    rect(this.x, this.y, 30, 200)
  }

  checkMove(){
    if (keyIsDown(UP_ARROW)) { 
        this.y -= 20; 
    } 
  
    if (keyIsDown(DOWN_ARROW)) { 
        this.y += 20; 
    } 
  }

  checkBite(og){

    if(abs(this.x - og.x) < 15 && abs(this.y - og.y) < 150){
      og.changeDir(this.x, -100)
    }
    
  }
  
}



class Orange{

  speedX = 10;
  speedY = 10;

  constructor(x,y,size){
    this.x = x
    this.y = y
    this.size = size
  }

  drawOrange(){
    image(orange,this.x,this.y,this.size,this.size)
  }

  moveOrange(){
    this.x += this.speedX
    this.y += this.speedY

    if(this.y > windowHeight-10){
      this.speedY= this.speedY * -1
    }
    if(this.y < 10){
      this.speedY = this.speedY * -1
    }

    if(this.x > windowWidth-10){
      score1 += 1
      reset = true
    }
    if(this.x < 10){
      score2 += 1
      reset = true
    }
  }

  changeDir(a, num){
    print("pong")
    this.x = a + num
    print(this.speedX)
    this.speedX = this.speedX * -1
  }

}


