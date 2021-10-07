class block {
    constructor() {
        this.type = null;
        this.color = null;
        this.direction = directionEnum.UP;
        this.coord = [];
    }
    getDirection(){
        return this.direction;
    }
    getType() {
        return this.type;
    }
    getColor() {
        return this.color;
    }
    getCoord() {
        return this.coord;
    }
}

class iBlock extends block {
    constructor() {
        super();
        this.type = "I",
		this.color = COLOR.LBLUE,
		this.coord = [{x : 2, y : 0},
                      {x : 2, y : 1},
                      {x : 2, y : 2},
                      {x : 2, y : 3}];
    }
    rotate() {
        switch(this.direction) {
            case directionEnum.LEFT:
                this.direction = directionEnum.UP;
                this.coord = [{x : 2, y : 0},
                              {x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 2, y : 3}];
                break;
            case directionEnum.UP:
                this.direction = directionEnum.RIGHT;
                this.coord = [{x : 0, y : 1},
                              {x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 3, y : 1}];
                break;
            case directionEnum.RIGHT:
                this.direction = directionEnum.DOWN;
                this.coord = [{x : 2, y : 0},
                              {x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 2, y : 3}];
                break;
            case directionEnum.DOWN:
                this.direction = directionEnum.LEFT;
                this.coord = [{x : 0, y : 1},
                              {x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 3, y : 1}];
                break;
        }
        return;
    }
    getRotatedCoords() {
        let newCoord;
        switch(this.direction) {
            case directionEnum.LEFT:
                newCoord = [{x : 2, y : 0},
                            {x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 2, y : 3}];
                break;
            case directionEnum.UP:
                newCoord = [{x : 0, y : 1},
                            {x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 3, y : 1}];
                break;
            case directionEnum.RIGHT:
                newCoord = [{x : 2, y : 0},
                            {x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 2, y : 3}];
                break;
            case directionEnum.DOWN:
                newCoord = [{x : 0, y : 1},
                            {x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 3, y : 1}];
                break;
        }
        return newCoord;
    }
    getDisplayCoords() {
        return [{x : 1, y : 0},
                {x : 1, y : 1},
                {x : 1, y : 2},
                {x : 1, y : 3}];
    }
}

class oBlock extends block{
    constructor() {
        super();
        this.type = "O",
		this.color = COLOR.YELLOW,
		this.coord = [{x : 1, y : 1},
                      {x : 1, y : 2},
                      {x : 2, y : 1},
                      {x : 2, y : 2}];
    }
    rotate() {
        return;
    }
    getRotatedCoords() {
        return this.coord;
    }
    getDisplayCoords() {
        return [{x : 0, y : 1},
                {x : 0, y : 2},
                {x : 1, y : 1},
                {x : 1, y : 2}];
    }
}

class jBlock extends block{
    constructor() {
        super();
        this.type = "J",
		this.color = COLOR.BLUE,
		this.coord = [{x : 1, y : 1},
					  {x : 2, y : 1},
					  {x : 1, y : 2},
					  {x : 1, y : 3}];
    }
    
    // methods
    rotate() {
        switch(this.direction) {
            case directionEnum.LEFT:
                this.direction = directionEnum.UP;
                this.coord = [{x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 1, y : 2},
                              {x : 1, y : 3}];
                break;
            case directionEnum.UP:
                this.direction = directionEnum.RIGHT;
                this.coord = [{x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 1, y : 1},
                              {x : 0, y : 1}];
                break;
            case directionEnum.RIGHT:
                this.direction = directionEnum.DOWN;
                this.coord = [{x : 2, y : 2},
                              {x : 1, y : 2},
                              {x : 2, y : 1},
                              {x : 2, y : 0}];
                break;
            case directionEnum.DOWN:
                this.direction = directionEnum.LEFT;
                this.coord = [{x : 1, y : 2},
                              {x : 1, y : 1},
                              {x : 2, y : 2},
                              {x : 3, y : 2}];
                break;
        }
        return;
    }
    
