class Login extends Phaser.Scene {
    constructor() {
        super('login')
    }

    preload() {;}

    create() {
        let self = this;

        function callbackClosure(callback) {
            return function() {
              return callback();
            }
          }

          if (window.localStorage.user != undefined && window.localStorage.pass != undefined) { // SE HA GIA ESEGUITO IL LOGIN
            socket.emit("loginSend", window.localStorage.user, window.localStorage.pass, BUILD);
        }
        
        //-----------------------Sfondo e Griglia-------------------------
        back = this.add.tileSprite(0, 0, 4000, 4000, "back")
        this.alignGrid = new AlignGrid({ scene: this, rows: 12, cols: 3 })
        //this.alignGrid.showNumbers()
        //--------------------Grafica------------------------------------------
        var rect = this.add.rectangle(0, 0, 200, 200, 0xd7b31d, 1)
        var rect2 = this.add.rectangle(0, 0, 100, 100, 0xfdde5e, 1)
        let text = this.add.bitmapText(0, 0, 'alagard', "Disconnesso", 16).setOrigin(.5).setTint(0xcab14b).setScale(2.1)
        this.alignGrid.placeAtIndex(25, text)
        this.alignGrid.placeAtIndex(19, rect)
        this.alignGrid.placeAtIndex(19, rect2)
        let title = this.add.image(0, 0, "loginTitle")
        this.alignGrid.placeAtIndex(13, title)
        Align.scaleToGameW(rect, .52)
        Align.scaleToGameW(rect2, .5)
        let errorText = this.add.bitmapText(0, 0, 'alagardx2', "", 32).setTint(0xff0000).setOrigin(.5).setVisible(false)
        this.alignGrid.placeAtIndex(28, errorText)
        let buildText = this.add.bitmapText(0, game.config.height, 'alagardx2', "Build: " + BUILD, 32).setOrigin(0, 1)
        this.sound.play("ta-dah")
        //---------------------Form-------------------------------------------
        var form = this.add.dom().createFromCache('form').setOrigin(.5, .1).setScale(2).setInteractive();
        this.alignGrid.placeAtIndex(16, form)
        //---------------------Socket------------------------------------------- 
        socket.on("connect", () => { //LISTENER DELLA CONNESSIONE ESEGUITA AMMODO
            console.log("Connesso con id: " + socket.id);
            text.setText("Id: " + socket.id)
        });

        if (socket.id != "" && socket.id != undefined) text.setText("Id: " + socket.id)

        socket.on("loginConfirmed", (Sid, u, coins, p) => { //RICEVUTA LA CONFERMA LOGIN, METTO IN ID SOCKET.ID 
            id = Sid
            USER = u
            COINS = coins;
            let y = u // SE NON FACCIO COSI SI SCAZZA TUTTO PER VIA DELLE FUNZIONI ASINCRONE E GLI SCOPE MERDOSI DI JS MADONNACCIA PUTTANA
            window.localStorage.setItem('user', y)
            y = p
            window.localStorage.setItem('pass', y)
             
            socket.emit('playerNames')
            socket.on('playerNamesSend', (res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].Username != USER) NAMES.push(res[i].Username)
                }
            })

            this.scene.start("home")
        })

        socket.on("loginQueryError", (code) => {
            console.error("Errore query login lato server")
            errorText.setText("Errore: " + code).setVisible(true)
        })

        socket.on("loginRefused", () => {
            console.log("Login rifiutato")
            errorText.setText("Login errato").setVisible(true)
        })
        //----------------------Controlli Form-----------------------------------
        form.addListener('click')

        form.on('click', function (event) {// CONTROLLO CLICK

            if (event.target.name === 'submit') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                if (socket.connected) {
                    socket.emit("loginSend", inputUsername.value, inputPassword.value, BUILD); //EMISSIONE LOGIN  
                } else {
                    console.log("NOK")
                }

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    //  Turn off the click events
                    //this.removeListener('click');

                }
                else {
                    //  Flash the prompt
                    self.tweenBar(form)
                    self.tweenBar(rect)
                    self.tweenBar(rect2)
                    self.tweenBar(title)
                    self.sound.play("loginErr", { volume: 7 })
                    form.removeListener('click')
                    setTimeout(() => {form.addListener('click')}, 2000)
                }
            }

        });

    }

    update() {
        back.tilePositionX -= 0.55
        back.tilePositionY -= 0.55
    }

    tweenBar(obj) {
        this.tweens.add({
            targets: obj,
            y: '-=16',
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 5,
            duration: 100,
        });
        
    }
}