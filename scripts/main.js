/* 
##########################################################################################
########################################  BLOCKS  ########################################
##########################################################################################
*/ 

var ctx, canvas;

const gridWidth = 10;
const gridHeight = 20;
const gridX = 7;
const gridY = 1;
const scale = 35;
const STARTINGPOSITIONX = gridX+3;
const STARTINGPOSITIONY = gridY-2;

var grid;

var posX, posY, hand, hold;
var boundaryLeft, boundaryRight, boundaryTop, boundaryBottom;
var baseInterval, speedUpFactor, timer; // timer related variables
var bag = [];
var nextTetriminoBox = [];
var playerScore = 0;
var scoreMultiplier = 1.0;

var scorePosition = {
	x: 105,
	y: 350,
}

// Run game
function startScreen() {
	canvas = document.getElementById('canvas')
	ctx = canvas.getContext('2d');
	initializeEventListener();
	ctx.font = "30px Arial"
	ctx.textAlign = "center"
	eraseCanvas(canvas, ctx);
	startButton = {
		width: 150,
		height: 80,
		top: (canvas.height-80)/2,
		left: (canvas.width-150)/2,
		colour: '#FFFFFF',
	}
	ctx.fillStyle = startButton.colour;
	ctx.fillRect(startButton.left, startButton.top, startButton.width, startButton.height);
	canvas.addEventListener("click", startGameClick, false);
}

function endScreen() {
	eraseCanvas(canvas, ctx);
	pauseGame()
	displayFinalScore(ctx);
	
	startButton = {
		width: 150,
		height: 80,
		top: (canvas.height+150)/2,
		left: (canvas.width-150)/2,
		colour: '#FFFFFF',
	}
	ctx.fillStyle = startButton.colour;
	ctx.fillRect(startButton.left, startButton.top, startButton.width, startButton.height);
	canvas.addEventListener("click", startGameClick, false);
}

function startRound() {
	// initialize variables/game entities
	canvas.removeEventListener("click", startGameClick, false);
	initializeGrid();
	eraseCanvas(canvas, ctx);
	drawScoreBoard(ctx);
	posX = STARTINGPOSITIONX;
	posY = STARTINGPOSITIONY;
	boundaryLeft = gridX;
	boundaryRight = boundaryLeft + gridWidth;
	boundaryTop = gridY;
	boundaryBottom = boundaryTop + gridHeight;
	
	baseInterval = 1000;
	speedUpFactor = 1;
	
	isBagEmpty();
	hand = bag.pop();
	nextTetriminoBox.unshift(bag.pop());
	nextTetriminoBox.unshift(bag.pop());
	nextTetriminoBox.unshift(bag.pop());

	// Draw screen
	drawHoldBox(1, 2, 4, 4);
	drawHoldBox(0.9, 1.9, 4.2, 4.2);
	
	drawHoldBox(1, 9, 4, 11);
	drawHoldBox(0.9, 8.9, 4.2, 11.2);
	
	drawHoldBox(19, 1, 4, 20);
	drawHoldBox(18.9, 0.9, 4.2, 20.2);

	// start timer
	drawGridBackground();
	startTimer();
}

/* 
##########################################################################################
########################################  Timer  #########################################
##########################################################################################
*/ 

function startTimer() {
	timer = setInterval(timeStep, baseInterval);
}

function resetTimer() {
	if(timer)
		clearInterval(timer);
	timer = setInterval(timeStep, baseInterval);
}

function speedUp() {
	if(timer)
		clearInterval(timer);
	timer = setInterval(timeStep, getNewSpeed());
}


function getNewSpeed() {
	speedUpFactor++;
	let newSpeed = (1000 + baseInterval) / (2 * speedUpFactor);
	return newSpeed;
}

function timeStep() {
	eraseScore(ctx);
	displayScore(ctx);
	if(checkEndCondition()) {
		endScreen();
		return;
	}
	moveDown();
}

function pause() {
	if(timer)
		clearInterval(timer);
}

function resume() {
	timer = setInterval(timeStop, baseInterval);
}

/* 
##########################################################################################
#####################################  PlayerInput  ######################################
##########################################################################################
*/ 

function pauseGame() {
	pause()
}

