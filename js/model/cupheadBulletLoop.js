import { BulletSprite } from "../design-pattern/singleton/bulletSprite.js"
import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { GameObject } from "../parent/gameObject.js"
import { GameSetting } from "../settings/gameSettings.js";

export class CupheadBulletLoop extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF,orientationX,orientationY){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BulletSprite.getInstance().cupheadBulletLoop
        this.CURR_CHAR_CONF = CHAR_CONF.cupheadLoop
        this.orientationX = orientationX
        this.orientationY = orientationY
    }

    backRender(currentSprite){
        this.GAME.ctx.save()
        this.GAME.ctx.translate(this.transform.position.x,this.transform.position.y)
        this.GAME.ctx.scale(-1,1) 
        this.GAME.ctx.drawImage(
            currentSprite,
            this.orientationX - currentSprite.width + this.sprite[0].width,
            this.orientationY,
            currentSprite.width * this.transform.scale,
            currentSprite.height * this.transform.scale)
        this.GAME.ctx.restore()
    }

    frontRender(currentSprite){
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x - currentSprite.width + this.sprite[0].width
            ,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        if(this.orientationX == 0) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
    }

    transformBullet(){
        if(this.orientationX == 0) this.transform.position.x += GameSetting.CUPHEADBULLETSPEED * this.GAME.delta
        else this.transform.position.x -= GameSetting.CUPHEADBULLETSPEED * this.GAME.delta
        
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