class Merdle extends Phaser.Scene {
    constructor() {
        super('merdle')

        this.counter = 0
        this.multiplier = 1
        this.score = 0
        this.txt
        this.scoreBalls = []
        this.scoreBallsNumber = 70
        this.ballsHit = []
        this.orange = this.scoreBallsNumber - 2
        this.green = 1
        this.purple = 1
        this.coordinates = [
            {
                "x": 473.94957983193274,
                "y": 425.5462184873949
            },
            {
                "x": 542.5210084033613,
                "y": 502.1848739495798
            },
            {
                "x": 586.890756302521,
                "y": 566.7226890756302
            },
            {
                "x": 643.3613445378151,
                "y": 641.344537815126
            },
            {
                "x": 713.9495798319327,
                "y": 689.7478991596638
            },
            {
                "x": 778.4873949579832,
                "y": 724.0336134453781
            },
            {
                "x": 855.126050420168,
                "y": 766.3865546218487
            },
            {
                "x": 935.7983193277311,
                "y": 786.5546218487394
            },
            {
                "x": 393.2773109243697,
                "y": 455.79831932773106
            },
            {
                "x": 310.5882352941176,
                "y": 435.6302521008403
            },
            {
                "x": 250.08403361344537,
                "y": 375.12605042016804
            },
            {
                "x": 167.39495798319328,
                "y": 306.5546218487395
            },
            {
                "x": 229.9159663865546,
                "y": 871.2605042016806
            },
            {
                "x": 302.52100840336135,
                "y": 905.546218487395
            },
            {
                "x": 363.0252100840336,
                "y": 939.8319327731092
            },
            {
                "x": 425.5462184873949,
                "y": 998.3193277310924
            },
            {
                "x": 324.70588235294116,
                "y": 1030.5882352941176
            },
            {
                "x": 391.26050420168065,
                "y": 1066.890756302521
            },
            {
                "x": 447.7310924369748,
                "y": 1068.90756302521
            },
            {
                "x": 508.2352941176471,
                "y": 1052.7731092436975
            },
            {
                "x": 544.5378151260504,
                "y": 1115.2941176470588
            },
            {
                "x": 592.9411764705882,
                "y": 1177.81512605042
            },
            {
                "x": 647.3949579831933,
                "y": 1246.3865546218487
            },
            {
                "x": 709.9159663865546,
                "y": 1290.7563025210084
            },
            {
                "x": 784.5378151260504,
                "y": 1323.0252100840335
            },
            {
                "x": 857.1428571428571,
                "y": 1321.0084033613446
            },
            {
                "x": 937.8151260504202,
                "y": 1347.2268907563025
            },
            {
                "x": 480,
                "y": 736.1344537815125
            },
            {
                "x": 536.4705882352941,
                "y": 728.0672268907563
            },
            {
                "x": 512.2689075630252,
                "y": 758.3193277310925
            },
            {
                "x": 181.5126050420168,
                "y": 770.4201680672269
            },
            {
                "x": 262.1848739495798,
                "y": 794.6218487394958
            },
            {
                "x": 356.97478991596637,
                "y": 806.7226890756302
            },
            {
                "x": 443.69747899159665,
                "y": 832.9411764705882
            },
            {
                "x": 534.453781512605,
                "y": 887.3949579831933
            },
            {
                "x": 588.90756302521,
                "y": 943.8655462184873
            },
            {
                "x": 552.6050420168067,
                "y": 1778.8235294117646
            },
            {
                "x": 558.655462184874,
                "y": 1730.4201680672268
            },
            {
                "x": 534.453781512605,
                "y": 1663.8655462184875
            },
            {
                "x": 520.3361344537815,
                "y": 1599.327731092437
            },
            {
                "x": 498.1512605042017,
                "y": 1522.689075630252
            },
            {
                "x": 488.0672268907563,
                "y": 1456.1344537815125
            },
            {
                "x": 467.89915966386553,
                "y": 1381.5126050420167
            },
            {
                "x": 475.96638655462186,
                "y": 1308.90756302521
            },
            {
                "x": 471.93277310924367,
                "y": 1240.3361344537814
            },
            {
                "x": 486.0504201680672,
                "y": 1147.563025210084
            },
            {
                "x": 728.0672268907563,
                "y": 1792.9411764705883
            },
            {
                "x": 726.0504201680671,
                "y": 1700.1680672268908
            },
            {
                "x": 707.8991596638655,
                "y": 1623.5294117647059
            },
            {
                "x": 695.7983193277311,
                "y": 1548.90756302521
            },
            {
                "x": 677.6470588235294,
                "y": 1466.218487394958
            },
            {
                "x": 661.5126050420167,
                "y": 1335.126050420168
            },
            {
                "x": 923.6974789915967,
                "y": 1790.9243697478992
            },
            {
                "x": 893.4453781512605,
                "y": 1724.3697478991596
            },
            {
                "x": 875.2941176470588,
                "y": 1621.5126050420167
            },
            {
                "x": 855.126050420168,
                "y": 1530.7563025210084
            },
            {
                "x": 877.3109243697479,
                "y": 1470.2521008403362
            },
            {
                "x": 881.344537815126,
                "y": 1401.6806722689075
            },
            {
                "x": 209.74789915966386,
                "y": 663.5294117647059
            },
            {
                "x": 256.1344537815126,
                "y": 629.2436974789916
            },
            {
                "x": 334.78991596638656,
                "y": 621.1764705882352
            },
            {
                "x": 399.327731092437,
                "y": 631.2605042016806
            },
            {
                "x": 663.5294117647059,
                "y": 857.1428571428571
            },
            {
                "x": 715.9663865546219,
                "y": 907.563025210084
            },
            {
                "x": 768.4033613445378,
                "y": 964.0336134453781
            },
            {
                "x": 838.9915966386554,
                "y": 1028.5714285714284
            },
            {
                "x": 909.5798319327731,
                "y": 1064.8739495798318
            },
            {
                "x": 643.3613445378151,
                "y": 1032.6050420168067
            },
            {
                "x": 709.9159663865546,
                "y": 1105.2100840336134
            },
            {
                "x": 770.4201680672269,
                "y": 1135.4621848739496
            },
            {
                "x": 865.2100840336134,
                "y": 1200
            }
        ]
        this.myTurn = true
    }

