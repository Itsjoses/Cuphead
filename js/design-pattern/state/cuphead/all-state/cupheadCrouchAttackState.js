import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchIdleState } from "./cupheadCrouchIdleState.js";
import { CupheadCrouchStandupState } from "./cupheadCrouchStandupState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";

export class CupheadCrouchAttackState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchAttack
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckShootSprites()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadCrouchIdleState(this.cuphead)
        }
        if(cupheadController.crouch == false){
            this.cuphead.tick = 0
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