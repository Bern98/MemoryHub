let back;
class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload(){;}

    create() {
        back = this.add.tileSprite(0, 0, 2000, 3000, "back")
        let u = this.add.image(0, 0, "chest").setOrigin(0.5).setScale(0.1).setInteractive().on('pointerdown', () => {
            
        })
        this.alignGrid = new AlignGrid({scene:this, cols:5, rows:5})
        //this.alignGrid.showNumbers()
        this.alignGrid.placeAtIndex(12, u)

        this.input.once('pointerdown', (gameObject) => {
            this.socket = io("http://localhost:3000/", {transports : ["websocket"] });
            console.log("Scrigno premuto")
        })
    }

    update() {
        back.tilePositionX -= 0.5
        back.tilePositionY -= 0.5}
}