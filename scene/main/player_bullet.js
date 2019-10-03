class PlayerBullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // this.speed = 5
        // 动态调整每颗子弹速度
        this.speed = config.bullet_speed
    }
    update() {
        this.y -= this.speed
    }
    draw() {

    }
}