class Home extends Phaser.Scene {
    constructor() {
        super("home");
        this.self = this;
        this.betSwitch = true;
        this.dragNames = true
        this.descSwitch = true
        this.bet = { // ENUM GESTIONE VINCITA/PERDITA SCOMMESSA
            Vincita_Mittente: 1,
            Perdita_Mittente: 2,
            Vincita_Destinatario: 3,
            Perdita_Destinatario: 4
        };
        this.coins;
        this.coinTextAnim
        this.home
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);

        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
        this.load.plugin('rextexteditplugin', url, true);

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        let self = this;
        //this.sound.play("aahh")
        //-----------------------Sfondo e Griglia-------------------------
        back = this.add.tileSprite(0, 0, 4000, 4000, "back").setInteractive().setTint(colors[Math.floor(Math.random() * 6)])
        this.alignGrid = new AlignGrid({ scene: this, rows: 12, cols: 6 })
        this.alignGrid2 = new AlignGrid({ scene: this, rows: 13, cols: 5 })
        //this.alignGrid3.showNumbers()
        back.on('pointerup', () => { shopButton.setFrame(0) })
        back.on('pointerup', () => { searchButton.setFrame(0) })
        back.on('pointerup', () => { cardsButton.setFrame(0) })
        back.on('pointerup', () => { betButton.setFrame(0) })

        //------------------------------Pausa------------------------------
        this.game.events.on('BLUR', () => { this.sleep() })
        this.game.events.on('FOCUS', () => { this.wake() })
        //--------------------Grafica------------------------------------------

        let nameBox = this.add.image(game.config.width, 0, "homeNameBox").setScale(.85).setOrigin(1, 0)
        let propic = this.add.image(0, 0, "propic" + USER).setOrigin(0).setScale(.85)
        let icon = this.add.image(0, 0, "homeIconFrame").setOrigin(0).setScale(.85)
        let u = this.add.bitmapText(0, 0, 'alagardx2', USER, 64).setOrigin(0, .4).setScale(1.1)
        this.alignGrid.placeAtIndex(2, u)

        let merdcoinAnim = this.add.bitmapText(32 * COINS.toString().length, -50, 'alagardx2', "", 64).setAlpha(0)
        this.coinTextAnim = merdcoinAnim
        let merdcoinN = this.add.bitmapText(60, -28, 'alagardx2', COINS, 64)
        this.coins = merdcoinN
        let merdcoinI = this.add.image(0, 0, "merdcoin")
        let container = this.add.container(0, 0, [merdcoinI, merdcoinN, merdcoinAnim])
        this.alignGrid.placeAtIndex(8, container)

        let title = this.add.image(0, 0, "homeTitle")
        this.alignGrid2.placeAtIndex(17, title)

        let comingSoonText = this.add.bitmapText(0, 0, 'alagard', "Venendo presto!", 32).setAlpha(0).setOrigin(.5)

        let shopButton = new Button({ scene: this, key: "homeShopButton" }, "button")
        let searchButton = new Button({ scene: this, key: "homeSearchButton" }, "button")
        let betButton = new Button({ scene: this, key: "homeBetButton" }, "button")
        let cardsButton = new Button({ scene: this, key: "homeCardsButton" }, "button")
        this.alignGrid.placeAtIndex(31, shopButton)
        this.alignGrid.placeAtIndex(34, searchButton)
        this.alignGrid.placeAtIndex(49, betButton)
        this.alignGrid.placeAtIndex(52, cardsButton)

        //let newsTrail = this.add.rectangle(0, 0, 1000, 170, 0xe8923b, 1)
        //this.alignGrid.placeAtIndex(69, newsTrail)
        //let news = this.add.image(0, game.config.height, "homeNews").setScale(.85).setOrigin(0, 1)

        this.home = [title, shopButton, searchButton, betButton, cardsButton]

        let loadingBlock = this.add.rectangle(0, 0, game.config.width * 2, game.config.height * 2, 0x000000, .85).setOrigin(.5).setInteractive()

        this.input.on('pointerdown', (pointer) => { console.log(pointer.x.toFixed(0), pointer.y.toFixed(0), (pointer.x / 1080).toFixed(2), (pointer.y / 1920).toFixed(2));})

        this.scale.on('resize', () => {

        })

        //---------------------Socket------------------------------------------- 
        socket.on("disconnect", () => { //EVENTUALE DISCONNESSIONE PORTO L'UTENTE ALLO START, DA RIVEDRE
            //game.scene.start("login")
            let disconnectText = this.add.bitmapText(game, config.width / 2, game.config.height / 2, 'alagardx2', "Connessione Persa", 64).setTint(0xff0000).setOrigin(.5)
        });

        socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE

        socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE

        socket.emit("profileBlocks", USER)

        socket.on("pendingBetsResponse", (res) => {
            PENDINGBETS = res
            this.loadUnlock("betResponse1", loadingBlock) // SBLOCCO SCHERMO CARICA
        })

        socket.on("sentBetsResponse", (res) => {
            SENTBETS = res
            this.loadUnlock("betResponse2", loadingBlock) // SBLOCCO SCHERMO CARICA
        })
        if (DEBUG) { this.loadUnlock("DEBUG", loadingBlock) }

        socket.on("profileBlocksSend", (res) => {
            PROFILEBLOCKS = JSON.parse(res)
            PROFILEBLOCKS = JSON.parse(PROFILEBLOCKS) // Non lo so perchè, ma funziona solo cosi...
        })

        /* socket.on('coinRequestSend', (n, m) => { // RISPOSTA ALLA SPESA DI MONETE
             if (n) {
                 merdcoinN.text = n[0].Merdcoins
                 COINS = n[0].Merdcoins
             } else {
                 let t = parseInt(merdcoinN.text)
                 t -= m
                 COINS -= m
                 merdcoinN.text = t
             }
             merdcoinAnim.text = "-" + m;
             merdcoinAnim.setTint(0xff0000)
             merdcoinAnim.alpha = 1
             this.tweens.add({
                 targets: merdcoinAnim,
                 alpha: { value: 0, duration: 1100, ease: 'power1' },
                 loop: 0,
             })
             this.tweens.add({
                 targets: merdcoinAnim,
                 y: { value: -80, duration: 1100, ease: 'power1' },
                 loop: 0,
                 onComplete: () => { merdcoinAnim.x = 32 * COINS.toString().length; merdcoinAnim.y = -50; },
             })
         })*/

