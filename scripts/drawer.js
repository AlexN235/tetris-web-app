/* Drawer */
function eraseCanvas(canvas, ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPiece(x, y, piece, ctx) {
	ctx.save();
	ctx.translate(x*scale, y*scale);
	drawTetrimino(piece);
	ctx.restore();
}
function erasePiece(x, y, piece, ctx) {
	ctx.save();
	ctx.translate(x*scale, y*scale);
	eraseTetrimino(piece);
	ctx.restore();
}

function eraseArea(x, y, width, height, ctx) {
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(x, y, width, height);
	ctx.restore();
}
function eraseNextBlock() {
    eraseArea((nextBox.x+0.1)*scale, (nextBox.y+0.1)*scale, (nextBox.width-0.2)*scale, (nextBox.height-0.2)*scale, ctx);
}

function eraseHoldBlock() {
    eraseArea((holdBox.x+0.1)*scale, (holdBox.y+0.1)*scale, (holdBox.width-0.2)*scale, (holdBox.height-0.2)*scale, ctx);
}

function drawHold() {
	holdPiece = hold;
	eraseHoldBlock();
	drawPiece(1, 2, holdPiece, ctx);
}
function drawNextPieces(ctx) {
    let centeringDifference = 0;
    let nextBlock;
    eraseNextBlock();
	for(var i=0;i<3;i++) {
		ctx.save();
        nextBlock = nextTetriminoBox[i];
        if(nextBlock.type == "O" || nextBlock.type == "J" || nextBlock.type == "L")
            centeringDifference = 1.25;
        else
            centeringDifference = 0.75;
		ctx.translate((nextBox.x+centeringDifference)*scale, (4+(i*5))*scale);
		drawNextTetrimino(nextBlock);
		ctx.restore();
	}
}

function drawTetrimino(currPiece) {
	ctx.save();
	ctx.fillStyle = currPiece.getColor();
	let coordinates = currPiece.getCoord();
	for(var i=0;i<coordinates.length;i++) {
		ctx.fillRect(coordinates[i].x*scale, coordinates[i].y*scale, scale, scale);
	}
	ctx.restore();
}
function drawNextTetrimino(currPiece) {
	ctx.save();
	ctx.fillStyle = currPiece.getColor();
	let coordinates = currPiece.getDisplayCoords();
	for(var i=0;i<coordinates.length;i++) {
		ctx.fillRect(coordinates[i].x*scale, coordinates[i].y*scale, scale, scale);
	}
	ctx.restore();
}
function eraseTetrimino(currPiece) {
	ctx.save();
	let coordinates = currPiece.getCoord();
	for(var i=0;i<coordinates.length;i++) {
		ctx.clearRect(coordinates[i].x*scale, coordinates[i].y*scale, scale, scale);
	}
	ctx.restore();
}

function drawGridBackground() {
	ctx.save();
	ctx.strokeStyle = 'white';
	
	for(var i=0;i<=gridWidth;i++) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(i*scale + gridX*scale, 0 + gridY*scale);		
		ctx.lineTo(i*scale + gridX*scale, gridHeight*scale + gridY*scale);
		ctx.closePath();
		ctx.stroke();
		
		ctx.restore(); 
	}
	
	for(var i=0;i<=gridHeight;i++) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0 + gridX*scale, i*scale + gridY*scale);
		ctx.lineTo(gridWidth*scale + gridX*scale, i*scale + gridY*scale);
		ctx.closePath();
		ctx.stroke();
		
		ctx.restore();
	}
	ctx.restore();
}
function clearGrid() {
	for(var i=0;i<x;i++) {
		for(var j=0;j<y;i++) {
			grid[i][j] = 0;
		}
	}
}

function drawBlock(x, y, color) { 
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(x*scale, y*scale, scale, scale);
	ctx.restore();
}
function drawBlocks(grid) {
	for(var i=0;i< gridWidth;i++) {
		for(var j =0;j<gridHeight;j++) {
			if(grid[i][j] != null) {
				drawBlock(i+gridX, j+gridY, grid[i][j].color, grid);
			}
		}
	}
}

function drawLine(x, y) {
	ctx.save();
	ctx.moveTo(x, y);
	ctx.lineTo(x+scale, y+scale);
	ctx.stroke();
	ctx.restore();
}

function drawBox(x, y, width, height) {
    // Helper for drawHoldBox -- draws single box
	ctx.save();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "white";
	ctx.moveTo(x*scale, y*scale);
	ctx.lineTo(x*scale, (y+height)*scale);
	ctx.lineTo((x+width)*scale, (y+height)*scale);
	ctx.lineTo((x+width)*scale, y*scale);
	ctx.lineTo(x*scale, y*scale);
	ctx.stroke();
	ctx.restore();
}
function drawHoldBox(x, y, width, height) {
    // draws boxes for the hold, score, next peices
    drawBox(x, y, width, height);
    drawBox(x-0.1, y-0.1, width+0.2, height+0.2);
}

function drawScoreBoard(ctx) {
    ctx.save();
	ctx.fillText("Score:", scorePosition.x*scale, scorePosition.y*scale);
    ctx.restore();
}

function displayScore(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
	ctx.fillText(playerScore, scorePosition.x*scale, (scorePosition.y+1)*scale);
    ctx.restore();
}

function eraseScore() {
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect((scorePosition.x-scoreBox.width/2)*scale, (scorePosition.y+0.1)*scale, 4*scale, 1.5*scale);
	ctx.restore();
}

function displayFinalScore(ctx) {
	ctx.fillText("Score: " + playerScore, canvas.width/2, canvas.height/2);
}