const COLOR = Object.freeze({
	LBLUE	: "#addaff",
	YELLOW 	: "#ffff00",
	RED 	: "#ed0400",
	GREEN 	: "#53ed00",
	PURPLE 	: "#e500ed",
	BLUE 	: "#002bed",
	ORANGE	: "#ed9a00",
});

const directionEnum = Object.freeze({
	UP 		: "up",
	DOWN 	: "down",
	LEFT 	: "left",
	RIGHT 	: "right",
});

const tetrisCoordinates = new Map([
  ['10', [3, 1]],
  ['31', [2, 3]],
  ['23', [0, 2]],
  ['02', [1, 0]],
  ['20', [3, 2]],
  ['32', [1, 3]],
  ['13', [0, 1]],
  ['01', [2, 0]],
  ['11', [2, 1]],
  ['21', [2, 2]],
  ['22', [1, 2]],
  ['12', [1, 1]]
]);

function getIPiece() {
	return {
		type		: "I",
		color 		: COLOR.LBLUE,
		direction	: directionEnum.UP,
		coord		: [{x : 2, y : 0},
					   {x : 2, y : 1},
					   {x : 2, y : 2},
					   {x : 2, y : 3}]
	};
}

function getOPiece() {
	return {
		type		: "O",
		color 		: COLOR.YELLOW,
		direction	: directionEnum.UP,
		coord		: [{x : 1, y : 1},
					   {x : 1, y : 2},
					   {x : 2, y : 1},
					   {x : 2, y : 2}]
	};
}

function getJPiece() {
	return {
		type		: "J",
		color 		: COLOR.BLUE,
		direction	: directionEnum.UP,
		coord		: [{x : 1, y : 1},
					   {x : 2, y : 1},
					   {x : 1, y : 2},
					   {x : 1, y : 3}]
	};
}

function getLPiece() {
	return {
		type		: "L",
		color 		: COLOR.ORANGE,
		direction	: directionEnum.UP,
		coord		: [{x : 1, y : 1},
					   {x : 2, y : 1},
					   {x : 2, y : 2},
					   {x : 2, y : 3}]
	};
}

function getSPiece() {
	return {
		type		: "S",
		color 		: COLOR.GREEN,
		direction	: directionEnum.UP,
		coord		: [{x : 2, y : 1},
					   {x : 3, y : 1},
					   {x : 1, y : 2},
					   {x : 2, y : 2}]
	};
}

function getTPiece() {
	return {
		type		: "T",
		color 		: COLOR.PURPLE,
		direction	: directionEnum.UP,
		coord		: [{x : 1, y : 1},
					   {x : 2, y : 1},
					   {x : 3, y : 1},
					   {x : 2, y : 2}]
	};
}

function getZPiece() {
	return {
		type		: "Z",
		color 		: COLOR.RED,
		direction	: directionEnum.UP,
		coord		: [{x : 0, y : 1},
					   {x : 1, y : 1},
					   {x : 1, y : 2},
					   {x : 2, y : 2}]
	};
}

class Block {
	constructor(color) {
		this.color = color;
	}	
}

function checkBlock() {
	for(var i=0;i<gridHeight;i++) {
		if(checkLine(i)) {
			scorePoint(i)
		}
	}
}

function checkLine(lineIndex) {
	for(var i=0;i<gridWidth;i++) {
		if(grid[i][lineIndex] == null) {
			return false;
		}
	}
	return true;
}

function scorePoint(lineIndex) {
	clearBoard();
	deleteAndShift(lineIndex);
	drawBlocks(grid);
	drawGridBackground();
}

function clearBoard() {
	ctx.save()
	ctx.fillStyle = 'black';
	ctx.fillRect(gridX*scale, gridY*scale, gridWidth*scale, gridHeight*scale);
	ctx.restore();
}

function deleteAndShift(lineIndex) {
	for(var i=lineIndex;i>0;i--) {
		for(var j=0;j<gridWidth;j++) {
			grid[j][i] = grid[j][i-1];
		}
	}
}

function addBlock(x, y, color, grid) {
	grid[x-gridX][y-gridY] = new Block(color);
}

function checkBlockCollision(x, y, grid) {
	return grid[x-gridX][y-gridY] != null;
}