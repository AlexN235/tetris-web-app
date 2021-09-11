function checkLeftBoundary(currPiece) {
	let coordinates = currPiece.coord;
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
	let coordinates = currPiece.coord;
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
	let coordinates = currPiece.coord;
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
	let rotatedCoord;
	for(var i=0;i<currPiece.coord.length;i++) {
		rotatedCoord = tetrisCoordinates.get((currPiece.coord[i].x).toString() + (currPiece.coord[i].y).toString());
		if(!rotationOutOfBoundaries(rotatedCoord[0], rotatedCoord[1])) // Add check for blocks.
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
	for(var i=0;i<currPiece.coord.length;i++) {
		newCoord = tetrisCoordinates.get((currPiece.coord[i].x).toString() + (currPiece.coord[i].y).toString());
		currPiece.coord[i].x = newCoord[0];
		currPiece.coord[i].y = newCoord[1];
	}
}

function isBagEmpty() {
	if(bag.length <= 2) {
		refillBag();
		shuffle(bag)
	}
}

function refillBag() {
	bag = [getIPiece(), getOPiece(), getJPiece(), getLPiece(), getSPiece(), getTPiece(), getZPiece()]
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
