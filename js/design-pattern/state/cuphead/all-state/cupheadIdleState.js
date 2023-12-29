import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadIdleState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.idle
        this.cuphead.sprite = CupheadSprites.getInstace().getIdle()
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if(cupheadController.left == true || cupheadController.right == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadRunState(this.cuphead)
        } 
        if(cupheadController.shot == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
        }
        if(cupheadController.crouch == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadCrouchState(this.cuphead)
        }
        if(cupheadController.dash == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadDashState(this.cuphead)
        }
        if(cupheadController.jump == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadJumpState(this.cuphead)
        }
    }

    update() {
        this.updateFrame()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateState()
    }
} 