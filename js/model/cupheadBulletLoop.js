import { BulletSprite } from "../design-pattern/singleton/bulletSprite.js"
import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { GameObject } from "../parent/gameObject.js"

export class CupheadBulletLoop extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BulletSprite.getInstance().cupheadBulletLoop
        this.CURR_CHAR_CONF = CHAR_CONF.cupheadLoop
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        const currentStaticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width/2
            ,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
    }

    transformBullet(){
        this.transform.position.x += 1000 * this.GAME.delta
    }

    changeSprite(){
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick += 1;
            this.spriteInterval = 0;
          }
        if (this.tick >= this.sprite.length) this.tick = this.sprite.length - 1;
    }


    update(){
        this.updateFrame()
        this.transformBullet()
        this.changeSprite()
    }
}