    getRotatedCoords() {
        let newCoord;
        switch(this.direction) {
            case directionEnum.LEFT:
                newCoord = [{x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 1, y : 2},
                            {x : 1, y : 3}];
                break;
            case directionEnum.UP:
                newCoord = [{x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 1, y : 1},
                            {x : 0, y : 1}];
                break;
            case directionEnum.RIGHT:
                newCoord = [{x : 2, y : 2},
                            {x : 1, y : 2},
                            {x : 2, y : 1},
                            {x : 2, y : 0}];
                break;
            case directionEnum.DOWN:
                newCoord = [{x : 1, y : 2},
                            {x : 1, y : 1},
                            {x : 2, y : 2},
                            {x : 3, y : 2}];
                break;
        }
        return newCoord;
    }
    getDisplayCoords() {
        return [{x : 1, y : 0},
                {x : 1, y : 1},
                {x : 1, y : 2},
                {x : 0, y : 2}];
    }
}

class lBlock extends block{
    constructor() {
        super();
        this.type = "L",
		this.color = COLOR.ORANGE,
		this.coord = [{x : 1, y : 1},
					  {x : 2, y : 1},
					  {x : 2, y : 2},
					  {x : 2, y : 3}]
    }
    
    rotate() {
        switch(this.direction) {
            case directionEnum.LEFT:
                this.direction = directionEnum.UP;
                this.coord = [{x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 2, y : 3}]
                break;
            case directionEnum.UP:
                this.direction = directionEnum.RIGHT;
                this.coord = [{x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 1, y : 2},
                              {x : 0, y : 2}];
                break;
            case directionEnum.RIGHT:
                this.direction = directionEnum.DOWN;
                this.coord = [{x : 2, y : 2},
                              {x : 1, y : 2},
                              {x : 1, y : 1},
                              {x : 1, y : 0}];  
                break;
            case directionEnum.DOWN:
                this.direction = directionEnum.LEFT;
                this.coord = [{x : 1, y : 2},
                              {x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 3, y : 1}];
                
                break;
        }
        return;
    }
    
    getRotatedCoords() {
        let newCoord;
        switch(this.direction) {
            case directionEnum.LEFT:
                newCoord = [{x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 2, y : 3}]
                break;
            case directionEnum.UP:
                newCoord = [{x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 1, y : 2},
                            {x : 0, y : 2}];
                break;
            case directionEnum.RIGHT:
                newCoord = [{x : 2, y : 2},
                            {x : 1, y : 2},
                            {x : 1, y : 1},
                            {x : 1, y : 0}];  
                break;
            case directionEnum.DOWN:
                newCoord = [{x : 1, y : 2},
                            {x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 3, y : 1}];
                break;
        }
        return newCoord;
    }
    getDisplayCoords() {
        return [{x : 0, y : 0},
                {x : 0, y : 1},
                {x : 0, y : 2},
                {x : 1, y : 2}];
    }
}

class sBlock extends block{
    constructor() {
        super();
        this.type = "S",
		this.color = COLOR.GREEN,
		this.coord = [{x : 1, y : 1},
                      {x : 2, y : 1},
                      {x : 2, y : 2},
                      {x : 3, y : 2}]
    }
    
    rotate() {
        switch(this.direction) {
            case directionEnum.RIGHT:
                this.direction = directionEnum.UP;
                this.coord = [{x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 3, y : 2}]
                break;
            case directionEnum.UP:
                this.direction = directionEnum.RIGHT;
                this.coord = [{x : 2, y : 0},
                              {x : 2, y : 1},
                              {x : 1, y : 1},
                              {x : 1, y : 2}];
                break;
        }
        return;
    }
    
    getRotatedCoords() {
        let newCoord;
        switch(this.direction) {
            case directionEnum.RIGHT:
                newCoord = [{x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 3, y : 2}]
                break;
            case directionEnum.UP:
                newCoord = [{x : 2, y : 0},
                            {x : 2, y : 1},
                            {x : 1, y : 1},
                            {x : 1, y : 2}];
                break;
        }
        return newCoord;
    }
    getDisplayCoords() {
        return [{x : 2, y : 1},
                {x : 1, y : 1},
                {x : 1, y : 2},
                {x : 0, y : 2}];
    }
}

