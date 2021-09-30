function checkLeftBoundary(currPiece) {
	let coordinates = currPiece.getCoord();
	for(var i=0;i<coordinates.length;i++) {
		if(coordinates[i].x+posX <= gridX) {
			return true;
		}
		if(checkBlockCollision(coordinates[i].x+posX-1, coordinates[i].y+posY, grid))
			return true;
	}
	return false;
}

function checkRightBoundary(currPiece) {
	let coordinates = currPiece.getCoord();
	for(var i=0;i<coordinates.length;i++) {
		if(coordinates[i].x+posX+1 >= gridX+gridWidth) {
			return true;
		}
		if(checkBlockCollision(coordinates[i].x+posX+1, coordinates[i].y+posY, grid))
			return true;
	}
	return false;
}

function checkBottomBoundary(currPiece) {
	let coordinates = currPiece.getCoord();
	for(var i=0;i<coordinates.length;i++) {
		if(coordinates[i].y+posY+1 >= gridY+gridHeight) {
			return true;
		}
		if(checkBlockCollision(coordinates[i].x+posX, coordinates[i].y+posY+1, grid))
			return true;
	}
	return false;
}

function canRotate(currPiece) {
	// get rotated coordinates
	let rotatedCoord = currPiece.getRotatedCoords();
	for(var i=0;i<rotatedCoord.length;i++) {
		if(!rotationOutOfBoundaries(rotatedCoord[i].x, rotatedCoord[i].y)) // Add check for blocks.
			return false;
	}
	return true;
	// compare rotated coordinates to all edges (and blocks) if nothing in the way return true
}

function rotationOutOfBoundaries(x, y) {
	if(x+posX < gridX || x+posX >= gridX+gridWidth) {
		return false;
	}
	if(y+posY >= gridY+gridHeight) {
		return false;
	}
	if(checkBlockCollision(x+posX, y+posY, grid))
		return false;
	return true;
}

function setNextRotationCoordinates(currPiece) {
    console.log(currPiece.direction);
    currPiece.rotate();
    console.log(currPiece.direction);
    console.log("next");
}

function isBagEmpty() {
	if(bag.length <= 2) {
		refillBag();
		shuffle(bag)
	}
}

function refillBag() {
	bag = [new iBlock(), new oBlock(), new jBlock(), new lBlock(), new sBlock(), new tBlock(), new zBlock()]
}

function shuffle(arr) {
	// Fisher-Yates (aka Knuth) Shuffle algorithm
	// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	var currIndex = arr.length; 
	var randomIndex;
	
	while (0 !== currIndex) {
		randomIndex = Math.floor(Math.random() * currIndex);
		currIndex--;
		
		[arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]];
	}
	return arr
}
