class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, '游戏结束, 按 r 返回标题')
        this.addElement(label)
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    // constructor draw 了, 不能有 draw 方法
}
