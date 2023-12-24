import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { GameObject } from "../../../parent/gameObject.js";

export class DockA extends GameObject{
    constructor(x,y,w,h,scale ,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BackgroundSprites.getInstance().pirateDockA
        this.CURR_CHAR_CONF = CHAR_CONF.dockA

    }

    updateFrame(){
        const currentSprite =  this.sprite
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
    
    }

    update(){
        this.updateFrame()
    }
}