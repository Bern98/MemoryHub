class Boot extends Phaser.Scene {
    constructor() {
        super('boot');
    }

    preload() {
        this.alignGrid = new AlignGrid({ scene: this, rows: 10, cols: 3 }) // GRIGLIA    

        //var loadingText = this.add.text(0,0,"Loading: ", { fontSize: '32px', fill: '#FFF' }).setOrigin(.5);
        //this.alignGrid.placeAtIndex(13, loadingText)

        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

        //----------------------ASSETS LOAD AREA------------------
        this.load.html('form', 'lib/login/login.html');
        this.load.html('textArea', 'lib/textArea.html');

        this.load.image('back', "./assets/wood.jpg")
        this.load.image('back2', "./assets/bricks.png")
        this.load.image('textBox', "./assets/textBox.png")
        this.load.image('loginTitle', "./assets/loginTitle2.png")
        this.load.image('homeNameBox', "./assets/homeNameBox.png")
        this.load.image('homeIconFrame', "./assets/homeIconFrame.png")
        this.load.image('merdcoin', "./assets/merdcoin.png")
        this.load.image('homeNews', "./assets/homeNews.png")
        this.load.image('homeTitle', "./assets/homeTitle.png")
        this.load.image('profileHeader', "./assets/profileHeader.png")
        this.load.image('profileBetBox', "./assets/profileBetBox.png")
        this.load.image('betBack', "./assets/betBack.png")
        this.load.image('thumb', "./assets/thumb.png")
        this.load.image('profileBlock-1x1', "./assets/profileBlock-1x1.png")
        this.load.image('profileBlock-2x1', "./assets/profileBlock-2x1.png")
        this.load.image('propicBerna', "./assets/propicBerna.png")
        this.load.image('propicRusnald', "./assets/propicRusnald.png")
        this.load.image('propicGuaglio', "./assets/propicGuaglio.png")
        this.load.image('propicPapyrus', "./assets/propicPapyrus.png")
        this.load.image('propicHuge', "./assets/propicHuge.png")
        this.load.image('propicDonny', "./assets/propicDonny.png")
        this.load.image('shopTent', "./assets/shopTent.png")
        this.load.image('poveroLabel', "./assets/poveroLabel.png")


        //----------------Merdle---------------------
        this.load.image('ball', "./assets/ball.png")
        this.load.image('ballx2', "./assets/ballx2.png")
        this.load.image('merdleBorder', "./assets/merdleBorder.png")
        this.load.image('merdleBack', "./assets/merdleBack.png")

        this.load.spritesheet("homeButton", "/assets/homeButton.png", { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("homeShopButton", "/assets/homeShopButton.png", { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("homeSearchButton", "/assets/homeSearchButton.png", { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("homeBetButton", "/assets/homeBetButton.png", { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("homeCardsButton", "/assets/homeCardsButton.png", { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("exitButton", "/assets/exitButton.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("betUiArrowL", "/assets/betUiArrowL.png", { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet("betUiArrowR", "/assets/betUiArrowR.png", { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet("betUiArrowD", "/assets/betUiArrowD.png", { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet("betUiArrowU", "/assets/betUiArrowU.png", { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet("betUiAccept", "/assets/betUiAccept.png", { frameWidth: 256, frameHeight: 128 });
        this.load.spritesheet("betUiMessage", '/assets/betUiMessage.png', { frameWidth: 256, frameHeight: 128 })
        this.load.spritesheet("betSwitchButton", "/assets/betSwitchButton.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("profileBackButton", "/assets/profileBackButton.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("betInfo", "/assets/betInfo.png", { frameWidth: 176, frameHeight: 176 });
        this.load.spritesheet("betAccept", "/assets/betAccept.png", { frameWidth: 176, frameHeight: 176 });
        this.load.spritesheet("betRefuse", "/assets/betRefuse.png", { frameWidth: 176, frameHeight: 176 });
        this.load.spritesheet("betSwitchButtonRed", "/assets/betSwitchButtonRed.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("backButton", "/assets/backButton.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("loadCoin", '/assets/loadCoin.png', { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet("betWin", "/assets/betWin.png", { frameWidth: 176, frameHeight: 176 });
        this.load.spritesheet("betLose", "/assets/betLose.png", { frameWidth: 176, frameHeight: 176 });
        this.load.spritesheet("profileInventory", "/assets/profileInventory.png", { frameWidth: 81, frameHeight: 91 });
        this.load.spritesheet("profileGear", "/assets/profileGear.png", { frameWidth: 81, frameHeight: 80 });
        this.load.spritesheet("shopPurchaseButton", "/assets/shopPurchaseButton.png", { frameWidth: 752, frameHeight: 96 });

        this.load.audio('loginErr', "./assets/audio/loginErr.mp3")
        this.load.audio('ta-dah', "./assets/audio/ta-dah.ogg")
        this.load.audio('aahh', "./assets/audio/aahh.ogg")
        this.load.audio('button', "./assets/audio/button.wav")
        this.load.audio('ballHit', "./assets/audio/ballHit.wav")

        this.load.bitmapFont('alagard', "./assets/font/alagard.png", "./assets/font/alagard.xml")
        this.load.bitmapFont('alagardx2', "./assets/font/alagardx2.png", "./assets/font/alagardx2.xml")
        //--------------------------------------------------------
        this.load.once('start', () => { console.group("Loading...");})
        this.load.on('progress', this.updateText, {})
        this.load.on('complete', this.complete, { scene: this.scene })
/*
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('B&D_Comune', '/assets/cards/comuni/B&D.png')
        this.load.image('Babboporpo_Comune', '/assets/cards/comuni/Babboporpo.png')
        this.load.image('Berna4_Comune', '/assets/cards/comuni/Berna4.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')
        this.load.image('Accia_Comune', '/assets/cards/comuni/Accia.png')*/


    }

    create() {
        let l = this.add.sprite(game.config.width / 2, game.config.height / 2, 'loadCoin')
        this.anims.create({
            key: 'loadCoin',
            frames: this.anims.generateFrameNames('loadCoin', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
            yoyo: true
        })
        l.play('loadCoin')
        if (DEBUG) {
            this.scene.start(DEBUGSCENE)
        }
            else setTimeout(() => {this.scene.start("login")}, 1000)
    }

    update() { ; }

    updateText(percentage) {
        percentage = percentage * 100;
        console.log("Load:" + percentage);
    }

    complete() {
        console.groupEnd()
        console.log("COMPLETE!");
    }

}
