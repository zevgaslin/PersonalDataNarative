let table;
let submitButton;
let MenuButton;
let canvas;
let nameMenu;
let mapImg;
let dna_right;
let dna_empty;
let dnaRed;
let dnaGreen;
let dnaBlue;
let dnaYellow;
let changedPressed;
let alreadyDragging;

let draggableObjects = []; // Array to hold multiple draggable objects
let obj2 = [];
let obj3 = [];
let goalTest;
let blueGoal;
let redGoall
let greenGOal;
let yellowGoal;
let mapGoal;

let level = 0;

class DragObj {

  constructor(x, y, xSize, ySize, color_, img, text, textSize, tag) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.color_ = color_;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    if(img != null){
   		this.img = img;
   	}
   	else{
   		this.img = createImage(this.xSize, this.ySize);
   	}
   	if(text != null){
   		this.text = text;
   }
   else{
   	this.text = "";
   }
   if(textSize != null){
    	this.textSize = textSize;
	}
	else{
		this.textSize = 0;
	}
	if(tag != null){
		this.tag = tag;
	}
	else{
		this.tag = "";
	}
  }


  display() {
  	imageMode(CENTER);
    fill(this.color_);
    rect(this.x, this.y, this.xSize, this.ySize);
    if(this.img != null){
    	image(this.img, this.x + this.xSize/2,this.y + this.ySize/2);
    }
    if(this.text != null){
    	fill("black")
    	textSize(this.textSize);
    	textAlign(CENTER);
    	text(this.text, this.x + this.xSize/2, this.y + this.ySize/2);
    }
  }

  handleInput() {
    if (mouseIsPressed) {
      if (!this.dragging && !alreadyDragging) {
        // Check if mouse is over the object
        if (
          mouseX > this.x &&
          mouseX < this.x + this.xSize &&
          mouseY > this.y &&
          mouseY < this.y + this.ySize
        ) {
          this.dragging = true;
      		alreadyDragging = true;
          this.offsetX = this.x - mouseX;
          this.offsetY = this.y - mouseY;
        }
      }
    } else {
      this.dragging = false;
      alreadyDragging = false;
    }

    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      this.color_ = color("yellow");
    } else {
      this.color_ = color("white");
    }
  }
}

class goal{
	constructor(x, y, xSize, ySize, tag) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.tag = tag;
    this.color = "Red";
    this.goal = false;
  }



  display() {
  	fill(this.color);
    rect(this.x, this.y, this.xSize, this.ySize);
  }

  checkGoal(block){
  	if(this.tag == block.tag){
	  	if(abs((this.x+this.xSize/2) - (block.x+block.xSize/2)) < 20 && abs((this.y+this.ySize/2) - (block.y+block.ySize/2)) < 20){
	  		print("goal");
	  		this.goal = true;
	  		this.color = "Green";
	    	}
	  	else{
	  		this.color = "Red"
	  	}
  }
  }

}

