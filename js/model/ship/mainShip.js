import { ShipSprites } from "../../design-pattern/singleton/shipSprite.js"
import { ShipIdleState } from "../../design-pattern/state/ship/all-state/shipIdleState.js"
import { GameObject } from "../../parent/gameObject.js"

export class MainShip extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.currentState = new ShipIdleState(this)
        // this.sprite = ShipSprites.getInstance().idleShip
        // this.CURR_CHAR_CONF = CHAR_CONF.idle
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y + this.GAME.waveHeight,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
    }

    update(){
        this.currentState.update()
        // this.changeSprite()
        // this.updateFrame()
    }
}