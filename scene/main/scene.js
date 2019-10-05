class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 5
        this.numberOfClouds = 5
        this.bg = GuaImage.new(game, 'background')
        this.cloud = Cloud.new(game, 'cloud')
        // 火花
        this.particles = []

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        
        this.addClouds()
        this.addEnemies()
        // add particle 添加小火花
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
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
    addClouds() {
        var cs = []
        for (var i = 0; i < this.numberOfClouds; i++) {
            var c = Cloud.new(this.game)
            cs.push(c)
            this.addElement(c)
        }
        this.clouds
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
        // 删除火花, 删除玩家子弹, 删除敌人子弹
        this.deleteParticle()
        this.deletePlayerBullet()
        this.deleteEnemyBullet()
        // 击中敌人, 子弹碰撞, 敌子弹击中玩家
        this.bulletKillEnemy()
        this.bulletKillBullet()
        this.bulletKillPlayer()
        // 玩家敌机碰撞
        this.bothCollide()
    }
    updateParticle(game, x, y) {
        var p = GuaParticleSystem.new(game, x, y)
        this.addElement(p)
        this.particles.push(p)
    }
    deleteParticle() {
        // 生成新数组
        var particles = this.particles.concat()
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i]
            if (p.duration < 0) {
                this.deleteElement(p)
            }
        }
    }
    deletePlayerBullet() {
        var bullets = this.player.bullets
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i]
            if (b.y < 0) {
                // 删除图片, 切掉子弹
                this.deleteElement(b)
                this.player.bullets.splice(i, 1)
                // log('bullets', this.player.bullets)
            }
        }
    }
    deleteEnemyBullet() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            // log('e', e)
            var bullets = e.bullets
            for (let j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (b.y > 600) {
                    this.deleteElement(b)
                    e.bullets.splice(j, 1)
                }
            }
        }
    }
    bulletKillEnemy() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            // log('e', e)
            var bullets = this.player.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (e.collide(b)) {
                    log('碰撞')
                    this.deleteElement(b)
                    this.player.bullets.splice(j, 1)
                    e.alive = false
                    this.updateParticle(this.game, b.x, b.y)
                }
            }
        } 
    }
    bulletKillBullet() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var enemyBullets = e.bullets
            var bullets = this.player.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                for (var k = 0; k < enemyBullets.length; k++) {
                    var a = enemyBullets[k]
                    if (a.collide(b)) {
                        // log('hit')
                        this.deleteElement(b)
                        this.player.bullets.splice(j, 1)
                        this.deleteElement(a)
                        enemyBullets.splice(k, 1)
                        this.updateParticle(this.game, b.x, b.y)
                    }
                }
            }
        }
    }
    bulletKillPlayer() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var bullets = e.bullets
            var player = this.player
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (player.collide(b)) {
                    this.deleteElement(b)
                    this.deleteElement(player)
                    player.alive = false
                    this.updateParticle(this.game, b.x, b.y)
                    this.gameOver()
                }
            }
        }
    }
    bothCollide() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            if (this.player.collide(e)) {
                this.deleteElement(e)
                this.deleteElement(this.player)
                this.player.alive = false
                e.alive = false
                this.updateParticle(this.game, e.x, e.y)
                this.gameOver()
            }
        }
    }
    // 
    gameOver() {
        var game = this.game
        // log('game', this.game, game)
        if (this.player.alive === false) {
            setTimeout(function() { 
                var s = SceneEnd.new(game)
                game.replaceScene(s)
            }, 700)
        }
    }
}
