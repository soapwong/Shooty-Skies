class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, '按 k 开始游戏')
        this.addElement(label)

        game.registerAction('k', function() {
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
}