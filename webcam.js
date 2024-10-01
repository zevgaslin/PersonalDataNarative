let capture
let platform
let button
let tolerance = 200

function setup(){
createCanvas(640,200)

capture = createCapture(VIDEO)
capture.size(320, 240);
button = createButton('snap'); 
button.mousePressed(takePick);
groundColor = color(232, 223, 233);
}

function takePick(){

platform = capture.get();


//colorMatch(platform, groundColor, tolerance)

}

function draw() {

	if (platform) {
		image(platform, 0, 0);
		colorMatch(platform, groundColor, tolerance)
	}
}

function colorMatch(input, ground, tollerance){

let matchGR = red(ground)
let matchGG = green(ground)
let matchGB = blue(ground)

input.loadPixels()

let gridSize = 50;

for(let y = 0; y<input.height; y+= gridSize){
for(let x = 0; x< input.width; x+= gridSize){
let index = (y*input.width + x) * 4;

let r = input.pixels[index];
let g = input.pixels[index+1];
let b = input.pixels[index+2];
print("r"+r + "g" +g +"b"+ b)
print("match r" +matchGR + "match g" + matchGG + "match b"+ matchGB)

if(r>= matchGR - tolerance && r <= matchGR + tolerance && g >=matchGG - tolerance && g <=matchGG + tolerance && b >= matchGB - tolerance && b <= matchGB + tolerance){
fill(0)
noStroke()
circle(x+gridSize/2, y+gridSize/2, 20)
print("yellow" + x + y)
}



}
}
}