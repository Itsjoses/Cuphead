import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchAttackState } from "./cupheadCrouchAttackState.js";
import { CupheadCrouchStandupState } from "./cupheadCrouchStandupState.js";
import { CupheadHitGroundState } from "./cupheadHitGroundState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";

export class CupheadCrouchIdleState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchIdle
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckIdleSprites()
    }

    updateState(){
        if(this.cuphead.GAME.stop == true) return;
        const cupheadController = this.cuphead.controller
        if(cupheadController.hit == "hit"){
            cupheadController.delayHit = true
            this.cuphead.delayHitTime = Date.now();
            this.cuphead.currentState = new CupheadHitGroundState(this.cuphead)
        }
        if(cupheadController.jump == false){
            if(cupheadController.shot == true){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadCrouchAttackState(this.cuphead)
            }
            if(cupheadController.crouch == false){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadCrouchStandupState(this.cuphead)
            }
        }
        else{
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadJumpState(this.cuphead)
        }
    }

    update(){
        this.updateFrame()
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
    }
} 