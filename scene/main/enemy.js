class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.alive = true
        this.bullets = []
        this.cooldown = randomBetween(70, 90)
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 360)
        this.y = -randomBetween(0, 275)
    }
    update() {
        this.y += this.speed
        if (this.y > 750 || this.alive === false) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
        this.fire()
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = randomBetween(50, 70)
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = EnemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
}