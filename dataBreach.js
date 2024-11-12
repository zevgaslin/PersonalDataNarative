let table;
let submitButton;
let canvas;
let nameMenu;
let mapImg;
let dna_right;
let changedPressed;
let alreadyDragging;

let draggableObjects = []; // Array to hold multiple draggable objects
let goalTest;

let level = 1;
let numCorrect = 0;

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
  }



  display() {
  	fill(this.color);
    rect(this.x, this.y, this.xSize, this.ySize);
  }

  checkGoal(block){
  	//print(this.x-block.x)
  	if(this.tag == block.tag){
	  	if(abs((this.x+this.xSize/2) - (block.x+block.xSize/2)) < 20 && abs((this.y+this.ySize/2) - (block.y+block.ySize/2)) < 20){
	  		print("goal");
	  		numCorrect += 1;
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

 	//Create boxs with names on them
  	    for (let i = 0; i < table.getRowCount(); i++) {
  	      if ("G-G-Grandmother" === table.getString(i, "Relation to me")) {
  	      	let x = random(50, width - 100);
    		let y = random(50, height - 100);
    		let newObject = new DragObj(x, y, 150, 50, color("white"), null, table.getString(i, "Name"), 10, table.getString(i, "Name"));
    		draggableObjects.push(newObject);	       
	      }
	    }


  	//make goal
     goalTest = new goal(100,100,100,100, "Schoontje de Hond");

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

function draw() {

  background(0);
  if(changedPressed == true){
  	changeData();
	}
  if (mapImg) {
    //image(mapImg, 100, 300);
  }

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


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
