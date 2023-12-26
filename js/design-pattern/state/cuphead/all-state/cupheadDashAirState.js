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
        this.cuphead.sprite = CupheadSprites.getInstace().getDashAirSprites()
    }

    updateState() {
        console.log("ini masih true",this.cuphead.controller.dash );
        if(this.cuphead.tick >= this.cuphead.sprite.length -1){
            console.log("masuk ke idle");
            this.cuphead.controller.dash = false
            console.log("ini udah false",this.cuphead.controller.dash );
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            
        }
    }

    frontRender(){
        const currentSprite =  this.cuphead.sprite[this.cuphead.tick]
        const currentStaticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.drawImage(
            currentSprite,
            this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width,
            this.cuphead.transform.position.y,currentSprite.width,
            currentSprite.height)
    }

    backRender() {
        const currentSprite = this.cuphead.sprite[this.cuphead.tick];
        const staticIdleSprite = CupheadSprites.getInstace().getIdle();
        const ctx = this.cuphead.GAME.ctx;
        ctx.save();
        ctx.translate(
            this.cuphead.transform.position.x + currentSprite.width/2,
            this.cuphead.transform.position.y + currentSprite.height / 2
        );
        ctx.scale(-1, 1);
        ctx.drawImage(
            currentSprite,
            -(currentSprite.width/2),  // Adjusted this line
            -currentSprite.height / 2,
            currentSprite.width,
            currentSprite.height
        );
        ctx.restore();
    }

    groundColiision(){

    }

    update() {
        this.updateFrame()
        this.updateState()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.groundCollision()
    }
} 