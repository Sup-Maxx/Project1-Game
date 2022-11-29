//     <canvas id="canvas" width="500" height="650"></canvas>
//     (x, y, width, heigth)
//      first try for the github push


canvasWidth = canvas.width
canvasHeight = canvas.height

class Game {
    constructor() {
        this.ctx = null
        this.bg = null
        this.playChar = null
        this.enemy = null
        this.projectile = null

        this.quiverOfArrows = []
    } 

    startGame() {
        const canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.playChar = player
        this.enemy = skeleton
        this.projectile = arrow
        this.timer = myTimer

        //Background Image
        const background = new Image()
        background.src = "./Images/grass-background.png"
        background.onload = () => {
            this.bg = background
            updateCanvas()                
            this.drawPlayer()      
        }
    } 

    // function that draws a character on the canvas
    drawPlayer() {  
        this.ctx.drawImage(
            this.playChar.img,
            this.playChar.posX,
            this.playChar.posY,
            this.playChar.width,
            this.playChar.height
        )
    } 

    drawEnemy() {
        this.ctx.drawImage(
            this.enemy.img,
            this.enemy.posX,
            this.enemy.posY,
            this.enemy.width,
            this.enemy.height
        )
    }

    drawProjectile() {
        this.ctx.drawImage(
            this.projectile.img,
            this.projectile.posX,
            this.projectile.posY,
            this.projectile.width,
            this.projectile.height
        )
    }

    

    moreArrows() {
        this.quiverOfArrows.forEach(() => {
            this.ctx.drawImage(
                this.projectile.arrow,
                arrow.posX,
                arrow.posY,
                arrow.width,
                arrow.height,
            );
            if (arrow.posY > canvasHeight) {
                this.quiverOfArrows.shift()
            }
        })

        /* for (let i=0; i<this.quiverOfArrows.length; i++) {
            setInterval(() => {
                this.quiverOfArrows.push(new Projectile(10, 50, Math.floor(Math.random()*450), 20))
            }, 3000);
        } */
    }

    /* 
    loop to create
    create and push to array
    every arrow in array moves like this:

     
    */
} 
const game = new Game ()

class Score {
    constructor(width, height, color, posX, posY) {
    this.width = width
    this.height = height
    this.posX = posX
    this.posY = posY

    this.score = 0  
    }

    update() {
        game.ctx.font = "25px Arial"
        game.ctx.fillStyle = "black"
        game.ctx.fillText("Score: " + this.score, 30, 40)
    } 
}
myScore = new Score("20px", "Arial", 100, 50)

class Timer {
    constructor(width, height, posX, posY) {
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY

        this.time = 60
    }

    update() {
        game.ctx.font = "25px Arial"
        game.ctx.fillStyle = "black"
        game.ctx.fillText(this.time, 445, 45)
    }

    decrement() {
        let seconds = 60
        setInterval(() => {
            this.time = seconds
            seconds--
        }, 1000);
    }
}

let myTimer = new Timer(50,50, 300, 70)

class Live {
    constructor(width, height, posX, posY) {
    this.width = width
    this.height = height
    this.posX = posX
    this.posY = posY

    this.lives = "❤️"
    }
    update() {
        game.ctx.font = "25px Arial"
        game.ctx.fillStyle = "darkred"
        game.ctx.fillText(this.lives, 30, 80)
    }
}
myLives = new Live ("20px", "Arial", 100, 100)

class Character {
    constructor(width, height, posX, posY, image) {
        //character sizes
        this.width = width
        this.height = height
        //character position
        this.posX = posX
        this.posY = posY
        //character speed
        this.speedX = 0
        this.speedY = 0
        this.speed = {x: 0, y: 0,}
        this.maxSpeed = {x: 10, y: 12,}
        //acceleration + gravity
        this.gravity = 0.5
        this.velocity = {x: 0, y: 1,}
        // pulls character image - 2 
        this.img = this.drawCharacter()
    }

    newPosition() {
            this.posX += this.speedX;
            this.posY += this.speedY;

            //Velocity + gravity + acceleration
            //this.posX += this.velocity.x
           /*  this.posY += this.velocity.y
            if (this.posY+this.height + this.velocity.y < canvasHeight) this.velocity.y+= this.gravity
            else this.velocity.y = 0 */
    }

    // function that creates an image of the character
    drawCharacter() { 
        //where to put new character image - 1
        const player = new Image()
        player.src = "./Images/bowman.png"
        return player
    } 

    moveControl() { //✅
        // to the right D
        if (keys[68] == true) this.speedX = this.maxSpeed.x; 
        // to the left A
        if (keys[65] == true) {this.speedX = -this.maxSpeed.x; }
        // to the top W
        if (keys[87] == true) this.speedY = -this.maxSpeed.y; 
        // to the bottom S
        if (keys[83] == true) this.speedY = this.maxSpeed.y; 
        // add "Space" to shoot
    }

