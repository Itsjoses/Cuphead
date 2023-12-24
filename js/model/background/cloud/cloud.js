import { GAME } from "../../../game.js";
import { GameObject } from "../../../parent/gameObject.js";
import { Transform } from "../../transform.js";

export class Cloud {
    constructor(x,y,scale,CHAR_CONF,sprite){
        this.GAME = GAME.getInstace()
        this.transform = new Transform(x,y,1,1,scale)
        this.sprite = sprite
        this.CURR_CHAR_CONF = CHAR_CONF
        this.cloud1 = 1
        this.cloud2 = 1 * this.sprite.width
        this.cloud3 = 2 * this.sprite.width
    }

    updateFrame(){
        const currentSprite =  this.sprite
        this.GAME.ctx.drawImage(currentSprite,this.cloud1,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
        this.GAME.ctx.drawImage(currentSprite,this.cloud2,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
        this.GAME.ctx.drawImage(currentSprite,this.cloud3,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
    }

    parallax() {
        const spriteWidth = this.sprite.width * this.transform.scale;
    
        if (this.cloud1 + spriteWidth < 0) {
            this.cloud1 = this.cloud3 + spriteWidth;
        }
    
        if (this.cloud2 + spriteWidth < 0) {
            this.cloud2 = this.cloud1 + spriteWidth;
        }
    
        if (this.cloud3 + spriteWidth < 0) {
            this.cloud3 = this.cloud2 + spriteWidth;
        }
    }

    speed(){
        this.cloud1 -= this.CURR_CHAR_CONF.speedWind * this.GAME.delta
        this.cloud2 -= this.CURR_CHAR_CONF.speedWind * this.GAME.delta
        this.cloud3 -= this.CURR_CHAR_CONF.speedWind * this.GAME.delta
    }

    update(){
        this.parallax()
        this.updateFrame()
        this.speed()
    }

}