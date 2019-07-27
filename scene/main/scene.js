const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
}

class Bullet extends SoapImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // 动态调整每颗子弹速度
        this.speed = config.bullet_speed
    }
    update() {
        // 调整整体子弹速度
        // this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class Player extends SoapImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
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

class Cloud extends SoapImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 3
        this.x = randomBetween(0, 375)
        this.y = -randomBetween(0, 100)
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
        this.cloud = Cloud.new(game, 'cloud')

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
        g.registerAction('0', function() {
            s.player.fire()
        })
    }
    update() {
        super.update()
    }
}
