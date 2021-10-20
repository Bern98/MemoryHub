class Test extends Phaser.Scene {
    constructor() {
        super("test")
        this.back
        this.grid = new AlignGrid({ scene: this, rows: 9, cols: 5 })
        this.matrix = [[null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]]
        this.dragX
        this.dragY
        this.oldX
        this.oldY
        this.isDragging = false
        this.isDraggingOver = false
        this.draggedOver
        this.overObject
        this.settingsMode = true
        this.debugLine
    }

    preload() { ; }

    create() {
        let self = this;
        this.grid.showNumbers()
        this.back = this.add.tileSprite(0, 0, 4000, 4000, "back2").setTint(0x5f5f5f)
        this.add.image(game.config.width / 2, game.config.height - 28, "profileFooter").setScale(.75)
        let inventoryButton = new Button({ scene: this, key: "profileInventory" }, "button").setX(game.config.width * .3).setY(game.config.height - 110).setScale(2)
        let gearButton = new Button({ scene: this, key: "profileGear" }, "button").setX(game.config.width * .7).setY(game.config.height - 110).setScale(2)
        this.grid.showNumbers()
        this.debugLine = this.add.bitmapText(500, 500, "alagard", "alagard", 16).setScale(4).setTint(0x00ff00)
        //for (i in PROFILEBLOCKS) this.add.sprite(0, 0, 'profileBlock-1x1').setInteractive().setOrigin(0);
        //let image1 = this.add.sprite(0, 0, 'profileBlock-1x1').setInteractive().setOrigin(0);
        console.log(this.debugLine)
        //this.input.setDraggable([image1]);

        this.input.on('pointerdown', (pointer) => { console.log(pointer.x.toFixed(0), pointer.y.toFixed(0)) })

        this.input.on('gameobjectover', function (pointer, gameObject) {

            //gameObject.setTint(0x00ff00);

            if (this.draggedOver != undefined) this.isDraggingOver = true
        });

        this.input.on('gameobjectout', function (pointer, gameObject) {

            //gameObject.clearTint();
            gameObject.setFrame(0)
            this.isDragging = false

        });

        this.input.on('dragstart', function (pointer, gameObject) {
            let t = this.debugLine
            this.overObject = self.add.image(gameObject.x, gameObject.y, gameObject.texture.key).setOrigin(.5)
            //this.input.setDraggable(this.overObject)
            this.oldX = gameObject.x
            this.oldY = gameObject.y
            this.isDragging = true
            this.draggedOver = gameObject
            gameObject.setAlpha(.6)
            this.isDraggingOver = false
            console.log(t)
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            if (pointer.y < game.config.height * (8 / 9)) {
                gameObject.x = Phaser.Math.Snap.To(dragX, game.config.width / 5);
                gameObject.y = Phaser.Math.Snap.To(dragY, game.config.height / 9);
                this.overObject.x = pointer.x
                this.overObject.y = pointer.y
                
            }
        });


        this.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
            this.isDragging = false
            if (this.isDraggingOver) {
                gameObject.x = this.oldX
                gameObject.y = this.oldY
            } else {
                //console.log(this.isDraggingOver)
                gameObject.x = Phaser.Math.Snap.To(gameObject.x, game.config.width / 5);
                gameObject.y = Phaser.Math.Snap.To(gameObject.y, game.config.height / 9);
            }
            gameObject.setAlpha(1)
            this.isDragging = false
            this.isDraggingOver = false
            this.draggedOver = undefined
            this.overObject.destroy()
        });

        gearButton.on('pointerdown', () => {
            this.settingsMode = !this.settingsMode;

        })

        for (let i in PROFILEBLOCKS) {
            this.checkCell(PROFILEBLOCKS[i])

        }

    }

    update() {
        this.back.tilePositionX -= 0.55
        this.back.tilePositionY -= 0.55
    }

    checkCell(obj) {
        switch (obj.name) {
            case "Name":
                this.input.setDraggable(this.add.sprite(obj.x, obj.y, 'profileBlock-2x1').setInteractive().setOrigin(0))
                break;
            case "Coins":
                this.input.setDraggable(this.add.sprite(obj.x, obj.y, 'profileBlock-1x1').setInteractive().setOrigin(0))
                break;
            case "Role":

                break;
            /* case "":
                 break;
             /*case "":
                 break;
            /* case "":
                 break;
            /* case "":
                 break;
            /* case "":
                 break;*/

            default:
                break;
        }
    }

    updateMatrix() {

    }


}