    preload() {
        this.load.plugin('rexraycasterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexraycasterplugin.min.js', true);
    }

    create() {
        let self = this
        this.matter.set60Hz()
        this.add.image(-250, -150, "merdleBack").setOrigin(0).setScale(.53)
        let graphics = this.add.graphics()

        this.input.on('pointerdown', (pointer) => {
            console.log("x:" + pointer.x.toFixed(0), "y:" + pointer.y.toFixed(0), (pointer.x / 1080).toFixed(2), (pointer.y / 1920).toFixed(2))
            this.mainBall.setStatic(false)
            //this.mainBall.setX(540).setY(150)
            //this.mainBall.velocity = 0
            let angle = Phaser.Math.Angle.Between(this.mainBall.x, this.mainBall.y, pointer.x, pointer.y + 20)
            this.mainBall.setRotation(angle)
            this.mainBall.thrust(0.0135)
            //this.mainBall.applyForce(new Phaser.Math.Vector2(0.001, 0.001))
            //this.matter.add.image(pointer.x, pointer.y, 'ballx2').setCircle().setStatic(true)
            //this.coordinates.push({ x: pointer.x, y: pointer.y })
        })

        this.add.image(0, 0, 'merdleBorder').setOrigin(0).setDepth(2)

        /*this.ball = this.physics.add.image(game.config.width / 2, 100, "ball").setOrigin(.5)
        //this.test = this.add.rectangle(500, 800, 200, 260, 0x00ff00)
        //this.physics.add.existing(this.test);
        //this.test.setImmovable(true)
        this.ball.setCircle(8);

        this.ball.setCollideWorldBounds(true);

        this.ball.setBounce(.4);

        //this.ball.setMaxVelocity(1000)

        this.ball.body.gravity.y = 1000;

        for (let i = 0; i < 100; i++) {
            this.test = this.physics.add.staticImage(Phaser.Math.Between(50,1030), Phaser.Math.Between(300, 1800), "ball").setCircle(8).setOrigin(.5).setTint(0xff8e00)
            this.physics.add.collider(this.test, this.ball)
        }

        
        //this.ball.setVelocity(150);

        //this.physics.add.collider(this.ball, this.ball2);*/
        this.txt = this.add.text(20, 20, 'Punteggio: ' + this.score).setScale(3).setDepth(2)

        this.matter.world.setBounds(96, 130, game.config.width - 189, game.config.height, 32, true, true, true, false);

        let ball = this.matter.world.nextCategory();
        let balls = this.matter.world.nextCategory();

        this.mainBall = this.matter.add.image(540, 150, 'ball').setCircle().setFriction(0).setBounce(1).setStatic(true)
        this.mainBall.setCollisionCategory(ball);
        this.mainBall.name = 'main'
        this.mainBall.frictionAir = 0

        

        //this.raycaster = this.plugins.get('rexraycasterplugin').add()
        Phaser.Math.RND.shuffle(this.coordinates)
        for (let index = 0; index < this.scoreBallsNumber; index++) {

            this.scoreBalls[index] = this.matter.add.image(this.coordinates[index].x, this.coordinates[index].y, 'ballx2').setCircle().setStatic(true)
            this.scoreBalls[index].setCollisionCategory(balls);
            this.scoreBalls[index].name = index
            if (this.orange > 0) {
                this.scoreBalls[index].setTint(0xff8e00)
                this.orange--
            } else {
                if (this.purple > 0) {
                    this.scoreBalls[index].setTint(0x800080)
                    this.purple--
                } else {
                    if (this.green > 0) {
                        this.scoreBalls[index].setTint(0x00ff00)
                        this.green--
                    }
                }
            }

            //this.raycaster.addObstacle(this.scoreBalls[index])

        }





        // this.debugGraphics = this.add.graphics();
        // this.data
        //     .set('startX', 500)
        //     .set('startY', 150)
        //
        //this.ball.setCollidesWith([ball, balls])

        this.matter.world.on('collisionstart', function (event) {

            //if (event.pairs[0].bodyB.gameObject.setTint(0xff0000))
            //    self.increase()                                                                   //Bottomleft perche non trovo l'attributo "Tint"
            if (event.pairs[0].bodyB.gameObject.name != 'main' && event.pairs[0].bodyB.gameObject.tintBottomLeft != 0xff0000) { // Rilevo nell'event il nome di mainBall
                event.pairs[0].bodyB.gameObject.setTint(0xff0000)
                self.ballHit(event.pairs[0].bodyB.gameObject)
                self.sound.play("ballHit")
            }

            //console.log(event.pairs[0])

        })


    }

