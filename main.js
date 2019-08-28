const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//FIRST STAGE WITH SAMUS

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
    this.width = 75
    this.height = 85
    this.img = new Image()
    this.img.src = 'assets/MegamanPixel.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.y
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  moveDown() {
    this.y += 30
  }
  moveUp() {
    this.y -= 30
  }
  moveRight() {
    this.x += 30
  }
  moveLeft() {
    this.x -= 30
  }
}

class Bullet {
  constructor(x, y, length, height, speed) {
    this.x = x
    this.y = y
    this.l = length
    this.height = height
    this.s = speed + 1
    this.width = 10
    this.height = 10
    this.img = new Image()
    this.img.src = 'assets/Bullet.png'
    // this.img.onload = () => {
    //   this.draw()
    // }
  }
  draw() {
    ctx.drawImage(this.img, this.x + 33, this.y + 30, this.width, this.height)
    this.x++
  }
  killEnemy() {
    this.draw(this.x + 200)
  }
}

// class Laser{
//     constructor(x, y, length, height, speed) {
//       this.x= x
//       this.y= y
//       this.l= length
//       this.height = height
//       this.s= speed
//       this.imgpow = new Image()
//       this.imgpow.src = './images/power.png'
//     }

//     draw() {
//       context.drawImage(this.imgpow, this.x, this.y, this.l, this.height)
//     }
//   }

//   const bullet = new Laser(0, 0, 100, 14, 10)

//   console.log(bullet)

class Samus {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 280
    this.height = 300
    this.img = new Image()
    this.img.src = 'assets/Samus.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

const stageSamus = new Background1()
const samus = new Samus(440, 60)
const megamanX = new Megaman(50, 230)
const shoot = new Bullet(megamanX.x, megamanX.y, 10, 14, 1000)

document.onkeydown = event => {
  switch (event.keyCode) {
    case 79:
      megamanX.moveUp()
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
    default:
      megamanX.moveDown()
      break
  }
  update()
}

function update() {
  stageSamus.draw()
  megamanX.draw()
  samus.draw()
  shoot.killEnemy()
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

// function start() {
//   if (interval) return
//   interval = setInterval(update, 1000 / 60)
// }

// update()
