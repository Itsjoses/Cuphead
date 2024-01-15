import { BulletSprite } from "../design-pattern/singleton/bulletSprite.js"
import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { GameObject } from "../parent/gameObject.js"
import { GameSetting } from "../settings/gameSettings.js";

export class ShipBulletSpawn extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BulletSprite.getInstance().shipBulletSpawn
        this.CURR_CHAR_CONF = CHAR_CONF.captainSpawn
        this.tick = 0
        this.spriteInterval = 0
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick];

        // Save the current state of the canvas
        this.GAME.ctx.save();
    
        // Translate to the center of the image
        this.GAME.ctx.translate(
            this.transform.position.x ,
            this.transform.position.y
        );
    
    
        // Draw the rotated image
        this.GAME.ctx.drawImage(
            currentSprite,
            -currentSprite.width/2 ,
            -currentSprite.height/2,
            currentSprite.width,
            currentSprite.height
        );
        // Restore the canvas state to prevent affecting subsequent drawings
        this.GAME.ctx.restore();

    }

    update(){
        this.updateFrame()
        this.changeSprite()
    }
}