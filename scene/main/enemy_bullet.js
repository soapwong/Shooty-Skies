class EnemyBullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.speed = 5
    }
    update() {
        this.y += this.speed
    }
    draw() {

    }
}