    update() {
        //console.log(this.ball.body.speed.toFixed(0) / 900)
        if (this.mainBall.y > 1920){
            this.mainBall.x = 500
            this.mainBall.y = 140
            this.mainBall.setStatic(true)
        }
            

        //this.raycaster.updateObstacle(this.dynamicObstacles);
        //
        //var pointer = this.input.activePointer;
        //var x = this.data.get('startX'),
        //    y = this.data.get('startY'),
        //    angle = Phaser.Math.Angle.Between(x, y, pointer.worldX, pointer.worldY);
        //this.RunRaycaster(this.raycaster,
        //    x, y, angle,
        //    this.debugGraphics
        //);

    }

    //------------------------------------------------------ 

    ballHit(ball) {
        this.counter++
        if (this.counter > 9) this.multiplier = 2
        this.score += this.multiplier * 10
        this.txt.text = "Punteggio: " + this.score
        this.ballsHit.push(ball)
    }

    RunRaycaster(raycaster, x, y, angle, debugGraphics) {
        debugGraphics
            .clear()
            .fillStyle(0xC4C400)
            .fillCircle(x, y, 10);

        const MaxReflectionCount = 1000;
        for (var i = 0; i < MaxReflectionCount; i++) {
            var result = raycaster.rayToward(x, y, angle);
            debugGraphics
                .lineStyle(2, 0x840000)
                .strokeLineShape(raycaster.ray);

            if (result) {
                debugGraphics
                    .fillStyle(0xff0000)
                    .fillPoint(result.x, result.y, 4)

                x = result.x;
                y = result.y;
                angle = result.reflectAngle;
            } else {
                break;
            }
        }
    }

}