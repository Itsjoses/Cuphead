import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { GameObject } from "../../../parent/gameObject.js";

export class IrisReverse extends GameObject{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.transform.size.w = 1280
        this.transform.size.h = 720
        this.sprite = BackgroundSprites.getInstance().iris
        this.CURR_CHAR_CONF = CHAR_CONF.irisScreen
        this.done = false
        this.tick = this.sprite.length -1
    }

    changeSprite(){
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick -= 1;
            this.spriteInterval = 0;
          }
        if (this.tick <= 0){
            this.GAME.pause = true
            this.tick = 0;
        } 
    }

    updateFrame(){
        if(this.tick == 0){
            // this.GAME.pause = true;
        }
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,this.transform.size.w,this.transform.size.h )
    }

    update(){
            this.changeSprite()
            this.updateFrame()
    }

}