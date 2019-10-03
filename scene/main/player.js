class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
        this.bullets = []
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
            this.bullets.push(b)
            // log('this.bullets', this.bullets)
        }
    }
    moveLeft() {
        this.x -= this.speed
        if (this.x < 0) {
            this.x = 0
        }
    }
    moveRight() {
        this.x += this.speed
        var borderRight = 400 - this.w
        if (this.x > borderRight) {
            this.x = borderRight
        }
    }
    moveUp() {
        this.y -= this.speed
        if (this.y < 0) {
            this.y = 0 
        }
    }
    moveDown() {
        this.y += this.speed
        if (this.y > 600 - this.h) {
            this.y = 600 - this.h
        }
    }
}