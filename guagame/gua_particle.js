class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 25
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        // 加速度
        var factor = 0.02
        // 重力
        // 火花重力, this.vx this.vy + 重力
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}