class tBlock extends block{
    constructor() {
        super();
        this.type = "T",
		this.color = COLOR.PURPLE,
		this.coord = [{x : 1, y : 1},
                      {x : 2, y : 1},
					  {x : 2, y : 0},
					  {x : 3, y : 1}]
    }

    rotate() {
        switch(this.direction) {
            case directionEnum.LEFT:
                this.direction = directionEnum.UP;
                this.coord = [{x : 1, y : 1},
                              {x : 2, y : 1},
                              {x : 2, y : 0},
                              {x : 3, y : 1}]
                break;
            case directionEnum.UP:
                this.direction = directionEnum.RIGHT;
                this.coord = [{x : 2, y : 0},
                              {x : 2, y : 1},
                              {x : 3, y : 1},
                              {x : 2, y : 2}];
                break;
            case directionEnum.RIGHT:
                this.direction = directionEnum.DOWN;
                this.coord = [{x : 3, y : 1},
                              {x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 1, y : 1}];  
                break;
            case directionEnum.DOWN:
                this.direction = directionEnum.LEFT;
                this.coord = [{x : 2, y : 2},
                              {x : 2, y : 1},
                              {x : 1, y : 1},
                              {x : 2, y : 0}];
                
                break;
        }
        return;
    }
    
    getRotatedCoords() {
        let newCoord;
        switch(this.direction) {
            case directionEnum.LEFT:
                newCoord = [{x : 1, y : 1},
                            {x : 2, y : 1},
                            {x : 2, y : 0},
                            {x : 3, y : 1}]
                break;
            case directionEnum.UP:
                newCoord = [{x : 0, y : 2},
                            {x : 2, y : 1},
                            {x : 3, y : 1},
                            {x : 2, y : 2}];
                break;
            case directionEnum.RIGHT:
                newCoord = [{x : 3, y : 1},
                            {x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 1, y : 1}];  
                break;
            case directionEnum.DOWN:
                newCoord = [{x : 2, y : 2},
                            {x : 2, y : 1},
                            {x : 1, y : 1},
                            {x : 0, y : 3}];
                break;
        }
        return newCoord;
    }
    getDisplayCoords() {
        return [{x : 0, y : 2},
                {x : 1, y : 2},
                {x : 2, y : 2},
                {x : 1, y : 1}];
    }
}

class zBlock extends block{
    constructor() {
        super();
        this.type = "Z",
		this.color = COLOR.RED,
		this.coord = [{x : 3, y : 1},
					  {x : 2, y : 1},
					  {x : 2, y : 2},
					  {x : 1, y : 2}]
    }
    
    rotate() {
        switch(this.direction) {
            case directionEnum.RIGHT:
                this.direction = directionEnum.UP;
                this.coord = [{x : 3, y : 1},
                              {x : 2, y : 1},
                              {x : 2, y : 2},
                              {x : 1, y : 2}]
                break;
            case directionEnum.UP:
                this.direction = directionEnum.RIGHT;
                this.coord = [{x : 2, y : 0},
                              {x : 2, y : 1},
                              {x : 3, y : 1},
                              {x : 3, y : 2}];
                break;
        }
        return;
    }
    
    getRotatedCoords() {
        let newCoord;
        switch(this.direction) {
            case directionEnum.RIGHT:
                newCoord = [{x : 3, y : 1},
                            {x : 2, y : 1},
                            {x : 2, y : 2},
                            {x : 1, y : 2}]
                break;
            case directionEnum.UP:
                newCoord = [{x : 2, y : 0},
                            {x : 2, y : 1},
                            {x : 3, y : 1},
                            {x : 3, y : 2}];
                break;
        }
        return newCoord;
    }
    getDisplayCoords() {
        return [{x : 0, y : 1},
                {x : 1, y : 1},
                {x : 1, y : 2},
                {x : 2, y : 2}];
    }
}

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