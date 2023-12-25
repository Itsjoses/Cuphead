import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadDashState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.dash
        this.cuphead.sprite = CupheadSprites.getInstace().getDashSprites()
    }

    updateState() {
        console.log("ini position x :",this.cuphead.transform.position.x,"ini width canvas :", this.cuphead.sprite[this.cuphead.tick].width);
        if(this.cuphead.tick >= this.cuphead.sprite.length -1){
            console.log("masuk ke idle");
            this.cuphead.controller.dash = false
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            
        }
    }

    updateFrame(){
        const currentSprite =  this.cuphead.sprite[this.cuphead.tick]
        const currentStaticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
        // this.cuphead.GAME.ctx.beginPath()
        // this.cuphead.GAME.ctx.rect(this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
        // this.cuphead.GAME.ctx.lineWidth = 2
        // this.cuphead.GAME.ctx.strokeStyle = "red"
        // this.cuphead.GAME.ctx.stroke()
        // this.cuphead.GAME.ctx.closePath()
    }

    update() {
        this.updateFrame()
        this.updateState()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
    }
} 