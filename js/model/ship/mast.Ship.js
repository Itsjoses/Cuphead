import { ShipSprites } from "../../design-pattern/singleton/shipSprite.js"
import { GameObject } from "../../parent/gameObject.js"


export class Mast extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = ShipSprites.getInstance().mastShip
        console.log(this.sprite);
        this.CURR_CHAR_CONF = CHAR_CONF.mast
    }

    updateFrame(){
        this.GAME.ctx.drawImage(this.sprite,this.transform.position.x,this.transform.position.y + this.GAME.waveHeight ,this.sprite.width,this.sprite.height)
    }

    update(){
        this.updateFrame()
    }

}