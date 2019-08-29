const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let frames = 0
let interval
let shoot = []
let shoots = []
let samusHealth = []
let megamanXHealth = []
let backgroundSound = new Audio('assets/StageSamus.mp3')
backgroundSound.volume = 0.3
const startButton = document.getElementById('start')
const tryAgain = document.getElementById('tryagain')
let megamanShoot = new Audio('assets/ShootMegamanAudio.mp3')
megamanShoot.volume = 0.4
// let bulletSound = new Audio('assets/BulletSound.mp3')

class FaceChar {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = 'assets/FaceMegaman.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
const megamanFace = new FaceChar(15, 342)

class FaceChar2 {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 55
    this.height = 55
    this.img = new Image()
    this.img.src = 'assets/FaceSamus.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
const samusFace = new FaceChar2(640, 0)

class Background1 {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = 'assets/SamusStage.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Megaman {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speed = 5
    this.width = 75
    this.height = 85
    this.hp = 60
    this.img = new Image()
    this.img.src = 'assets/MegamanPixel.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    if (this.y <= canvas.height - this.height * 2) {
      this.speed += 0.4
      this.y += this.speed
    } else {
      this.speed = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  drawMegamanXHealth() {
    ctx.fillStyle = 'rgb(27, 119, 252)'
    ctx.fillRect(70, 360, this.hp * 2, 10)
  }
  moveDown() {
    this.y += 30
  }
  jump() {
    this.y -= 200
  }
  moveRight() {
    this.x += 30
  }
  moveLeft() {
    this.x -= 30
  }
  checkIfTouch(shoots) {
    return (
      this.x < shoots.x + shoots.width &&
      this.x + this.width > shoots.x &&
      this.y < shoots.y + shoots.height &&
      this.y + this.height > shoots.y
    )
  }
}

class Samus {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 180
    this.height = 220
    this.hp = 300
    this.img = new Image()
    this.img.src = 'assets/Samus.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  drawSamusHealth() {
    ctx.fillStyle = 'rgb(223, 38, 38)'
    ctx.fillRect(30, 15, this.hp * 2, 10)
  }
  checkIfTouch(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

class Enemybullet {
  constructor(y, width, height) {
    this.x = samus.x
    this.y = y
    this.width = width
    this.height = height
    this.img = new Image()
    this.img.src = 'assets/BulletSamus.png'
  }
  draw() {
    this.x -= this.width
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

function generateBulletEnemy() {
  if (frames % 100 === 10) {
    shoots.push(new Enemybullet(Math.floor(Math.random() * 320), 15, 15))
  }
}

function drawBulletEnemy() {
  shoots.forEach(shoots => {
    shoots.draw()
  })
}

class Bullet {
  constructor(width, height) {
    this.x = megamanX.x + megamanX.width
    this.y = megamanX.y + megamanX.height / 2
    this.width = width
    this.height = height
    this.img = new Image()
    this.img.src = 'assets/Bullet.png'
  }
  draw() {
    this.x += this.width
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

function generateBullet() {
  shoot.push(new Bullet(10, 10))
}

function drawBullet() {
  shoot.forEach(shoot => {
    shoot.draw()
  })
}

function collisionMegaman() {
  shoots.forEach((shoot, index) => {
    if (megamanX.checkIfTouch(shoot)) {
      shoots.splice(index, 1)
      megamanX.hp -= 20
    }
  })
}

function collisionSamus() {
  shoot.forEach((shoots, index) => {
    if (samus.checkIfTouch(shoots)) {
      shoot.splice(index, 1)
      samus.hp -= 5
    }
  })
}

function gameOver() {
  if (megamanX.hp <= 0) {
    ctx.font = '120px game-over'
    ctx.fillStyle = 'rgb(246, 53, 53)'
    ctx.fillText(`FIN DE LA PARTIDA`, canvas.width / 2 - 230, 200)
    clearInterval(interval)
    clearCanvas()
  }
}

function youWin() {
  if (samus.hp <= 0) {
    ctx.font = '120px game-over'
    ctx.fillStyle = 'rgb(19, 243, 36)'
    ctx.fillText(`¡GANASTE!`, 230, 200)
    clearInterval(interval)
    clearCanvas()
  }
}

const stageSamus = new Background1()
const samus = new Samus(510, 100)
const megamanX = new Megaman(20, 230)

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  stageSamus.draw()
  megamanX.draw()
  samus.draw()
  megamanFace.draw()
  samusFace.draw()
  drawBullet()
  generateBulletEnemy()
  drawBulletEnemy()
  megamanX.drawMegamanXHealth()
  samus.drawSamusHealth()
  backgroundSound.play()
  collisionMegaman()
  collisionSamus()
  gameOver()
  youWin()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

document.onkeydown = event => {
  switch (event.keyCode) {
    case 79:
      megamanX.jump()
      break
    case 75:
      megamanX.moveLeft()
      break
    case 186:
      megamanX.moveRight()
      break
    case 76:
      megamanX.moveDown()
      break
  }
  update()
}
document.onkeyup = event => {
  switch (event.keyCode) {
    case 83:
      megamanShoot.play()
      generateBullet()
      break
  }
}
//SHOOTING FUNCTION

/* SECOND STAGE WITH LINK

class Background2 {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = 'assets/ZeldaStage.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}

class Megaman {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 85
    this.height = 60
    this.img = new Image()
    this.img.src = 'assets/MegamanPixel.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.y++
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Link {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 260
    this.height = 260
    this.img = new Image()
    this.img.src = 'assets/Link.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.y++
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

const stageLink = new Background2()
const megamanX = new Megaman(50, 300)
const link = new Link(440, 120)

function update() {
  stageLink.draw()
  megamanX.draw()
  link.draw()
}

*/

// class Background3 {
//   constructor() {
//     this.x = 0
//     this.y = 0
//     this.width = canvas.width
//     this.height = canvas.height
//     this.img = new Image()
//     this.img.src = 'assets/KirbyStage.png'
//     this.img.onload = () => {
//       this.draw()
//     }
//   }
//   draw() {
//     this.x--
//     if (this.x < -canvas.width) {
//       this.x = 0
//     }
//     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
//     ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
//   }
// }

// class Megaman {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//     this.width = 85
//     this.height = 60
//     this.img = new Image()
//     this.img.src = 'assets/MegamanPixel.png'
//     this.img.onload = () => {
//       this.draw()
//     }
//   }
//   draw() {
//     this.y++
//     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
//   }
// }

// class Kirby {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//     this.width = 250
//     this.height = 250
//     this.img = new Image()
//     this.img.src = 'assets/Kirby.png'
//     this.img.onload = () => {
//       this.draw()
//     }
//   }
//   draw() {
//     this.y++
//     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
//   }
// }

// const stageKirby = new Background3()
// const megamanX = new Megaman(50, 250)
// const kirby = new Kirby(440, 90)

// function update() {
//   stageKirby.draw()
//   megamanX.draw()
//   kirby.draw()
// }

startButton.onclick = function() {
  start()
}

tryAgain.onclick = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  start()
}
// update()