        socket.on('coinBack', (n, flag) => { // MONETA TORNA INDIETRO DOPO RIFIUTO
            if (flag == "add") {
                merdcoinAnim.text = "+" + n;
                merdcoinAnim.setTint(0x00ff00);
                COINS += n;
            }
            else if (flag == "minus") {
                merdcoinAnim.text = "-" + n;
                merdcoinAnim.setTint(0xff0000);
                COINS -= n;
            }

            merdcoinAnim.alpha = 1
            this.tweens.add({
                targets: merdcoinAnim,
                alpha: { value: 0, duration: 1100, ease: 'power1' },
                loop: 0,
            })
            this.tweens.add({
                targets: merdcoinAnim,
                y: { value: -80, duration: 1100, ease: 'power1' },
                loop: 0,
                onComplete: () => { merdcoinAnim.x = 32 * COINS.toString().length; merdcoinAnim.y = -50; },
            })
        })

        //---------------------Logica Pulsanti------------------------------------------- 
        shopButton.on('pointerdown', () => {
            //this.showProfileUI(self, homeGroup);
            //comingSoonText.alpha = 1
            //comingSoonText.x = shopButton.x
            //comingSoonText.y = shopButton.y - 180
            //setTimeout(() => { comingSoonText.alpha = 0 }, 1000)
            this.home.forEach(x => {x.setVisible(false); x.disableInteractive()})
            this.showShop()
        })

        searchButton.on('pointerdown', () => {
            comingSoonText.alpha = 1
            comingSoonText.x = searchButton.x
            comingSoonText.y = searchButton.y - 180
            setTimeout(() => { comingSoonText.alpha = 0 }, 1000)
        })

        betButton.on('pointerdown', () => {
            socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
            socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
            this.showBetUI([shopButton, searchButton, betButton, cardsButton])
            //this.betGraphic([shopButton, searchButton, betButton, cardsButton])
        })

        cardsButton.on('pointerdown', () => {
            comingSoonText.alpha = 1
            comingSoonText.x = cardsButton.x
            comingSoonText.y = cardsButton.y - 180
            setTimeout(() => { comingSoonText.alpha = 0 }, 1000)
        })

