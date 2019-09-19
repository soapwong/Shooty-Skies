class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // 动态调整每颗子弹速度
        this.speed = config.bullet_speed
    }
    update() {
        // 调整整体子弹速度
        // this.speed = config.bullet_speed
        this.y -= this.speed
    }
}