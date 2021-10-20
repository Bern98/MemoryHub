class MainBall extends Phaser.Physics.Matter {
    constructor(scene, x, y, key, matterCategory, friction = .3, bounce = 1){
        super(scene, x, y, key)

        this.setCircle()
        this.setFriction(friction)
        this.setBounce(bounce)

    }
}