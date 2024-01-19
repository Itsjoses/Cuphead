import { CupheadSprites } from "../../singleton/cupheadSprite.js"

export class CupheadState{
    constructor(cuphead){
        this.cuphead = cuphead
        this.hitSprite = 0
        this.sounds = this.cuphead.GAME.sound
    }

    updateTransform() {
        if(this.cuphead.GAME.stop == true) return;
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
        const ctx = this.cuphead.GAME.ctx;
        
        // Draw a rectangle around the character (adjust dimensions as needed)
        // ctx.beginPath();
        // ctx.strokeStyle = 'red'; // Set the stroke color
        // ctx.lineWidth = 2; // Set the line width 
        // ctx.rect(
        //     this.cuphead.transform.realPosition.x + this.cuphead.transform.size.sizeW/6,this.cuphead.transform.realPosition.y + this.cuphead.transform.size.sizeH/6,this.cuphead.transform.size.sizeW/3,this.cuphead.transform.size.sizeH/3
        // );
        // ctx.stroke();
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
        console.log(this.cuphead.invincible);
        this.cuphead.invincibleDelay()
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]
        if(this.cuphead.controller.hit == "hit" || this.cuphead.controller.hit == "delay" ) this.hitSprite = 2
        else this.hitSprite = 0

        if(this.hitSprite == 0){
            if(this.cuphead.orientation == false) this.frontRender(currentSprite)
            else this.backRender(currentSprite)
        }else{
            if(this.cuphead.tick % this.hitSprite == 0){
                if(this.cuphead.orientation == false) this.frontRender(currentSprite)
                else this.backRender(currentSprite)
        }
        }
    }

    invincibleDelay(){
        if(this.cuphead.invincible == false){
            this.cuphead.invincible = true
            setTimeout(() => {
                this.cuphead.invincible = false
            }, 3000); // 2000 milliseconds = 2 seconds
        }
    }

    /**
     * sound
     */

    cupheadLoopSound(){
        if(this.cuphead.GAME.stop == true) return;
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == true){
            this.sounds.cupheadFireLoopState = true
            this.sounds.cupheadFireLoop.play()
        } 
        else{
            this.sounds.cupheadFireLoopState = false
            this.sounds.cupheadFireLoop.pause()
        } 
    }

}