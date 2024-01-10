import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";
import { CupheadRunState } from "./cupheadRunState.js";

export class CupheadHitGroundState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.hitGround
        this.cuphead.sprite = CupheadSprites.getInstace().hitGroundSprites
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
            if (cupheadController.left == false && cupheadController.right == false) {
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            }
            if(cupheadController.left == true || cupheadController.right == true){
                this.cuphead.currentState = new CupheadRunState(this.cuphead)
            }
            if(cupheadController.shot == true){
                this.cuphead.tick = 0
                this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
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