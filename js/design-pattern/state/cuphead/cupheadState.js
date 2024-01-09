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
            if (cupheadController.left == true){
                this.cuphead.orientation = true
                this.cuphead.transform.velocityX = -this.cuphead.CURR_CHAR_CONF.velocityX
            } 
            else if (cupheadController.right == true){
                this.cuphead.orientation = false
                this.cuphead.transform.velocityX = this.cuphead.CURR_CHAR_CONF.velocityX
            } 
            else this.cuphead.transform.velocityX = 0
            this.cuphead.transform.position.x += this.cuphead.transform.velocityX * this.cuphead.GAME.delta
        }
    }

    frontRender(currentSprite){
        // console.log(this.cuphead.sprite);
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
        // console.log(this.cuphead.transform.position.x);
    }
    backRender(currentSprite) {
        const staticIdleSprite = CupheadSprites.getInstace().getIdle();
        this.cuphead.GAME.ctx.save();
    
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        
        this.cuphead.GAME.ctx.translate(
            this.cuphead.transform.realPosition.x + staticIdleSprite[0].width / 2,
            this.cuphead.transform.realPosition.y + this.cuphead.transform.size.sizeH / 2
        );
    
        // Scale horizontally by -1 to flip the image
        this.cuphead.GAME.ctx.scale(-1, 1);
    
        // Draw the flipped image
        this.cuphead.GAME.ctx.drawImage(
            currentSprite,
            -staticIdleSprite[0].width / 2,
            -this.cuphead.transform.size.sizeH / 2,
            currentSprite.width,
            currentSprite.height
        );
    
        this.cuphead.GAME.ctx.restore();
    }

    updateFrame(){
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]
        // console.log(this.cuphead.tick);
        if(this.cuphead.orientation == false) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
    }
}