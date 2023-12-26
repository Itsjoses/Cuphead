import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadJumpState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.jump
        this.cuphead.sprite = CupheadSprites.getInstace().getJumpSprites()
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if(cupheadController.dash == true ){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadDashState(this.cuphead)
            
        }
        if(cupheadController.jump == false){
            this.cuphead.tick = 0
            if(cupheadController.left || cupheadController.right){
                if(cupheadController.shot == true)this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
                this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
            }
            if(cupheadController.shot == true)this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            
        }
    }

    update() {
        this.updateFrame()
        this.updateState()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
    }
} 