        self.input.on('pointerup', () => {
            shopButton.setFrame(0)
            searchButton.setFrame(0)
            betButton.setFrame(0)
            cardsButton.setFrame(0)
        })

    }

    update() {
        back.tilePositionX -= 0.55
        back.tilePositionY -= 0.55
        this.coins.setText(COINS)
    }
    //------------------------------Logica Scommesse------------------------------
    /*
    showBetUI(background) {
        let container = this.add.container(game.config.width / 2, game.config.height / 2)
        let back = this.add.rectangle(0, 0, game.config.width * .7, game.config.height * .7, 0x000000, 1).setOrigin(.5)
        back.alpha = .9;
        this.betSwitch = true
        let exit = new Button({ scene: this, key: "exitButton" }, "button")

        let switchButton = new Button({ scene: this, key: "betSwitchButton" }, "button")

        let text = this.add.bitmapText(0, -400, 'alagardx2', "Scegli con chi scommettere:", 50).setOrigin(.5).setInteractive()

        let arrowU = new Button({ scene: this, key: "betUiArrowU" }, "button").setX(300)
        let arrowD = new Button({ scene: this, key: "betUiArrowD" }, "button").setX(300).setY(200)

        let index = 0;

        container.add(back);
        container.add(switchButton);
        container.add(exit);
        container.add(text);
        container.add(arrowU);
        container.add(arrowD);

        let nomi = this.stampa(this, background, container, index) // FUNZIONE STAMPA NOMI INIZIALE

        arrowU.on('pointerdown', () => { // SCORRI NOMI SU
            if (index != 0) {
                index--
                nomi.forEach(el => el.destroy())
                nomi = this.stampa(this, background, container, index)
            }
        })

        arrowD.on('pointerdown', () => { // SCORRI NOMI GIU
            if (index + 4 < NAMES.length) {
                index++
                nomi.forEach(el => el.destroy())
                nomi = this.stampa(this, background, container, index)

            }
        })

        exit.once('pointerdown', () => { // TASTO USCITA
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            container.destroy()
        })

        switchButton.once('pointerdown', () => { // TASTO CAMBIO SCOMMESSA
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            container.destroy()
            this.showBetSwitch(background)
        })

        exit.x = -game.config.width * .277
        exit.y = -game.config.height * .31

        switchButton.x = game.config.width * .277
        switchButton.y = -game.config.height * .31

        for (let i = 0; i < background.length; i++) {// TOGLIE INTERAZIONE ALLO SFONDO
            background[i].disableInteractive()
        }

    }
*/
    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }

    showShop(){
        let tent = this.add.image(0, 320, 'shopTent').setOrigin(0)
        let back = new Button({ scene: this, key: "backButton" }, "button").setY(455).setX(10).setOrigin(0)

        let label1 = this.add.image(game.config.width * .5, game.config.height * .36, 'poveroLabel').setOrigin(.5)
        let one = new Button({ scene: this, key: "shopPurchaseButton" }, "button").setX(game.config.width * .5).setY(game.config.height * .95)

        back.once('pointerdown', () => {
            tent.destroy()
            back.destroy()
            this.home.forEach(x => {x.setVisible(true); x.setInteractive()})
        })
    }

    showBetUI2(background, oldcontainer, player) {// COMUNICA COL DB
        let container = this.add.container(game.config.width / 2, game.config.height / 2)
        let back = this.add.rectangle(0, 0, game.config.width * .7, game.config.height * .4, 0x000000, 1).setOrigin(.5)
        back.alpha = .9;
        let exit = new Button({ scene: this, key: "exitButton" }, "button")
        let text = this.add.bitmapText(0, -180, 'alagardx2', "Scommetti con " + player, 50).setOrigin(.5).setInteractive()
        let arrowL = new Button({ scene: this, key: "betUiArrowL" }, "button")
        let arrowR = new Button({ scene: this, key: "betUiArrowR" }, "button")
        let inc = 10
        let acceptButton = new Button({ scene: this, key: "betUiAccept" }, "button")
        let coinErrorText = this.add.bitmapText(0, 0, 'alagard', "Monete insufficienti!", 32).setTint(0xff0000).setOrigin(.5).setVisible(false)
        let messageButton = new Button({ scene: this, key: "betUiMessage" }, "button")
        let messageArea = this.add.dom().createFromCache('textArea').setScale(2).setVisible(false);
        let messageText = () => { return document.getElementById('textAREA').value }

        let inputText = this.add.rexInputText(0, 0, 10, 10, {
            id: 'myNumberInput',
            type: 'number',
            text: '0',
            fontSize: '64px',
            fontFamily: 'alagardx2',
            border: 3,
            borderColor: '0xffffff',
            maxLength: 5,
            minLength: 1,
        }).resize(300, 100).setOrigin(0.5)

        //Aggiunta Container
        container.add(back);
        container.add(exit);
        container.add(text);
        container.add(inputText);
        container.add(arrowL);
        container.add(arrowR);
        container.add(acceptButton);
        container.add(messageButton);
        container.add(coinErrorText);
        container.add(messageArea);

        //Listeners
        exit.once('pointerdown', () => {
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            oldcontainer.destroy()
            container.destroy()
        })

        arrowL.on('pointerdown', () => {
            let x = parseInt(inputText.text)
            if (x != 0) {
                if (x < 50) inc = 10
                if (x >= 50 && x <= 500) inc = 50
                if (x >= 500) inc = 500

                x -= inc

                if (x < 0) inputText.text = 0
                inputText.text = x
            }
        })

        arrowR.on('pointerdown', () => {
            let x = parseInt(inputText.text)
            if (x < 50) inc = 10
            if (x >= 50) inc = 50
            if (x >= 500) inc = 500

            x += inc

            inputText.text = x
        })

        acceptButton.on('pointerdown', () => {
            let n = parseInt(inputText.text)
            if (inputText.text > 0 && n <= COINS) {
                socket.emit('betRequest', USER, player, inputText.text, document.getElementById('textAREA').value)
                socket.emit("pendingBetsRequest", USER)
                socket.emit("sentBetsRequest", USER)
                for (let j = 0; j < n; j++) { COINS-- }

                this.coinTextAnim.text = "-" + n;
                this.coinTextAnim.setTint(0xff0000)
                this.coinTextAnim.alpha = 1
                this.tweens.add({
                    targets: this.coinTextAnim,
                    alpha: { value: 0, duration: 1100, ease: 'power1' },
                    loop: 0,
                })
                this.tweens.add({
                    targets: this.coinTextAnim,
                    y: { value: -80, duration: 1100, ease: 'power1' },
                    loop: 0,
                    onComplete: () => { this.coinTextAnim.x = 32 * COINS.toString().length; this.coinTextAnim.y = -50; },
                })

            } else if (n > COINS) {
                console.error("Monete insufficienti")
                coinErrorText.setVisible(true)
                setTimeout(() => { coinErrorText.setVisible(false) }, 1000) // FINALMENTE FUNZIONA PORCO DIO NON LE PAGO LE TASSE
            }

            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            oldcontainer.destroy()
            container.destroy()

        })

        messageButton.on('pointerdown', () => {
            if (messageArea.visible) { messageArea.setVisible(false); console.log(messageText()) }
            else messageArea.setVisible(true)
        })

        //Aggiustamenti coordinate
        exit.x = -game.config.width * .27
        exit.y = -game.config.height * .154

        arrowL.x = -game.config.width * .1
        arrowL.y = game.config.height * .05

        arrowR.x = game.config.width * .1
        arrowR.y = game.config.height * .05

        acceptButton.x -= 133
        acceptButton.y = game.config.height * .11

        messageButton.x += 133
        messageButton.y = game.config.height * .11

        coinErrorText.y = acceptButton.y + 110

        messageArea.x = game.config.width * -.34
        messageArea.y = game.config.height * -.33

    }

    showBetSwitch(background) {

        let container = this.add.container(game.config.width / 2, game.config.height / 2)
        let back = this.add.rectangle(0, 0, game.config.width * .8, game.config.height * .65, 0x000000, 1).setOrigin(.5)
        back.alpha = .9;
        container.add(back);
        let exit = new Button({ scene: this, key: "exitButton" }, "button")

        let switchButton = new Button({ scene: this, key: "backButton" }, "button")
        let switchButtonRed = new Button({ scene: this, key: "betSwitchButtonRed" }, "button")


        let text = this.add.bitmapText(0, -400, 'alagardx2', "Scommesse ricevute:", 50).setOrigin(.5).setInteractive()

        let arrowU = new Button({ scene: this, key: "betUiArrowU" }, "button").setX(350)
        let arrowD = new Button({ scene: this, key: "betUiArrowD" }, "button").setX(350).setY(200)
        let index = 0;
        let nomi = this.stampaBet(this, container, index, background) // FUNZIONE STAMPA NOMI INIZIALE

        container.add(switchButton);
        container.add(switchButtonRed);
        container.add(exit);
        container.add(text);
        container.add(arrowU);
        container.add(arrowD);

        arrowU.on('pointerdown', () => { // SCORRI NOMI SU
            if (this.betSwitch) {
                if (index != 0) {
                    index--
                    nomi.p.forEach(el => el.destroy())
                    nomi.BetAccept.forEach(el => el.destroy())
                    nomi.BetRefuse.forEach(el => el.destroy())
                    nomi = this.stampaBet(this, container, index, background)
                }
            } else {
                if (index != 0) {
                    index--
                    nomi.p.forEach(el => el.destroy())
                    nomi.BetAccept.forEach(el => el.destroy())
                    nomi.BetRefuse.forEach(el => el.destroy())
                    nomi = this.stampaBetSent(this, container, index, background)
                }
            }
        })

        arrowD.on('pointerdown', () => { // SCORRI NOMI GIU
            if (this.betSwitch) {
                if (index + 4 < PENDINGBETS.length) {
                    index++
                    nomi.p.forEach(el => el.destroy())
                    nomi.BetAccept.forEach(el => el.destroy())
                    nomi.BetRefuse.forEach(el => el.destroy())
                    nomi = this.stampaBet(this, container, index, background)

                }
            } else {
                if (index + 4 < SENTBETS.length) {
                    index++
                    nomi.p.forEach(el => el.destroy())
                    nomi.BetAccept.forEach(el => el.destroy())
                    nomi.BetRefuse.forEach(el => el.destroy())
                    nomi = this.stampaBetSent(this, container, index, background)
                }
            }
        })

        exit.once('pointerdown', () => { // TASTO USCITA
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            container.destroy()
        })

        switchButton.once('pointerdown', () => { // TASTO CAMBIO SCOMMESSA
            this.showBetUI(background)
            container.destroy()

        })

        switchButtonRed.on('pointerdown', () => { // TASTO CAMBIO SCOMMESSA
            index = 0;
            if (nomi.emp) nomi.emp.destroy()
            if (this.betSwitch) {
                text.text = "Scommesse inviate:"
                for (let i = 0; i < nomi.p.length; i++) { nomi.p[i].destroy(); nomi.id[i] = undefined }
                for (let i = 0; i < nomi.BetAccept.length; i++) { nomi.BetAccept[i].destroy(); nomi.BetRefuse[i].destroy() }
                nomi = this.stampaBetSent(this, container, index, background)
                this.betSwitch = false

            } else {
                text.text = "Scommesse ricevute:"
                for (let i = 0; i < nomi.p.length; i++) { nomi.p[i].destroy(); nomi.id[i] = undefined }
                for (let i = 0; i < nomi.BetAccept.length; i++) { nomi.BetAccept[i].destroy(); nomi.BetRefuse[i].destroy() }
                nomi = this.stampaBet(this, container, index, background)
                this.betSwitch = true;

            }
        })

        exit.x = -game.config.width * .33
        exit.y = -game.config.height * .285

        switchButton.x = game.config.width * .33
        switchButton.y = -game.config.height * .285

        switchButtonRed.x = game.config.width * .33
        switchButtonRed.y = -game.config.height * .212

        for (let i = 0; i < background.length; i++) {// TOGLIE INTERAZIONE ALLO SFONDO
            background[i].disableInteractive()
        }

    }

    stampa(scene, background, container, x) {
        let p = [], n = [-200, 0, 200, 400], i = 0 // ARRAY AUSILIARE E COORDINATE
        for (let i = 0; i < 4; i++) {// VISUALIZZAZIONE NOMI | i va da 0 a 4, gli indici del vettore p, la x si somma quando si deve riferire il vettore globale

            p[i] = scene.add.bitmapText(0, 0, 'alagardx2', NAMES[i + x], 64).setOrigin(.5).setInteractive()

            p[i].once('pointerdown', () => {// SELEZIONE GIOCATORI
                this.showBetUI2(background, container, p[i].text)
                container.setVisible(false)
            })

            container.add(p[i]);

        }

        for (let g in p) { if (p[g]) p[g].y = n[g] }

        return p;
    }

    stampaBet(scene, container, x, background) {
        let p = [], id = [], n = [-225, 0, 225, 450], i = 0, BetAccept = [], BetRefuse = [], emp // ARRAY AUSILIARE E COORDINATE

        if (PENDINGBETS.length >= 4) {
            for (let i = 0; i < 4; i++) {// VISUALIZZAZIONE NOMI | i va da 0 a 4, gli indici del vettore p, la x si somma quando si deve riferire il vettore globale
                let t = i

                if (PENDINGBETS[i + x].Accettata == 0) {
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', PENDINGBETS[i + x].Mittente + "\n" + PENDINGBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(PENDINGBETS[i + x].Destinatario.length, -1, true, 0xf8c53a)
                } else if (PENDINGBETS[i + x].Accettata == 1) {
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', PENDINGBETS[i + x].Mittente + "\n" + PENDINGBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(PENDINGBETS[i + x].Destinatario.length, -1, true, 0xf8c53a).setCharacterTint(0, SENTBETS[i + x].Destinatario.length, true, 0x008000)
                }

                id[i] = PENDINGBETS[i + x].ID
                container.add(p[i]);

                BetAccept[i] = new Button({ scene: this, key: "BetAccept" }, "button").setScale(.5).setX(-360).setY(n[i]).setOrigin(.5)
                BetRefuse[i] = new Button({ scene: this, key: "BetRefuse" }, "button").setScale(.5).setX(-252).setY(n[i]).setOrigin(.5)

                container.add(BetAccept[i]);
                container.add(BetRefuse[i]);

                BetAccept[i].on('pointerdown', () => {
                    if (PENDINGBETS[t].Accettata == 0) {
                        p[t].setCharacterTint(0, PENDINGBETS[t].Mittente.length, true, 0x008000)
                        PENDINGBETS[t].Conferma_Destinatario == 1
                        socket.emit('betAccept', USER, PENDINGBETS[t].Mittente, PENDINGBETS[t].ID)
                    }
                    else if (PENDINGBETS[t].Accettata == 1) { // SE HA ACCETTATO
                        socket.emit('betResolution', PENDINGBETS[t + x].ID, bet.Vincita_Destinatario)
                        for (let i = 0; i < background.length; i++) {
                            background[i].setInteractive()
                        }
                        socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                        socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                        container.destroy()
                    }
                })

                BetRefuse[i].on('pointerdown', () => {
                    if (PENDINGBETS[t].Accettata == 0) {
                        socket.emit("betRefused", USER, PENDINGBETS[t + x].Mittente, PENDINGBETS[t + x].ID, PENDINGBETS[t + x].Quota)
                    } else if (PENDINGBETS[t].Accettata == 1) {
                        socket.emit('betResolution', PENDINGBETS[t + x].ID, bet.Perdita_Destinatario)
                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                p[i].once('pointerdown', () => {// SELEZIONE GIOCATORI

                })

            }
        } else if (PENDINGBETS.length > 0 && PENDINGBETS.length < 4) {
            while (i < PENDINGBETS.length) {
                let t = i;

                if (PENDINGBETS[i + x].Accettata == 0)
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', PENDINGBETS[i + x].Mittente + "\n" + PENDINGBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(PENDINGBETS[i + x].Mittente.length, -1, true, 0xf8c53a)
                else if (PENDINGBETS[i + x].Accettata == 1)
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', PENDINGBETS[i + x].Mittente + "\n" + PENDINGBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(PENDINGBETS[i + x].Mittente.length, -1, true, 0xf8c53a).setCharacterTint(0, PENDINGBETS[i + x].Mittente.length, true, 0x008000)


                container.add(p[i]);
                id[i] = PENDINGBETS[i + x].ID

                BetAccept[i] = new Button({ scene: this, key: "BetAccept" }, "button").setScale(.5).setX(-360).setY(n[i]).setOrigin(.5)
                BetRefuse[i] = new Button({ scene: this, key: "BetRefuse" }, "button").setScale(.5).setX(-252).setY(n[i]).setOrigin(.5)

                container.add(BetAccept[i]);
                container.add(BetRefuse[i]);


                BetAccept[i].on('pointerdown', () => {
                    if (PENDINGBETS[t].Accettata == 0) {
                        p[t].setCharacterTint(0, PENDINGBETS[t].Mittente.length, true, 0x008000)
                        PENDINGBETS[t].Accettata = 1
                        socket.emit('betAccepted', USER, PENDINGBETS[t].Mittente, PENDINGBETS[t].ID, PENDINGBETS[t].Quota)
                    }
                    else if (PENDINGBETS[t].Accettata == 1) { // SE HA ACCETTATO
                        socket.emit('betResolution', PENDINGBETS[t].ID, bet.Vincita_Destinatario)
                        PENDINGBETS[t].Conferma_Destinatario = 1
                        for (let i = 0; i < background.length; i++) {
                            background[i].setInteractive()
                        }
                        socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                        socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                        container.destroy()
                    }
                })

                BetRefuse[i].on('pointerdown', () => {
                    if (PENDINGBETS[t].Accettata == 0) {
                        socket.emit("betRefused", USER, PENDINGBETS[t].Mittente, PENDINGBETS[t].ID, PENDINGBETS[t].Quota)
                    } else if (PENDINGBETS[t].Accettata == 1) {
                        socket.emit('betResolution', PENDINGBETS[t].ID, bet.Perdita_Destinatario)
                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                p[i].once('pointerdown', () => {// SELEZIONE GIOCATORI

                })

                i++
            }
        } else if (PENDINGBETS.length == 0) {
            emp = scene.add.bitmapText(0, 0, 'alagard', "*Rumore di grilli*", 30).setOrigin(.5).setY(n[1])
            container.add(emp)
        }
        for (let g in p) { if (p[g]) p[g].y = n[g] }

        return { p, id, BetAccept, BetRefuse, emp };
    }

    stampaBetSent(scene, container, x, background) {
        let p = [], id = [], n = [-225, 0, 225, 450], i = 0, BetAccept = [], BetRefuse = [], emp // ARRAY AUSILIARE E COORDINATE

        if (SENTBETS.length >= 4) {
            for (let i = 0; i < 4; i++) {// VISUALIZZAZIONE NOMI | i va da 0 a 4, gli indici del vettore p, la x si somma quando si deve riferire il vettore globale
                let t = i
                if (SENTBETS[i + x].Accettata == 0)
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', SENTBETS[i + x].Destinatario + "\n" + SENTBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(SENTBETS[i + x].Destinatario.length, -1, true, 0xf8c53a)
                else if (SENTBETS[i + x].Accettata == 1)
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', SENTBETS[i + x].Destinatario + "\n" + SENTBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(SENTBETS[i + x].Destinatario.length, -1, true, 0xf8c53a).setCharacterTint(0, SENTBETS[i + x].Destinatario.length, true, 0x008000)

                id[i] = SENTBETS[i + x].ID
                container.add(p[i]);

                BetAccept[i] = new Button({ scene: this, key: "BetAccept" }, "button").setScale(.5).setX(-360).setY(n[i]).setOrigin(.5)
                BetRefuse[i] = new Button({ scene: this, key: "BetRefuse" }, "button").setScale(.5).setX(-252).setY(n[i]).setOrigin(.5)

                container.add(BetAccept[i]);
                container.add(BetRefuse[i]);

                if (SENTBETS[i + x].Accettata == 0) {
                    BetAccept[i].setVisible(false)
                    BetRefuse[i].setVisible(false)
                }

                BetAccept[i].on('pointerdown', () => {
                    p[t + x].setCharacterTint(0, SENTBETS[t + x].Destinatario.length, true, 0x008000)

                    if (SENTBETS[t].Accettata == 0) {
                        socket.emit('betAccepted', USER, SENTBETS[t + x].Destinatario, SENTBETS[t + x].ID, PENDINGBETS[t + x].Quota)
                        SENTBETS[t].Accettata = 1
                    } else if (SENTBETS[t].Accettata == 1) { // SE HA ACCETTATO
                        socket.emit('betResolution', SENTBETS[t + x].ID, bet.Vincita_Mittente)
                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()
                        socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                        socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                        container.destroy()
                    }
                })

                BetRefuse[i].on('pointerdown', () => {
                    if (PENDINGBETS[t].Accettata == 0) {
                        //socket.emit("betRefused", USER, SENTBETS[t + x].Destinatario, SENTBETS[t + x].ID, SENTBETS[t + x].Quota)
                    } else if (PENDINGBETS[t].Accettata == 1) {
                        socket.emit('betResolution', SENTBETS[t + x].ID, bet.Perdita_Mittente)
                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                p[i].once('pointerdown', () => {// SELEZIONE GIOCATORI

                })

            }
        } else if (SENTBETS.length > 0 && SENTBETS.length < 4) {
            while (i < SENTBETS.length) {
                let t = i
                if (SENTBETS[i + x].Accettata == 0)
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', SENTBETS[i + x].Destinatario + "\n" + SENTBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(SENTBETS[i + x].Destinatario.length, -1, true, 0xf8c53a)
                else if (SENTBETS[i + x].Accettata == 1)
                    p[i] = scene.add.bitmapText(0, 0, 'alagardx2', SENTBETS[i + x].Destinatario + "\n" + SENTBETS[i + x].Quota, 64).setOrigin(.5).setInteractive().setCenterAlign().setCharacterTint(SENTBETS[i + x].Destinatario.length, -1, true, 0xf8c53a).setCharacterTint(0, SENTBETS[i + x].Destinatario.length, true, 0x008000)

                container.add(p[i]);
                id[i] = SENTBETS[i + x].ID

                BetAccept[i] = new Button({ scene: this, key: "BetAccept" }, "button").setScale(.5).setX(-360).setY(n[i]).setOrigin(.5)
                BetRefuse[i] = new Button({ scene: this, key: "BetRefuse" }, "button").setScale(.5).setX(-252).setY(n[i]).setOrigin(.5)

                container.add(BetAccept[i]);
                container.add(BetRefuse[i]);

                if (SENTBETS[i + x].Accettata == 0) {
                    BetAccept[i].setVisible(false)
                    BetRefuse[i].setVisible(false)
                }

                BetAccept[i].on('pointerdown', () => {
                    if (SENTBETS[t].Accettata == 0) {
                        p[t].setCharacterTint(0, SENTBETS[t].Destinatario.length, true, 0x008000)
                        socket.emit('betAccepted', USER, SENTBETS[t].Destinatario, SENTBETS[t].ID)
                        SENTBETS[t].Accettata = 1
                    }
                    else if (SENTBETS[t].Accettata == 1) { // SE HA ACCETTATO
                        socket.emit('betResolution', SENTBETS[t].ID, bet.Vincita_Mittente)
                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                BetRefuse[i].on('pointerdown', () => {
                    if (SENTBETS[t].Accettata == 0) {
                        //socket.emit("betRefused", USER, SENTBETS[t].Destinatario, SENTBETS[t].ID, SENTBETS[t].Quota)
                    } else if (SENTBETS[t].Accettata == 1) {
                        socket.emit('betResolution', SENTBETS[t].ID, bet.Perdita_Mittente)
                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                p[i].once('pointerdown', () => {// SELEZIONE GIOCATORI

                })
                i++
            }
        } else if (PENDINGBETS.length == 0) {
            emp = scene.add.bitmapText(0, 0, 'alagard', "*Rumore di grilli*", 30).setOrigin(.5).setY(n[1])
            container.add(emp)
        }

        for (let g in p) { if (p[g]) p[g].y = n[g] }

        return { p, id, BetAccept, BetRefuse, emp };
    }
    //-----------------------------Logica Profilo-------------------------------
    showProfileUI(scene, group) {
        let x = game.config.width / 2
        let y = 520
        let boxes = this.add.group()
        let box, acc, ref, bit, merd;
        group.propertyValueSet('interactive', 0)
        group.propertyValueSet('visible', 0)

        for (let i = 0; i < PENDINGBETS.length; i++) {
            box = this.add.image(x, y + (i * 257), 'profileBetBox').setOrigin(.5)
            boxes.add(box)
            acc = new Button({ scene: this, key: "profileBetAccept" }, "button").setX(game.config.width * .69).setY(y + (i * 257)).setOrigin(.5)
            boxes.add(acc)
            ref = new Button({ scene: this, key: "profileBetRefuse" }, "button").setX(game.config.width * .87).setY(y + (i * 257)).setOrigin(.5)
            boxes.add(ref)
            bit = this.add.bitmapText(x * .43, (y * .925) + (i * 257), 'alagardx2', PENDINGBETS[i].Mittente + "\nscommette:", 64).setOrigin(.5)
            boxes.add(bit)
            merd = this.add.bitmapText(x * .11, (y * 1.05) + (i * 257), 'alagardx2', PENDINGBETS[i].Quota, 64).setTint(0x7fffbf)
            boxes.add(merd)

            acc.on('pointerdown', () => {
                socket.emit("betAccepted", USER, PENDINGBETS[i].Mittente, PENDINGBETS[i].ID)
            })
        }

        let header = this.add.image(game.config.width, 387, 'profileHeader').setOrigin(1)

        let backButton = new Button({ scene: scene, key: "profileBackButton" }, "button").setOrigin(0, 1)
        backButton.y = 387

        backButton.once('pointerdown', () => {
            header.destroy()
            group.propertyValueSet('interactive', 1)
            group.propertyValueSet('visible', 1)
            backButton.destroy()
            boxes.destroy(true)
        })



    }

    loadUnlock(b, loadLock) { // CONTROLLO BOOLEANI SBLOCCO CARICAMENTO DELLA HOME
        switch (b) {
            case "betResponse1":
                PENDINGBETSBOOL = true
                break;

            case "betResponse2":
                SENTBETSBOOL = true
                break;

            case "DEBUG":
                PENDINGBETSBOOL = true
                SENTBETSBOOL = true
                break;

            default: console.log("Err Function: loadUnlock")
                break;
        }

        if (PENDINGBETSBOOL && SENTBETSBOOL) loadLock.destroy()

    }

    showBetLabel(container) {
        let scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 0,
            y: 0,
            width: 300,
            height: 250,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x4e342e),

            panel: {
                child: this.rexUI.add.fixWidthSizer({
                    space: {
                        left: 3,
                        right: 3,
                        top: 3,
                        bottom: 3,
                        item: 8,
                        line: 8,
                    }
                }),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        }).layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        return scrollablePanel;
    }

    updatePanel(panel, content) {
        var sizer = panel.getElement('panel');
        var scene = panel.scene;

        sizer.clear(true);
        var lines = content.split('\n');
        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var words = lines[li].split(' ');
            for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
                sizer.add(
                    scene.add.text(0, 0, words[wi], {
                        fontSize: 18
                    })
                        .setInteractive()
                        .on('pointerdown', function () {
                            this.scene.print.text = this.text;
                            this.setTint(Phaser.Math.Between(0, 0xffffff))
                        })
                );
            }
            if (li < (lcnt - 1)) {
                sizer.addNewLine();
            }
        }


        panel.layout();
        return panel;
    }

    showBetUI(background) {
        let self = this
        let back = this.add.rectangle(0, 0, game.config.width * .7, game.config.height * .7, 0x000000, 1).setOrigin(.5)
            .setInteractive()
        back.alpha = .9;
        this.betSwitch = true
        let zone = this.add.rectangle(0, 100, 450, game.config.height * .48).setOrigin(.5).setInteractive()
        //this.debugIt(zone)
        let maskRect = this.make.graphics().fillRect(0, game.config.height * .315, game.config.width, game.config.height * .47)
        let container = this.add.container(game.config.width / 2, game.config.height / 2)
        let mask = new Phaser.Display.Masks.GeometryMask(this, maskRect)
        let exit = new Button({ scene: this, key: "exitButton" }, "button")

        let switchButton = new Button({ scene: this, key: "betSwitchButton" }, "button")

        let text = this.add.bitmapText(0, -430, 'alagardx2', "Scorri per scegliere con chi scommettere:", 60).setOrigin(.5).setInteractive().setScale(.6)

        container.add(back);
        container.add(switchButton);
        container.add(exit);
        container.add(text);
        container.add(zone);

        let names = this.createNames(background, container)
        names.name.forEach(x => { x.y -= 230 })
        names.auxContainer.setMask(mask)
        self.input.setDraggable([zone])

        let maxUp = (names.name.length - 5) * -(180 + 64) + 64 // Coordinate in base al numero di blocchi + offset container a -60
        let maxDown = - 60
        zone.on('pointermove', function (pointer) {
            if (pointer.isDown) {
                //console.log(names.auxContainer.y)
                if (names.name.length > 5) {
                    names.auxContainer.y += (pointer.velocity.y / 10)
                    names.auxContainer.y = Phaser.Math.Clamp(names.auxContainer.y, maxUp, maxDown)
                }
            }
        })
            .on('dragstart', () => { self.dragNames = false })
            .on("dragend", () => { setTimeout(() => { self.dragNames = true }) }, 100)

        exit.once('pointerdown', () => { // TASTO USCITA
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            container.destroy()
        })

        switchButton.once('pointerdown', () => { // TASTO CAMBIO SCOMMESSA
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            container.destroy()
            this.betGraphic(background)
        })

        exit.x = -game.config.width * .277
        exit.y = -game.config.height * .31

        switchButton.x = game.config.width * .277
        switchButton.y = -game.config.height * .31

        for (let i = 0; i < background.length; i++) {// TOGLIE INTERAZIONE ALLO SFONDO
            background[i].disableInteractive()
        }

    }

    betGraphic(background) {
        setTimeout(() => { background[2].setFrame(0) }, 100)
        let zone = this.add.rectangle(0, 80, 560, game.config.height * .54).setOrigin(.5).setInteractive()
        //this.debugIt(zone)
        let maskRect = this.make.graphics().fillRect(0, game.config.height * .23 + 80, game.config.width, game.config.height * .55)

        let mask = new Phaser.Display.Masks.GeometryMask(this, maskRect);
        //mask.invertAlpha = true
        let container = this.add.container(game.config.width / 2, game.config.height / 2)
        let back = this.add.rectangle(0, 0, game.config.width * .7, game.config.height * .7, 0x000000, 1).setOrigin(.5)
        back.alpha = .9;
        this.betSwitch = true
        let exit = new Button({ scene: this, key: "exitButton" }, "button")
        let goBack = new Button({ scene: this, key: "backButton" }, "button")
        let text = this.add.bitmapText(0, -480, 'alagardx2', "Scommesse ricevute:", 50).setOrigin(.5)

        let switchButton = new Button({ scene: this, key: "betSwitchButton" }, "button")

        container.add(back);
        container.add(switchButton);
        container.add(exit);
        container.add(goBack);
        container.add(text);
        container.add(zone);

        let betsArr = this.createBet(background, container)
        betsArr.auxContainer.setMask(mask)
        let maxUp = (betsArr.betsBack.length - 5) * -210 - 60 // Coordinate in base al numero di blocchi + offset container a -60
        let maxDown = -60
        zone.on('pointermove', function (pointer) {
            if (pointer.isDown) {
                //console.log(betsArr.auxContainer.y)
                if (betsArr.betsBack.length > 5) {
                    betsArr.auxContainer.y += (pointer.velocity.y / 10)
                    betsArr.auxContainer.y = Phaser.Math.Clamp(betsArr.auxContainer.y, maxUp, maxDown)
                }
            }

        })

        exit.once('pointerdown', () => {
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            //oldcontainer.destroy()
            container.destroy()
        })

        goBack.once('pointerdown', () => {
            for (let i = 0; i < background.length; i++) {
                background[i].setInteractive()

            }
            //oldcontainer.destroy()
            this.showBetUI(background)
            container.destroy()
        })

        switchButton.on('pointerdown', () => { // TASTO CAMBIO SCOMMESSA
            betsArr = this.createBet(background, container, betsArr.auxContainer)
            betsArr.auxContainer.setMask(mask)
            if (this.betSwitch) text.text = "Scommesse inviate:"
            else text.text = "Scommesse ricevute:"
        })



        exit.x = -game.config.width * .277
        exit.y = -game.config.height * .31

        goBack.x = -game.config.width * .15
        goBack.y = -game.config.height * .31

        switchButton.x = game.config.width * .277
        switchButton.y = -game.config.height * .31

        for (let i = 0; i < background.length; i++) {// TOGLIE INTERAZIONE ALLO SFONDO
            background[i].disableInteractive()
        }
    }

    createBet(background, container, aux) {
        let betsBack = []
        let name = []
        let bet = []
        let info = []
        let accept = []
        let refuse = []
        let auxContainer = this.add.container(0, -60)
        let accSwitch, refSwitch

        let backk = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000, 0).setOrigin(.5)
        auxContainer.add(backk)
        let textAreaConfig = {
            x: game.config.width * .5,
            y: game.config.height * .5 + 85,
            width: 560,
            height: game.config.height * .56,

            background: this.add.rectangle(0, 0, 300, 300, 0xc7dcd0, 1).setOrigin(.5),

            text: this.add.bitmapText(0, 0, 'alagardx2').setFontSize(60).setTint("black"),

            // textMask: false,

            slider: {
                track: this.add.rectangle(0, 0, 20, 10, 0x9babb2, 1).setOrigin(.5),
                thumb: this.add.image(0, 0, 'thumb').setOrigin(.5),
            },
            // scroller: true,
        }

        let textArea = this.rexUI.add.textArea(textAreaConfig)
            .layout()
            .setInteractive()
            .setVisible(false)
        auxContainer.add(textArea)

        if (aux != undefined) aux.destroy()

        if (this.betSwitch) {
            for (let i in PENDINGBETS) {
                betsBack[i] = this.add.image(0, i * 210 - 270, "betBack").setOrigin(.5)
                name[i] = this.add.bitmapText(-130, (i * 210) - 300, "alagardx2", PENDINGBETS[i].Mittente, 50).setTint(0x000000).setOrigin(.5)
                bet[i] = this.add.bitmapText(-130, (i * 210) - 240, "alagardx2", PENDINGBETS[i].Quota, 50).setTint(0xf79617).setOrigin(.5)
                info[i] = new Button({ scene: this, key: "BetInfo" }, "button").setScale(.4).setX(163).setY(i * 210 - 220).setOrigin(.5)

                if (PENDINGBETS[i].Accettata == 0) { accSwitch = "betAccept"; refSwitch = "betRefuse" }
                else { if (PENDINGBETS[i].Accettata == 1) { accSwitch = "betWin"; refSwitch = "betLose" } }

                accept[i] = new Button({ scene: this, key: accSwitch }, "button").setScale(.5).setX(115).setY(i * 210 - 305).setOrigin(.5)
                refuse[i] = new Button({ scene: this, key: refSwitch }, "button").setScale(.5).setX(115 + 95).setY(i * 210 - 305).setOrigin(.5)

                if (PENDINGBETS[i].Conferma_Destinatario == 0) { betsBack[i].setTint(0xe83b3b); accept[i].setVisible(false).disableInteractive(); refuse[i].setVisible(false).disableInteractive(); info[i].setX(175).setY(i * 210 - 275).setScale(.6) }
                if (PENDINGBETS[i].Conferma_Destinatario == 1) { betsBack[i].setTint(0x1ebc73); accept[i].setVisible(false).disableInteractive(); refuse[i].setVisible(false).disableInteractive(); info[i].setX(175).setY(i * 210 - 275).setScale(.6) }

                auxContainer.add(betsBack[i])
                auxContainer.add(name[i])
                auxContainer.add(bet[i])
                auxContainer.add(accept[i])
                auxContainer.add(refuse[i])
                auxContainer.add(info[i])

                accept[i].on('pointerdown', () => {
                    if (PENDINGBETS[i].Accettata == 0 && COINS >= PENDINGBETS[i].Quota) {
                        PENDINGBETS[i].Conferma_Destinatario == 1
                        socket.emit('betAccepted', USER, PENDINGBETS[i].Mittente, PENDINGBETS[i].ID, PENDINGBETS[i].Quota)
                    }
                    else if (PENDINGBETS[i].Accettata == 1) { // SE HA ACCETTATO
                        socket.emit('betResolution', PENDINGBETS[i].ID, this.bet.Vincita_Destinatario)

                    }
                    if (COINS < PENDINGBETS[i].Quota) {
                        let t
                        auxContainer.add(t = this.add.bitmapText(-90, (i * 210) - 190, 'alagard', "Monete insufficienti!", 32).setTint(0xff0000).setOrigin(.5))
                        setTimeout(() => { t.destroy() }, 800)

                    } else {
                        socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                        socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                        background.forEach(x => x.setInteractive())

                    }
                    for (let i = 0; i < background.length; i++) {
                        background[i].setInteractive()

                    }
                    container.destroy()
                })

                refuse[i].on('pointerdown', () => {
                    if (PENDINGBETS[i].Accettata == 0) {
                        socket.emit("betRefused", PENDINGBETS[i].Mittente, PENDINGBETS[i].ID, PENDINGBETS[i].Quota)
                    } else if (PENDINGBETS[i].Accettata == 1) {
                        socket.emit('betResolution', PENDINGBETS[i].ID, this.bet.Perdita_Destinatario)
                    }
                    for (let j = 0; j < background.length; j++) {
                        background[j].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                info[i].on('pointerup', () => {
                    if (betsBack[i].y + auxContainer.y < 580 && betsBack[i].y + auxContainer.y > -500) {// CONTROLLO ZONA
                        if (this.descSwitch) {
                            if (PENDINGBETS[i].Descrizione == null || PENDINGBETS[i].Descrizione == "") textArea.setText("Nessuna descrizione")
                            else textArea.setText(PENDINGBETS[i].Descrizione)

                            backk.setInteractive()
                            textArea.setVisible(true)
                            this.descSwitch = false
                        }
                    }
                })

            }
            container.add(auxContainer)
            this.betSwitch = false
        } else {
            for (let i in SENTBETS) {
                betsBack[i] = this.add.image(0, i * 210 - 270, "betBack").setOrigin(.5)
                name[i] = this.add.bitmapText(-130, (i * 210) - 300, "alagardx2", SENTBETS[i].Destinatario, 50).setTint(0x000000).setOrigin(.5)
                bet[i] = this.add.bitmapText(-130, (i * 210) - 240, "alagardx2", SENTBETS[i].Quota, 50).setTint(0xf79617).setOrigin(.5)
                info[i] = new Button({ scene: this, key: "BetInfo" }, "button").setScale(.4).setX(163).setY(i * 210 - 220).setOrigin(.5)

                if (SENTBETS[i].Accettata == 0) { accSwitch = "betAccept"; refSwitch = "betRefuse" }
                else { if (SENTBETS[i].Accettata == 1) { accSwitch = "betWin"; refSwitch = "betLose" } }

                accept[i] = new Button({ scene: this, key: accSwitch }, "button").setScale(.5).setX(115).setY(i * 210 - 305).setOrigin(.5).setVisible(false).disableInteractive()
                refuse[i] = new Button({ scene: this, key: refSwitch }, "button").setScale(.5).setX(115 + 95).setY(i * 210 - 305).setOrigin(.5).setVisible(false).disableInteractive()

                if (SENTBETS[i].Accettata == 1) { accept[i].setVisible(true).setInteractive(); refuse[i].setVisible(true).setInteractive(); }
                if (SENTBETS[i].Conferma_Mittente == 0) { betsBack[i].setTint(0xe83b3b); accept[i].setVisible(false).disableInteractive(); refuse[i].setVisible(false).disableInteractive(); info[i].setX(175).setY(i * 210 - 275).setScale(.6) }
                if (SENTBETS[i].Conferma_Mittente == 1) { betsBack[i].setTint(0x1ebc73); accept[i].setVisible(false).disableInteractive(); refuse[i].setVisible(false).disableInteractive(); info[i].setX(175).setY(i * 210 - 275).setScale(.6) }

                auxContainer.add(betsBack[i])
                auxContainer.add(name[i])
                auxContainer.add(bet[i])
                auxContainer.add(accept[i])
                auxContainer.add(refuse[i])
                auxContainer.add(info[i])

                accept[i].on('pointerdown', () => {
                    if (SENTBETS[i].Accettata == 1) { // SE HA ACCETTATO
                        socket.emit('betResolution', SENTBETS[i].ID, this.bet.Vincita_Mittente)
                    }
                    for (let j = 0; j < background.length; j++) {
                        background[j].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                refuse[i].on('pointerdown', () => {
                    if (SENTBETS[i].Accettata == 1) {
                        socket.emit('betResolution', SENTBETS[i].ID, this.bet.Perdita_Mittente)
                    }
                    for (let j = 0; j < background.length; j++) {
                        background[j].setInteractive()
                    }
                    socket.emit("pendingBetsRequest", USER) // RICHIESTA SCOMMESSE RICEVUTE
                    socket.emit("sentBetsRequest", USER) // RICHIESTA SCOMMESSE INVIATE
                    container.destroy()
                })

                info[i].on('pointerup', () => {
                    if (betsBack[i].y + auxContainer.y < 580 && betsBack[i].y + auxContainer.y > -500) {// CONTROLLO ZONA
                        if (this.descSwitch) {
                            if (SENTBETS[i].Descrizione == null || SENTBETS[i].Descrizione == "") textArea.setText("Nessuna descrizione")
                            else textArea.setText(SENTBETS[i].Descrizione)

                            backk.setInteractive()
                            textArea.setVisible(true)
                            this.descSwitch = false
                        }
                    }
                })

            }
            container.add(auxContainer)
            this.betSwitch = true
        }

        this.self.input.on('pointerup', () => {
            info.forEach(x => x.setFrame(0))
            accept.forEach(x => x.setFrame(0))
            refuse.forEach(x => x.setFrame(0))
        })

        backk.on('pointerdown', () => {
            if (!this.descSwitch) {
                textArea.setVisible(false);
                this.descSwitch = true
                backk.disableInteractive()
            }
        })

        return { betsBack, auxContainer, name, bet, accept, refuse, info }
    }

    createNames(background, container) {
        let name = []
        let auxContainer = this.add.container(0, -60)

        for (let i in NAMES) {
            name[i] = this.add.bitmapText(0, i * 180, "alagardx2", NAMES[i], 64).setTint(0xffffff).setOrigin(.5).setInteractive()
                .once('pointerup', () => {
                    if (this.dragNames) {
                        this.sound.play("button")
                        this.showBetUI2(background, container, name[i].text)
                        container.setVisible(false)
                    }
                })

            auxContainer.add(name[i])
        }
        container.add(auxContainer)

        return { auxContainer, name }
    }

    debugIt(obj, color = 0x00ff00) {
        try {
            obj.setStrokeStyle(2)
            obj.strokeAlpha = 1
            obj.strokeColor = color
        } catch (e) {
            console.error(e)
        }
    }
}

