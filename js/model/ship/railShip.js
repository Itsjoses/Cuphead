import { ShipSprites } from "../../design-pattern/singleton/shipSprite.js"
import { GameObject } from "../../parent/gameObject.js"


export class Rail extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = ShipSprites.getInstance().railShip
        this.CURR_CHAR_CONF = CHAR_CONF.rail
    }

    updateFrame(){
        const currentSprite =  this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y + this.GAME.waveHeight,currentSprite.width,currentSprite.height)
    }

    update(){
        this.changeSprite()
        this.updateFrame()
    }

}