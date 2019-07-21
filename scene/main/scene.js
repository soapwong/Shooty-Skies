class Player extends SoapImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
    }
    update() {

    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

var randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends SoapImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 375)
        this.y = -randomBetween(0, 275)
    }
    update() {
        this.y += this.speed
        if (this.y > 750) {
            this.setup()
        }
    }
}

class Scene extends SoapScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = SoapImage.new(game, 'background')

        // this.player = SoapImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 150
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.player)

        this.addEnemies()

    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
    }
    update() {

    }
}

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)

//     var score = 0

//     var blocks = loadlevel(game, 1)

//     // events
    // game.registerAction('a', function() {
    //     paddle.moveLeft()
    // })
    // game.registerAction('d', function() {
    //     paddle.moveRight()
    // })
    // game.registerAction('f', function() {
    //     ball.fire()
    // })

//     s.draw = function() {
//         // draw
//         game.context.fillStyle = "#2c3e50"
//         game.context.fillRect(0, 0, 400, 300)

//         game.drawImage(paddle)
//         game.drawImage(ball)

//         // dram blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }

//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的 scene
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞，两个图形相交
//         if (paddle.collide(ball)) {
//             // 应该调用一个反弹 ball.bounce()
//             ball.bounce()
//         }
//         // 判断 ball 和 block 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.bounce()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         enableDrag = false
//     })

//     return s
// }