var gameHeight = 1920, gameWidth = 1080;
var USER = "empty";
var COINS = NaN;
var game;
const BUILD = "1.1 Beta";
const DEBUG = true
const DEBUGSCENE = "home"
var id = "empty";
var NAMES = []
var PENDINGBETS = []
var SENTBETS = []
var PROFILEBLOCKS = [{"name":"Name","x":0,"y":0},{"name":"Coins","x":216,"y":0}]

var PENDINGBETSBOOL = false
var SENTBETSBOOL = false

const colors = Object.freeze({ //ENUM
    0: "0xffbece",
    1: "0x9aeafc",
    2: "0xc4ffe9",
    3: "0xdbb3ff",
    4: "0xfffcbd",
    5: undefined,
})

var config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    parent: 'phaser-game',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'matter',
        gravity: true,
        velocityIterations: 8,
        matter: { debug: false }
    },
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [Boot, Login, Home, Test, Merdle],
    version: "1.0"
};

game = new Phaser.Game(config);
const socket = io.connect("192.168.1.129:3000")
//const socket = io.connect("http://merdhub.ddns2.net:42069")


let data = {
    comune: 64,
    rara: 20,
    epica: 15,
    leggendaria: 1
}

let sbusta = function (data, n) {
    let cards = {comune: 0, rara:0, epica:0, leggendaria:0}
    for (j = 0; j < n * 5; j++) {
        let culo = (Math.random() * 100).toFixed(0)
        let percentuale = {}
        let keys = Object.keys(data)
        for (x of keys) percentuale[x] = data[x]
        for (let i = 1; i < keys.length; i++) percentuale[keys[i]] += percentuale[keys[i - 1]]

        if (culo > 0 && culo <= percentuale.comune) cards.comune++
        for (let i = 1; i < Object.entries(percentuale).length; i++) {
            if (culo > percentuale[keys[i - 1]] && culo <= percentuale[keys[i]]) cards[keys[i]]++
        }
    }
    return cards
}

