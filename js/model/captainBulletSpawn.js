import { BulletSprite } from "../design-pattern/singleton/bulletSprite.js"
import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { GameObject } from "../parent/gameObject.js"
import { GameSetting } from "../settings/gameSettings.js";

export class CaptainBulletSpawn extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BulletSprite.getInstance().captainBulletSpawn
        this.CURR_CHAR_CONF = CHAR_CONF.captainSpawn
        this.tick = 0
        this.spriteInterval = 0
        this.angle = 0
        this.getAngle()
    }

    getAngle(){
        const target={
            x: this.GAME.cuphead.transform.realPosition.x ,
            y: this.GAME.cuphead.transform.realPosition.y ,
            w: this.GAME.cuphead.transform.size.sizeW,
            h: this.GAME.cuphead.transform.size.sizeH
        }
        const deltaX = (this.transform.position.x + this.sprite[0].width /2) - (target.x + target.w/2);
        const deltaY = (this.transform.position.y + this.sprite[0].height /2) - (target.y + target.h/2);
    
        // Menggunakan atan2 untuk menghitung sudut rotasi
        this.angle = Math.atan2(deltaY, deltaX);
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick];

        // Save the current state of the canvas
        this.GAME.ctx.save();
    
        // Translate to the center of the image
        this.GAME.ctx.translate(
            this.transform.position.x +  currentSprite.width / 2,
            this.transform.position.y + currentSprite.height/ 2
        );
    
        // Rotate only the sprite
        this.GAME.ctx.rotate(this.angle);
    
        // Draw the rotated image
        this.GAME.ctx.drawImage(
            currentSprite,
            -currentSprite.width ,
            -currentSprite.height,
            currentSprite.width,
            currentSprite.height
        );
        // Restore the canvas state to prevent affecting subsequent drawings
        this.GAME.ctx.restore();

    }

    
    changeSprite(){
        if(this.GAME.stop == true) return;
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick += 1;
            this.spriteInterval = 0;
          }
    }

    update(){
        this.updateFrame()
        this.changeSprite()
    }
}