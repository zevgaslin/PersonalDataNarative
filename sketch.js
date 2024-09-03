let color1 = 20
let color2 = 30
let color3 = 40

function preload(){
  apple = loadImage("apple.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
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



  
  for(i = 0; i < windowWidth; i += 25)
  {
    for(j = 0; j < windowHeight; j += 25){
        noStroke()
        fill(color1,color2,color3)
        ellipse(i,j,20)
    }
  }

  image(apple, windowWidth/4, -100)


}