import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchAttackState } from "./cupheadCrouchAttackState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadCrouchStandupState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchStandup
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckStandupSprites()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        this.cuphead.tick = 0

        if(cupheadController.left == true ||cupheadController.right == true){
            if(cupheadController.shot == true) this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
            this.cuphead.currentState = new CupheadRunState(this.cuphead)
        }
        if(cupheadController.shot == true) this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
        this.cuphead.currentState = new CupheadIdleState(this.cuphead)
    }

    update(){
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 