function setup() {
  createCanvas(windowWidth, windowHeight);
  color1 = 20
  color2 = 30
  color3 = 40
}

function draw() {
  background(150,230,250);
  x = -245
  y = -200
  
  color1 += 1
  color2 += 2
  color3 += 3

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
  
  
  

}