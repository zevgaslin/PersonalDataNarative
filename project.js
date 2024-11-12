var sketch1 = new p5(sketch1);

var sketch1 = function(p){
	p.buttonY = 400;
	p.setup =function(){
		p.shouldStart = false;
		p.canvas = createCanvas(200, 200);
		//dnaLogo =createImg("dna.png","dna logo");
		//dnaLogo.position(0,0);
		p.background(50,50, 200)
		createP("DNA sampling is bad");
		p.header = createElement("h1","Hereditary");
		p.header.position(100,0)
		p.canvas.position(100,400)
		p.canvas.style("z-index", '-1')
		p.button = createButton("start");
		p.button.position(100,p.buttonY);
		p.button.mousePressed(p.changeBool);
	}

	 p.changeBool = function(){
		p.shouldStart = !p.shouldStart;
		if(p.shouldStart){
			p.button.html("stop")
			p.buttonY += 5;
			p.button.position(100,p.buttonY);
		}
		else{
			p.button.html("start again")
			p.buttonY += 5;
			p.button.position(100,p.buttonY);
		}
	}
	 
	p.draw = function(){
		if(p.shouldStart){
	  		p.circle(p.mouseX, p.mouseY, 40);
		}
	}
}

var sketch2 = new p5(sketch2);

var sketch2 = function(p){


//video variables
	 p.w = 640,
    	p.h = 480;

p.setup = function() {
    p.capture = createCapture({
        audio: false,
        video: {
            width: p.w,
            height: p.h
        }
    }, function() {
        console.log('capture ready.')
    });
    p.capture.elt.setAttribute('playsinline', '');
    createCanvas(p.w, p.h);
    p.capture.size(p.w, p.h);
    p.capture.hide();
    colorMode(HSB);

    p.tracker = new clm.tracker();
    p.tracker.init();
    p.tracker.start(p.capture.elt);


}

function draw() {
    imageMode(CORNERS);
    image(p.capture, 0, 0, p.w, p.h);
    p.positions = p.tracker.getCurrentPosition();
    imageMode(CENTER);
    noFill();
    stroke(255);
    beginShape();
    for (let i = 0; i < p.positions.length; i++) {
        vertex(p.positions[i][0], p.positions[i][1]);
    }
    endShape();

    noStroke();
    for (let i = 0; i < p.positions.length; i++) {
        fill(map(i, 0, p.positions.length, 0, 360), 50, 100);
        ellipse(p.positions[i][0], p.positions[i][1], 4, 4);
        text(i, p.positions[i][0], p.positions[i][1]);
    }

    if (p.positions.length > 0) {
         p.mouthLeft = createVector(p.positions[44][0], p.positions[44][1]);
         p.mouthRight = createVector(p.positions[50][0], p.positions[50][1]);
         p.smile = p.mouthLeft.dist(p.mouthRight);
    }
}
}

var can1 = new p5(sketch1);
var can2 = new p5(sketch2);