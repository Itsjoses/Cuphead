import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { GameObject } from "../../../parent/gameObject.js";

export class ScreenFX extends GameObject{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.transform.size.w = 1280
        this.transform.size.h = 720
        this.sprite = BackgroundSprites.getInstance().screenFX
        this.CURR_CHAR_CONF = CHAR_CONF.screenFX
        
        this.GAME.sound.opticalLoopSound()
    }

    updateFrame(){
        this.GAME.ctx.save()
        this.GAME.ctx.globalCompositeOperation = "multiply";
        this.GAME.ctx.imageSmoothingEnabled = true;
        this.GAME.ctx.imageSmoothingQuality = 'low';
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,this.transform.size.w,this.transform.size.h )
        // this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,this.transform.size.w,this.transform.size.h )
        this.GAME.ctx.restore()
    }

    update(){
        this.changeSprite()
        this.updateFrame()
    }

}