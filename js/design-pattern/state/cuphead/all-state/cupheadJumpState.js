import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
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
        if(cupheadController.jump == false){
            if(cupheadController.left || cupheadController.right){
                if(cupheadController.shot == true)this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
                this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
            }
            if(cupheadController.shot == true)this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
            if(cupheadController.crouch == true) this.cuphead.currentState = new CupheadCrouchState(this.cuphead)
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            
        }
        // const cupheadController = this.cuphead.controller
        // if (cupheadController.left == false && cupheadController.right == false) {
        //     console.log("masuk ke idle lagi");
        //     this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        // }
        // if(cupheadController.shot == true){
        //     this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
        // }
    }

    update() {
        console.log("ini jump");
        this.updateState()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 