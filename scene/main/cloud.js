class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'cloud' + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(5, 15)
        this.x = randomBetween(0, 400)
        this.y = -randomBetween(0, 100)
    }
    update() {
        this.y += this.speed
        if (this.y > 750) {
            this.setup()
        }
    }
}