class EnemyBullet extends GuaImage {
    constructor(game) {
        super(game, 'enemyBullet')
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.speed = 4
    }
    update() {
        this.y += this.speed
    }
}