import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadRunShotStraightState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.runShotStraight
        this.cuphead.sprite = CupheadSprites.getInstace().getRunShotStraight()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadRunState(this.cuphead)
        }
        if(cupheadController.left == false && cupheadController.right == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
        }
        if(cupheadController.jump == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadJumpState(this.cuphead)
        }
        if(cupheadController.dash == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadDashState(this.cuphead)
        }
    }

    update(){
        this.updateFrame()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.cuphead.wallCollision()
        this.updateState()
    }
} 