
let ellBrush = false;
let rectBrush = false;

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	if(ellBrush){
		ellipseBrush()
	}
	else if(rectBrush){
		rectBrush()
	}
}

function keyPressed(){
	if(key === 'e'){
		ellBrush = true;
		rectBrush = false;
	}

	if(key === 'r'){
		rectBrush = true;
		ellBrush = false;
	}

}

function ellipseBrsh(){
	fill(random(255), random(255, random(255)))
	ellipse(mouseX, mouseY, 20, 20)
}

function squareBrush(){
	fill(random(255), random(255, random(255)))
	rect(mouseX, mouseY, 20, 20)
}