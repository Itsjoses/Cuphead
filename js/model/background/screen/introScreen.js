import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { GameObject } from "../../../parent/gameObject.js";

export class IntroScreen extends GameObject{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.transform.size.w = 1280
        this.transform.size.h = 720
        this.sprite = BackgroundSprites.getInstance().iris
        this.CURR_CHAR_CONF = CHAR_CONF.irisScreen
        this.done = false
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,this.transform.size.w,this.transform.size.h )
        if(this.tick >= this.sprite.length - 1 && this.sprite == BackgroundSprites.getInstance().iris){
            this.sprite = BackgroundSprites.getInstance().wallop
            this.CURR_CHAR_CONF = this.CHAR_CONF.wallop
        }
        if(this.tick >= this.sprite.length - 1 && this.sprite == BackgroundSprites.getInstance().wallop){
            this.GAME.intro = false
            this.GAME.removeScreen(this)
        }
    }

    update(){
            this.changeSprite()
            this.updateFrame()
    }

}