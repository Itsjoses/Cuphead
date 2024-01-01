import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadIntroState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.intro
        this.cuphead.sprite = CupheadSprites.getInstace().introSprites
    }

    updateState() {
        if(this.cuphead.tick >= this.cuphead.sprite.length - 1){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        }
    }

    update() {
        this.updateFrame()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateState()
    }
} 