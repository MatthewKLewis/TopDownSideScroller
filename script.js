const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

//LISTENERS
var wDown = false;
var aDown = false;
var sDown = false;
var dDown = false;

//consts
const UNIT = 10
const CANVAS_BORDER_PIXELS = 500
const TILES_ON_SIDE = CANVAS_BORDER_PIXELS / UNIT
const TILES_IN_VIEW = (TILES_ON_SIDE) * (TILES_ON_SIDE)

const TOTAL_WORLD_TILES = 500
canvas.width = CANVAS_BORDER_PIXELS;
canvas.height = CANVAS_BORDER_PIXELS;

class Player {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.i = 0
      this.img = new Image()
      this.img.src = './player.png'
    }

    goDown() {
        this.y = Math.max(this.y + 1, 0)
    }

    goUp() {
        this.y = Math.max(this.y - 1, 0)
    }

    goLeft() {
        this.x = Math.max(this.x - 1, 0)
    }

    goRight() {
        this.x = Math.max(this.x + 1, 0)
    }

    getIndex () {
        return Math.max(this.x + (this.y * (TILES_ON_SIDE)), 0)
    }
  }

document.addEventListener('keydown', (evt)=>{
    if (evt.key == 'w') {
        wDown = true;
    } else if (evt.key == 'a') {
        aDown = true;
    } else if (evt.key == 's') {
        sDown = true;
    } else if (evt.key == 'd') {
        dDown = true;
    }
})

document.addEventListener('keyup', (evt)=>{
    if (evt.key == 'w') {
        wDown = false;
    } else if (evt.key == 'a') {
        aDown = false;
    } else if (evt.key == 's') {
        sDown = false;
    } else if (evt.key == 'd') {
        dDown = false;
    }
})


//vars
frame = 0

//set up world
worldGrid = []
for (let y = 0; y < TOTAL_WORLD_TILES; y++) {
    for (let x = 0; x < TOTAL_WORLD_TILES; x++) {
        worldGrid.push({x: x, y: y, i: x + y * (worldGrid.length), r: Math.random()})
    }
}

//set up player
var player = new Player()

function drawBackground() {
    var startingIndex = player.getIndex()    
    for (let y = 0; y < TILES_ON_SIDE; y++) {
        for (let x = 0; x < TILES_ON_SIDE; x++) {

            if (worldGrid[startingIndex].r > .5) {
                ctx.fillStyle = 'green'
            } else {
                ctx.fillStyle = 'darkgreen'
            }
            ctx.fillRect(x * UNIT, y * UNIT, UNIT, UNIT)
            startingIndex++;
        }
    }
}

function render() {
    //draw world grid
    drawBackground()

    //draw player
    ctx.fillStyle = 'pink'
    ctx.fillRect(CANVAS_BORDER_PIXELS / 2, CANVAS_BORDER_PIXELS / 2, UNIT, UNIT)
}

function gameLoop() {
    //controller
    if (wDown) {
        player.goUp()
    }
    if (aDown) {
        player.goLeft()
    }
    if (sDown) {
        player.goDown()
    }
    if (dDown) {
        player.goRight()
    }

    //model - controller
    

    //view
    render()

    frame++;
}

//Go
setInterval(gameLoop, 18)