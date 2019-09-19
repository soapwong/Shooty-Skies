class Cloud extends GuaImage {
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