class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'cloud' + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(1, 3)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 100)
    }
    update() {
        this.y += this.speed
        if (this.y > 750) {
            this.setup()
        }
    }
}