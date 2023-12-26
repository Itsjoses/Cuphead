import { CupheadSprites } from "../../singleton/cupheadSprite.js"

export class CupheadState{
    constructor(cuphead){
        this.cuphead = cuphead
    }

    updateTransform() {
        const cupheadController = this.cuphead.controller
        if(this.cuphead.controller.dash == true){
            if(this.cuphead.orientation == true) this.cuphead.transform.position.x -= this.cuphead.CURR_CHAR_CONF.velocityX* this.cuphead.GAME.delta
            else this.cuphead.transform.position.x += this.cuphead.CURR_CHAR_CONF.velocityX* this.cuphead.GAME.delta
        } 
        else{
            if (cupheadController.left == true) this.cuphead.transform.velocityX = -this.cuphead.CURR_CHAR_CONF.velocityX
            else if (cupheadController.right == true) this.cuphead.transform.velocityX = this.cuphead.CURR_CHAR_CONF.velocityX
            else this.cuphead.transform.velocityX = 0
            this.cuphead.transform.position.x += this.cuphead.transform.velocityX * this.cuphead.GAME.delta
        }
    }

    frontRender(currentSprite){
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
        console.log(this.cuphead.transform.position.x);
    }
    backRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.save()
        this.cuphead.GAME.ctx.translate(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2)
        this.cuphead.GAME.ctx.scale(-1,1)  
        this.cuphead.GAME.ctx.drawImage(currentSprite,-staticIdleSprite[0].width/2,-currentSprite.height / 2,currentSprite.width,currentSprite.height)
        this.cuphead.GAME.ctx.restore()
        // console.log(this.cuphead.transform.position.x + staticIdleSprite[0].width/2 -staticIdleSprite[0].width/2);
    }

    updateFrame(){
        const currentSprite =  this.cuphead.sprite[this.cuphead.tick]
        if(this.cuphead.orientation == false) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
    }
}