    stopControl() {
        if (keys[68] == false) this.speedX = this.speed.x
        if (keys[65] == false) this.speedX = this.speed.x
        if (keys[87] == false) this.speedY = this.speed.y
        if (keys[83] == false) this.speedY = this.speed.y
    }

    canvasCollision() { //✅ 
        if (this.posX < 0) this.posX = 0
        if (this.posX > canvasWidth - this.width) this.posX = canvasWidth - this.width
        if (this.posY < 0) this.posY = 0
        if (this.posY > canvasHeight - this.height) this.posY = canvasHeight - this.height - 7
    }

    enemyCollision(target) { //✅
        let myLeft = this.posX
        let myRight = this.posX + this.width
        let myTop = this.posY
        let myBottom = this.posY + this.height

        if ((myRight >= target.posX && myLeft <= target.posX+target.width) &&
            (myBottom > target.posY && myTop < target.posY+target.height)
        ) {
            target.posX = Math.floor(Math.random()*450)
            target.posY = Math.floor(Math.random()*600)
            
            myScore.score++
        } 
    }

    killCollision(shot) {
        let myLeft = this.posX
        let myRight = this.posX + this.width
        let myTop = this.posY
        let myBottom = this.posY + this.height

        if (shot.velocity.y > 0) {
            if ((myRight >= shot.posX && myLeft <= shot.posX+5) &&
            (myBottom > shot.posY && myTop < shot.posY+shot.height)
            ) { 
                shot.posY = myTop - shot.height + 15
                myLives.lives = "You just died 💔 I'm sowwy 😢"
            } 
        }
        
    }
}

// creating a character with his position
const player = new Character(50, 50, 25, 600) 

class Enemy extends Character {
    constructor(width, height, posX, posY) {
        super (width, height, posX, posY)  
    }
    drawCharacter() {
        const enemy = new Image()
        enemy.src = "./Images/enemy-skeleton.png"
        return enemy
    }
}
const skeleton = new Enemy(50, 50, Math.floor(Math.random()*450), Math.floor(Math.random()*600))


class Projectile extends Character {
    constructor(width, height, posX, posY) {
        super (width, height, posX, posY)
        //character speed
        this.speedX = 0
        this.speedY = 0
        this.speed = {x: 0, y: 0,}
        this.maxSpeed = {x: 10, y: 12,}
        //acceleration + gravity
        this.velocity = {x: 0, y: 5,}
    }

    drawCharacter() {
        const projectile = new Image()
        projectile.src = "./Images/arrow-image.png"
        return projectile
    }

    newPosition() {
        this.posX += this.speedX;
        this.posY += this.velocity.y;
        if (this.posY >= 600) {
            //this.velocity.y = 0
            this.posY = 0
            this.posX = Math.floor(Math.random()*450) 
        }
    }
}

const arrow = new Projectile(10, 50, Math.floor(Math.random()*450), 20)

class Platform {
    constructor(plWidth, plHeight, plPosX, plPosY, plColor) {
        this.plWidth = plWidth
        this.plHeight = 10
        this.plPosX = plPosX
        this. plPosY = plPosY
        this.plColor = plColor
    }

    drawPlatform() {
        game.ctx.fillStyle = this.plColor
        game.ctx.fillRect(this.plPosX, this.plPosY, this.plWidth, this.plHeight)
    }
}    
//ground platform
const platform0 = new Platform(500, 10, 0, 640, "darkgreen")

// big mega update funciton 
// function that refreshes canvas with all content
function updateCanvas() { 
    setInterval(() => {
        //cleans the canvas
        game.ctx.clearRect(0, 0, 500, 650)
        //draws a background
        game.ctx.drawImage(game.bg, -200, -150, 800, 850)
        //score + lives + timer
        myScore.update()
        myLives.update()
        myTimer.update()
        myTimer.decrement()
        //canvas Collision check
        player.canvasCollision()
        //player new position + collision check
        player.enemyCollision(skeleton) //✅
        player.newPosition()
        arrow.newPosition()
        player.killCollision(arrow)
        // draws everything on canvas
        game.drawPlayer()
        game.drawEnemy()
        game.drawProjectile()
        
        game.moreArrows()
        
        //draw ground platform
        platform0.drawPlatform()
    }, 20)
} 


let keys = [];
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    player.moveControl()
  });
  
  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
    player.stopControl()
  });

window.onload = () => {
    document.getElementById("start-game").onclick = () => {
        document.querySelector("h2").style.display="none"
        game.startGame()
    }
    
}