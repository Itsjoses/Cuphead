import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { GameObject } from "../../../parent/gameObject.js";
import { BACKGROUD_CONF } from "../../../settings/backgroundSettings.js";
import { IrisReverse } from "./irisReverse.js";

export class Knockout extends GameObject{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.transform.size.w = 1280
        this.transform.size.h = 720
        this.sprite = BackgroundSprites.getInstance().knockout
        this.CURR_CHAR_CONF = CHAR_CONF.knockout
        this.GAME.sound.disableAllSong()
        this.GAME.sound.knockoutBell.play()
        this.GAME.sound.announcerKnockout.play()
    }

    changeSprite(){
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick += 1;
            this.spriteInterval = 0;
          }
        if (this.tick >= this.sprite.length) this.tick = 0;
    }

    updateFrame(){
        this.GAME.stop = true
        if(this.tick >= this.sprite.length - 1) {
            this.GAME.sound.knockoutBoom.play()
            this.GAME.stop = false
            this.GAME.removeScreen(this);
            setTimeout(() => {
                this.GAME.screen.push(new IrisReverse(0, 0, 300, 300, 1, BACKGROUD_CONF));
            }, 2000); // 2000 milliseconds = 2 seconds
        }
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,this.transform.size.w,this.transform.size.h )
    }

    update(){
        this.changeSprite()
        this.updateFrame()
    }

}