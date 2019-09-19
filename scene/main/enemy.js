class Enemy extends GuaImage {
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