function preload() {
  table = loadTable("PData.csv", "csv", "header");
  mapImg = loadImage("map.png");
  dna_right = loadImage("dna_right.png");
  dna_empty = loadImage("dna_empty.png");
  dnaRed = loadImage("RedDNA.png");
  dnaGreen = loadImage("GreenDNA.png");
  dnaYellow = loadImage("YellowDNA.png");
  dnaBlue = loadImage("BlueDNA.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  background(0);

  // Create and position the Submit Button
  
  submitButton = createButton("Submit");
  submitButton.position(200, 200);
  submitButton.style('font-size', '16px'); // Style for visibility

  // Create and position the Name Dropdown Menu
  nameMenu = createSelect();
  nameMenu.position(50, 50);
  nameMenu.style('font-size', '16px'); // Style for visibility
  nameMenu.option("Select Name");

  if (table && table.getRowCount() > 0) {
    for (let i = 0; i < table.getRowCount(); i++) {
      let name = table.getString(i, "Name");
      nameMenu.option(name);
    }
  }

  // Attach the event handler to the Submit Button
  submitButton.mousePressed(changeData);

  // Resize images
  mapImg.resize(0, 400);
  dna_right.resize(0, 400);

  // Create multiple draggable objects
  /*
  for (let i = 0; i < 5; i++) {
    let x = random(50, width - 100);
    let y = random(50, height - 100);
    let newObject = new DragObj(x, y, 50, 50, color("white"));
    draggableObjects.push(newObject);
  }
     let newObject = new DragObj(50, 50, 200, 200, "white", dna_right);
    draggableObjects.push(newObject);
    let newObjectText = new DragObj(100, 100, 50, 50, "white", null, "test", 20);
    draggableObjects.push(newObjectText);
    */

  //MAKE DRAGGABLE OBJECT ARRAYS

  //test level
 	//Create boxs with names on them
  	    for (let i = 0; i < table.getRowCount(); i++) {
  	      if ("G-G-Grandmother" === table.getString(i, "Relation to me")) {
  	      	let x = random(50, width - 100);
    		let y = random(50, height - 100);
    		let newObject = new DragObj(x, y, 150, 50, color("white"), null, table.getString(i, "Name"), 10, table.getString(i, "Name"));
    		draggableObjects.push(newObject);	       
	      }
	    }

	//LEVEL 2
    	let newObjectLevel2 = new DragObj(30,0,300,300, color("white"), null, "Super Secure \n  password protected data. \nDO NOT MOVE", 25, "password protector");
    	obj2.push(newObjectLevel2);
    	let redDNA = new DragObj(windowWidth/2, 250,100,30, color("white"), dnaRed, null, null, "RedDNA");
    	obj2.push(redDNA);	
    	let greenDNA = new DragObj(windowWidth/2, 300,70,30, color("white"), dnaGreen, null, null, "GreenDNA");
    	obj2.push(greenDNA);	
    	let yellowDNA = new DragObj(windowWidth/2, 350,100,30, color("white"), dnaYellow, null, null, "YellowDNA");
    	obj2.push(yellowDNA);	
    	let blueDNA = new DragObj(windowWidth/2, 400,70,25, color("white"), dnaBlue, null, null, "BlueDNA");
    	obj2.push(blueDNA);	

    	blueGoal = new goal(920, 144, 70, 25, "BlueDNA");
    	redGoal = new goal(905, 170, 70, 25, "RedDNA");
    	yellowGoal = new goal(905, 196, 70, 25, "YellowDNA");
    	greenGoal = new goal(920, 225, 70, 25, "GreenDNA");


    	//level 3
    	 for (let i = 0; i < table.getRowCount(); i++) {
  	      if ("G-G-Grandmother" === table.getString(i, "Relation to me")) {
  	      	let x = 0;
  	      	let y = 0;
  	      	if("Kentucky" === table.getString(i, "Place of Birth")){
  	      		x = 547;
  	      		y = 350;

  	      	}
  	      	else if("St. Louis, MO" === table.getString(i, "Place of Birth")){
  	      		x = 547;
				y = 291;

  	      	}
  	      	else if("Allegheny County, NC" === table.getString(i, "Place of Birth")){
  	      		x = 579;
  	      		y=320;
  	      	}
  	      	else if("Amsterdam, Netherlands" === table.getString(i, "Place of Birth")){
  	      		x = 100000;
  	      		y = 100000;
  	      	}
  	      	else if("Poland" === table.getString(i, "Place of Birth")){
  	      		x= 806;
  	      		y = 260;
  	      	}
  	      	else if ("Stryi, Poland" === table.getString(i, "Place of Birth")){
  	      		break;
  	      	}

    		let newObject = new DragObj(x, y, 50, 20, color("white"), null, table.getString(i, "Name"), 7, table.getString(i, "Name"));
    		obj3.push(newObject);	       
	      }

	      mapGoal = new goal(windowWidth/2 + 200, 100, 60, 30, "Nechama Weiss");
	    }



  	//make goal
     goalTest = new goal(100,100,100,100, "Schoontje de Hond");

     MenuButton = createButton("Continue");
  	MenuButton.position(300, 300);
  	MenuButton.style('font-size', '16px');

  	MenuButton.mousePressed(nextLevel);
  	MenuButton.hide()
}


function changeData() {
changedPressed = true
  background(0);
  textSize(30);
  textAlign(CENTER, TOP);
  //imageMode(CENTER);
 
	  if (table && nameMenu.value() !== "Select Name") {
	    for (let i = 0; i < table.getRowCount(); i++) {
	      if (nameMenu.value() === table.getString(i, "Name")) {
	        text(table.getString(i, "Name"), windowWidth / 2, 50);
	        text(table.getString(i, "Relation to me"), windowWidth / 2, 90);
	        text(table.getString(i, "Place of Birth"), windowWidth / 2, 130);
	        text(table.getString(i, "Birthday"), windowWidth / 2, 170);
	        break;
	      }
	    }
	  }
	  changedPressed = false
	
}

function nextLevel(){level += 1;}

function draw() {
//menu screen
print(level);
print("x " + mouseX);
print("y" + mouseY);



if(level == 0){
	nameMenu.hide();
	submitButton.hide();
	background(0);
	fill("White");
	textSize(100);
	textAlign(CENTER);
	text("Welcome to Hereditary", windowWidth/2, 200);
	textSize(30)
	text("Hereditary sets the industry standard when it comes to storing and analyzing geneitc data, \nand our customers are always our first priority. \n Over 3,200 data bases storing users personal information were hacked this past year, \nbut not to worry, our servers are super secure and safe.", windowWidth/2, 400);
	MenuButton.show()
	MenuButton.position(windowWidth/2, 600);
}
else if(level == 1){
	MenuButton.hide();
	background(0);
	textAlign(RIGHT);
	text("Logging in as Zev:",400,100);
	//webcam stuff
	MenuButton.show()

}
else if(level == 2){
	background(0);
	MenuButton.hide();
	textAlign(CENTER);
	textSize(30);
	fill("white");
	text("Just making sure its really you. \nTwo Factor DNA Authentication:", windowWidth/2 - 200, 100);


	imageMode(RIGHT)
	image(dna_right,150,150);

	image(dna_empty,windowWidth/2 + 200,200);

	blueGoal.display();
	redGoal.display();
	yellowGoal.display();
	greenGoal.display();


	for (let obj of obj2) {
		obj.display();
		obj.handleInput();
		blueGoal.checkGoal(obj);
		redGoal.checkGoal(obj);
		yellowGoal.checkGoal(obj);
		greenGoal.checkGoal(obj);
	}
	if(blueGoal.goal && redGoal.goal && yellowGoal.goal && greenGoal.goal){
		nextLevel();
	}
	//MenuButton.show();
}
else if(level == 3){
	MenuButton.hide();
	background(0);
	textAlign(CENTER);
	fill("blue");
	textSize(30);
	text("Huh, I really thought that would be harder. I guess this security is not as good as they said it was. \nThat explains why over 7 million poeples genetic data was breached last year.",windowWidth/2,100);
	//source: https://www.bbc.com/future/article/20240212-dna-testing-what-happens-if-your-genetic-data-is-hacked
	MenuButton.show()
}
else if (level == 4){
	MenuButton.hide();
	background(0);
	textAlign(CENTER);
	fill("white");
	textSize(30);
	text("Securty level 1 complete, thank you for your patience. \nHere at Hereditary we pride ourselves on keeping your data as safe as possible.",windowWidth/2,100);
	MenuButton.show()
}
else if(level == 5){
	background(0);
	fill("white");
	textSize(20)
	text("Secutry question: Place the family member from Poland here", windowWidth/2, 100);
	text("For your convinience, we have placed each family memebr in their coresponding country of origin on this map.", windowWidth/2, 190);

	image(mapImg, windowWidth/2, 400)

	mapGoal.display();

	for (let obj of obj3) {
		obj.display();
		obj.handleInput();
		mapGoal.checkGoal(obj);
	}

	if(mapGoal.goal){
		nextLevel();
	}
	MenuButton.hide();
}
else if(level == 6){
	MenuButton.hide();
	background(0);
	textAlign(CENTER);
	fill("blue");
	textSize(30);
	text("Wow, they really couldn't have made that question easier. ",windowWidth/2,100);
	MenuButton.show()
}
else if(level == 7){
	background(0);
	fill("white");
	textSize(20);
	text("Hey Zev, you're in! Heres all your super personal data. Good thing this is definitely you and not someone trying to hack into your account.",windowWidth/2, 200)
	MenuButton.show()
}
else if(level == 8){
		background(0);
		textSize(100)
		text("Thank you for playing", windowWidth/2, 200);
		MenuButton.hide()

}
else if(level == 10){
	background(0);
	MenuButton.hide();
	/*
	if(changedPressed == true){
	 	changeData();
	}
	if (mapImg) {
	//image(mapImg, 100, 300);
	}
	*/
	goalTest.display();
	fill("white")
	text("Wierdest Name Here ->", goalTest.x - 40, goalTest.y)


	// Loop through each draggable object
	for (let obj of draggableObjects) {
		obj.display();
		obj.handleInput();
		goalTest.checkGoal(obj);
	}
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
