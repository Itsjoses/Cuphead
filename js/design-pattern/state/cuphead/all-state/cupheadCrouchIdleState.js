import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchAttackState } from "./cupheadCrouchAttackState.js";
import { CupheadCrouchStandupState } from "./cupheadCrouchStandupState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";

export class CupheadCrouchIdleState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchIdle
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckIdleSprites()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadCrouchAttackState(this.cuphead)
        }
        if(cupheadController.crouch == false){
            this.cuphead.currentState = new CupheadCrouchStandupState(this.cuphead)
        }
    }

    update(){
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 