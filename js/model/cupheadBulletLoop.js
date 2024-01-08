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
        this.tick = 0
        this.spriteInterval = 0
        this.speed = GameSetting.CUPHEADBULLETSPEED * this.GAME.delta
    }

    backRender(currentSprite){
        this.GAME.ctx.save()
        this.GAME.ctx.translate(this.transform.position.x,this.transform.position.y)
        this.GAME.ctx.scale(-1,1) 
        this.transform.realPosition.x = this.transform.position.x + this.orientationX - currentSprite.width + this.sprite[0].width
        this.transform.realPosition.y = this.transform.position.y + this.orientationY
        this.transform.size.sizeW = currentSprite.width * this.transform.scale
        this.transform.size.sizeH = currentSprite.height * this.transform.scale
        if(this.sprite != BulletSprite.getInstance().cupheadBulletDie){

            this.GAME.ctx.drawImage(
                currentSprite,
                this.orientationX - currentSprite.width + this.sprite[0].width,
                this.orientationY,
                this.transform.size.sizeW,
                this.transform.size.sizeH)
            }
            else{
                this.GAME.ctx.drawImage(
                    currentSprite,
                    this.orientationX ,
                    this.orientationY,
                    this.transform.size.sizeW,
                    this.transform.size.sizeH)
            }
        this.GAME.ctx.restore()
    }

    frontRender(currentSprite){
        this.transform.realPosition.x = this.transform.position.x - currentSprite.width + this.sprite[0].width
        this.transform.realPosition.y = this.transform.position.y
        this.transform.size.sizeW = currentSprite.width * this.transform.scale
        this.transform.size.sizeH = currentSprite.height * this.transform.scale
        if(this.sprite != BulletSprite.getInstance().cupheadBulletDie){
            this.GAME.ctx.drawImage(
                currentSprite,
                this.transform.realPosition.x,
                this.transform.realPosition.y,
                this.transform.size.sizeW,
                this.transform.size.sizeH)
            }
            else{
                this.GAME.ctx.drawImage(
                    currentSprite,
                    this.transform.position.x - currentSprite.width / 2 ,
                    this.transform.realPosition.y - currentSprite.width/2 * this.transform.scale,
                    this.transform.size.sizeW,
                    this.transform.size.sizeH)
            }

    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        if(this.orientationX == 0) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
    }

    transformBullet(){
        if(this.orientationX == 0) this.transform.position.x += this.speed
        else this.transform.position.x -= this.speed
        
    }

    changeSprite(){
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick += 1;
            this.spriteInterval = 0;
          }
        if (this.tick >= this.sprite.length) this.tick = this.sprite.length - 1;
    }

    updateState(){
        if(this.Collision(this,this.GAME.boss.captain) && this.sprite == BulletSprite.getInstance().cupheadBulletLoop){
            this.GAME.boss.captain.hp -= 1
            this.tick = 0
            this.spriteInterval = 0
            this.sprite = BulletSprite.getInstance().cupheadBulletDie
            this.speed = 0
            this.CURR_CHAR_CONF = this.CHAR_CONF.cupheadDie
        }
    }

    removeBullet(){
        if(!(this.transform.position.x >= 0 &&
            this.transform.position.x <= GameSetting.WIDTH &&
            this.transform.position.y >= 0 &&
            this.transform.position.y <= GameSetting.HEIGHT)){
                this.GAME.removeBulletLoop(this);
            } 
        if(this.sprite == BulletSprite.getInstance().cupheadBulletDie){
            if(this.tick == this.sprite.length - 1){
                this.GAME.removeBulletLoop(this);
            }
        }
    }


    update(){
        this.updateFrame()
        this.updateState()
        this.transformBullet()
        this.changeSprite()
        this.removeBullet()
    }
}