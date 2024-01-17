import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { GAME } from "../../../game.js";
import { GameObject } from "../../../parent/gameObject.js";
import { BACKGROUD_CONF } from "../../../settings/backgroundSettings.js";
import { Transform } from "../../transform.js";
import { IrisReverse } from "./irisReverse.js";

export class Die {
    constructor(x,y,scale,CHAR_CONF){
        this.GAME = GAME.getInstace()
        this.transform = new Transform(x,y,1,1,scale)
        this.sprite = BackgroundSprites.getInstance().die
        this.CURR_CHAR_CONF = CHAR_CONF
        this.transform.size.w = 1280
        this.transform.size.h = 720
        setTimeout(() => {
            this.GAME.removeScreen(this);
            this.GAME.screen.push(new IrisReverse(0, 0, 300, 300, 1, BACKGROUD_CONF));
        }, 2000); // 2000 milliseconds = 2 seconds
    }

    updateFrame(){
        const currentSprite =  this.sprite
        this.GAME.ctx.drawImage(currentSprite,0,0,this.transform.size.w,this.transform.size.h)
    }

    update(){
        this.updateFrame()
    }

}