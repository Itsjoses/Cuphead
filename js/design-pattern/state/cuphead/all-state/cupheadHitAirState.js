import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadDashAirState } from "./cupheadDashAirState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadHitAirState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.hitAir
        this.cuphead.sprite = CupheadSprites.getInstace().hitAirSprites
        this.oneLoop = false;
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
    }

    updateState() {
        if(this.cuphead.tick >= this.cuphead.sprite.length -1){
            this.oneLoop = true
        }
        if(this.oneLoop == true){
            
            this.cuphead.controller.hit = "delay"
            const cupheadController = this.cuphead.controller

            if(cupheadController.jump == true ){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadJumpState(this.cuphead)
            }

            if(cupheadController.dash == true ){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadDashAirState(this.cuphead,this.cuphead.transform.position.y + this.cuphead.sprite[this.cuphead.tick].height)
            }
            if(cupheadController.jump == false){
                this.cuphead.tick = 0
                if(cupheadController.left || cupheadController.right){
                    if(cupheadController.shot == true)this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
                    this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
                }
                if(cupheadController.shot == true)this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
                this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            }
        }
    }

    update() {
        this.updateFrame()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.cuphead.wallCollision()
        this.updateState()
    }
} 