import { Transform } from "../model/transform.js"
import { GAME } from "../game.js"

export class GameObject {
    constructor(x,y,w,h,scale,CHAR_CONF){
        this.transform = new Transform(x,y,w,h,scale)
        this.CHAR_CONF = CHAR_CONF
        this.CURR_CHAR_CONF = null
        this.GAME = GAME.getInstace()
        this.sprite = []
        this.tick = 0
        this.reverse = false;
        this.spriteInterval = 0
    }
    
    changeSprite(){
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick += 1;
            this.spriteInterval = 0;
          }
        if (this.tick >= this.sprite.length) this.tick = 0;
    }

    update(){

    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x,this.transform.position.y,currentSprite.width * this.transform.scale,currentSprite.height * this.transform.scale)
    
    }

}