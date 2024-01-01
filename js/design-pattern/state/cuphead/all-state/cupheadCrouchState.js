import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchAttackState } from "./cupheadCrouchAttackState.js";
import { CupheadCrouchIdleState } from "./cupheadCrouchIdleState.js";
import { CupheadCrouchStandupState } from "./cupheadCrouchStandupState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadCrouchState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchNormal
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckNormalSpritest()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        /**
         * state from normal crouch to idle crouch or attack crouch
         */
        if(this.cuphead.tick >= this.cuphead.sprite.length - 1){
            if(cupheadController.crouch == false){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadCrouchStandupState(this.cuphead)
            }
            if(cupheadController.shot == true){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadCrouchAttackState(this.cuphead)
            }else{
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadCrouchIdleState(this.cuphead)
            }

        }
    }

    update(){
        this.updateFrame()
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
    }
} 