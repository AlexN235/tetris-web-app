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

function eraseArea(x, y, ctx) {
	ctx.save();
	ctx.translate(x*scale, y*scale);
	ctx.clearRect(0, 0, 4*scale, 4*scale);
	ctx.restore();
}

function drawHold() {
	holdPiece = hand;
	erasePiece(1, 2, ctx)
	drawPiece(1, 2, holdPiece, ctx);
}
function drawNextPieces(ctx) {
	for(var i=0;i<3;i++) {
		ctx.save();
		ctx.translate(19*scale, (4+(i*4))*scale);
		drawTetrimino(nextTetriminoBox[i]);
		ctx.restore();
	}
}

function drawTetrimino(currPiece) {
	ctx.save();
	ctx.fillStyle = currPiece.color;
	let coordinates = currPiece.coord;
	for(var i=0;i<coordinates.length;i++) {
		ctx.fillRect(coordinates[i].x*scale, coordinates[i].y*scale, scale, scale);
	}
	ctx.restore();
}
function eraseTetrimino(currPiece) {
	ctx.save();
	let coordinates = currPiece.coord;
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

function drawHoldBox(x, y, width, height) {
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

function drawScoreBoard(ctx) {
	ctx.fillText("Score:", scorePosition.x, scorePosition.y);
}

function displayScore(ctx) {
	ctx.fillText(playerScore, scorePosition.x, scorePosition.y+50);
}

function eraseScore() {
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(scorePosition.x-65, scorePosition.y+10, 130, 50);
	ctx.restore();
}

function displayFinalScore(ctx) {
	ctx.fillText("Score: " + playerScore, canvas.width/2, canvas.height/2);
}