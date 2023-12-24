export class CupheadState{
    constructor(cuphead){
        this.cuphead = cuphead
    }

    updateTransform() {
        const cupheadController = this.cuphead.controller
        if (cupheadController.left == true) this.cuphead.transform.velocityX = -this.cuphead.CURR_CHAR_CONF.velocityX
        else if (cupheadController.right == true) this.cuphead.transform.velocityX = this.cuphead.CURR_CHAR_CONF.velocityX
        else this.cuphead.transform.velocityX = 0
        this.cuphead.transform.position.x += this.cuphead.transform.velocityX * this.cuphead.GAME.delta
    }

    updateFrame(){
        const currentSprite =  this.cuphead.sprite[this.cuphead.tick]
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
    }
}