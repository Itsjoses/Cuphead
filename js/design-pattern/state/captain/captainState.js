import { Boss } from "../../../model/boss.js"
import { CaptainSprites } from "../../singleton/captainSprite.js"

export class CaptainState{
    constructor(captain){
        this.captain = captain
    }

    updateTransform() {
        const captainController = this.captain.controller
        if(this.captain.controller.dash == true){
            if(this.captain.orientation == true) this.captain.transform.position.x -= this.captain.CURR_CHAR_CONF.velocityX* this.captain.GAME.delta
            else this.captain.transform.position.x += this.captain.CURR_CHAR_CONF.velocityX* this.captain.GAME.delta
        } 
        else{
            if (captainController.left == true) this.captain.transform.velocityX = -this.captain.CURR_CHAR_CONF.velocityX
            else if (captainController.right == true) this.captain.transform.velocityX = this.captain.CURR_CHAR_CONF.velocityX
            else this.captain.transform.velocityX = 0
            this.captain.transform.position.x += this.captain.transform.velocityX * this.captain.GAME.delta
        }
    }

    updateFrame(){
        const currentSprite = this.captain.sprite[this.captain.tick]
        this.captain.transform.size.sizeW = currentSprite.width * this.captain.transform.scale
        this.captain.transform.size.sizeH = currentSprite.height * this.captain.transform.scale

        
        this.captain.transform.realPosition.x = this.captain.transform.position.x - currentSprite.width
        this.captain.transform.realPosition.y = this.captain.transform.position.y + this.captain.GAME.waveHeight - currentSprite.height

        this.captain.GAME.ctx.drawImage(currentSprite,
            this.captain.transform.realPosition.x,
            this.captain.transform.realPosition.y,
            this.captain.transform.size.sizeW,
            this.captain.transform.size.sizeH)
    }
}