// USES MOVETO OVER TRANSLATE -- translate moves the whole canvas which messes up the positioning.
function moveDown() {
	if(checkBottomBoundary(hand)) {
		// stick blocks in hit boundary (also do it for when it hits another block)
		tetriminoToBlocks();
		resetTimer();
		return;
	}
	erasePiece(posX, posY, hand, ctx);
	posY++;
	drawPiece(posX, posY, hand, ctx);
	drawGridBackground();
	checkBlock();
}

function moveDownRecursive(hand) {
	if(checkBottomBoundary(hand)) {
		// stick blocks in hit boundary (also do it for when it hits another block)
		tetriminoToBlocks();
		resetTimer();
		return 1;
	}
	erasePiece(posX, posY, hand, ctx);
	posY++;
	drawPiece(posX, posY, hand, ctx);
	drawGridBackground();
	checkBlock();
	return scanDownwardsRecursive(hand);
}

function moveLeft() {
	if(checkLeftBoundary(hand))
		return;
	erasePiece(posX, posY, hand, ctx);
	posX--;
	drawPiece(posX, posY, hand, ctx);

}
function moveRight() {
	if(checkRightBoundary(hand))
		return;
	erasePiece(posX, posY, hand, ctx);
	posX++;
	drawPiece(posX, posY, hand, ctx);
	
}
function rotate() {
	if(!canRotate(hand))
		return;
	erasePiece(posX, posY, hand, ctx);
	setNextRotationCoordinates(hand);
	drawPiece(posX, posY, hand, ctx);
}
function holdTetrimno() {
	if(hold == null) {
		hold = nextTetriminoBox.pop();
		nextTetriminoBox.unshift(bag.pop());
	}
	resetPosition();
	[hand, hold] = [hold, hand];
	eraseArea(1, 2, ctx);
	drawPiece(1, 2, hold, ctx);
}
function dropPiece(currPiece) {
	var dropCount = 0;
	dropCount = scanDownwardsRecursive(currPiece);
	addToScore(dropCount);
}

function scanDownwardsRecursive(piecePos) {
	return moveDownRecursive(piecePos) + 1;
}

// Helper functions
function tetriminoToBlocks() {
	blocks = hand.getCoord();
	for(var i=0;i<blocks.length;i++) {
		addBlock(posX+blocks[i].x, posY+blocks[i].y, hand.getColor(), grid);
	}
	newTetrimino();
}
function newTetrimino() {
	hand = nextTetriminoBox.pop();
	nextTetriminoBox.unshift(bag.pop());
	resetPosition();
}

function resetPosition() {
	erasePiece(posX, posY, hand, ctx);
	posX = STARTINGPOSITIONX;
	posY = STARTINGPOSITIONY;
}

function initializeEventListener() {
	canvas.addEventListener("keydown", function(e) {
		if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
		if(e.keyCode === 37) 
			moveLeft();
		if(e.keyCode === 39) {
			moveRight();
		}
		if(e.keyCode === 40) {
			moveDown();
			addToScore(1);
			resetTimer();
		}
		if(e.keyCode === 38) {
			rotate();
            
        }
		if(e.keyCode === 16)
			holdTetrimno();
		if(e.keyCode === 32)
			dropPiece(hand);
		if(e.keyCode === 17)
			pauseGame();
		isBagEmpty(bag);
		drawBlocks(grid);
		drawGridBackground();
		drawNextPieces(ctx);
	});
}

function initializeGrid() {
	grid = new Array(gridWidth); 	// x coordinates of array
	for (var i = 0; i< grid.length; i++) {
		grid[i] = new Array(gridHeight);	// y coordinated of array
	}
}

function checkEndCondition() {
	// check if hand piece 
	handBlocks = hand.getCoord();
	for(i=0;i<handBlocks.length;i++) {
		x = handBlocks[i].x + posX;
		y = handBlocks[i].y + posY;
		if(checkBlockCollision(x, y, grid)) {
			return true;	
		}
	}
	return false;
}

function addToScore(val) {
	playerScore += 10*val*scoreMultiplier;
}

function increaseScoreMultiplier() {
	scoreMultiplier *= 1.1;
}

function startGameClick() {
	var x = event.pageX - (canvas.offsetLeft + canvas.clientLeft);
		y = event.pageY - (canvas.offsetTop + canvas.clientTop);
	if(y > startButton.top && y < startButton.top+startButton.height
		&& x > startButton.left && x < startButton.left+startButton.width) {
			startRound();
	}
}