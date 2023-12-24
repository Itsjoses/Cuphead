import { GameObject } from "../../../parent/gameObject.js";

export class Water extends GameObject{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.transform.size.w = 1280
    }

    updateFrame(){
        const currentSprite =  this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y - currentSprite.height,this.transform.size.w,currentSprite.height)
    }

    update(){
        this.changeSprite()
        this.updateFrame()
    }

}