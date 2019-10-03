class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'background')
        this.cloud = Cloud.new(game, 'cloud')

        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 150
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        this.addEnemies()
        // add particle 添加小火花
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
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
