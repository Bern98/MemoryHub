class Button extends Phaser.GameObjects.Sprite {
    constructor(scope, sfx) {
         super(scope.scene, 0, 0, scope.key);

        if (!scope.scene) {
            console.log('missing scene');
            return;
        }

        if (!scope.key) {
            console.log("missing key!");
            return;
        }
        
        scope.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', function() {
            this.setFrame(1); 
            if (sfx != undefined) scope.scene.sound.play(sfx);
        }, this);
        this.on('pointerup', function() {this.setFrame(0);}, this);
     }


  }