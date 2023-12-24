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
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchNormal
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckNormalSpritest()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        // if(cupheadController.crouch == false){
        //     if(this.cuphead.sprite != CupheadSprites.getInstace().getDuckStandupSprites()){
        //         this.cuphead.tick = 0
        //     }

        //     this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchStandup
        //     this.cuphead.sprite = CupheadSprites.getInstace().getDuckStandupSprites()
        //     if(this.cuphead.tick >= this.cuphead.sprite.length - 1){
        //         if(cupheadController.shot == true) {
        //             this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
        //         }
        //         if(cupheadController.left == true ||  cupheadController.right == true) this.cuphead.currentState = new CupheadRunState(this.cuphead)
        //         this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        //         // this.cuphead.sprite = CupheadSprites.getInstace().getIdle()
        //     }
        // }
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
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 