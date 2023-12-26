import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import {  CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";

export class CupheadShotStraightState extends CupheadState{
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.shotStraight
        this.cuphead.sprite = CupheadSprites.getInstace().getShotStraight()
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        }
        if(cupheadController.left == true || cupheadController.right == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
        }
        if(cupheadController.crouch == true){
            this.cuphead.currentState = new CupheadCrouchState(this.cuphead)
        }
        if(cupheadController.jump == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadJumpState(this.cuphead)
        }
    }
    update() {
        this.updateFrame()
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
    }
} 