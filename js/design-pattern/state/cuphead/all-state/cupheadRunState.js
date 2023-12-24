import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";

export class CupheadRunState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.run
        this.cuphead.sprite = CupheadSprites.getInstace().getRun()
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if (cupheadController.left == false && cupheadController.right == false) {
            console.log("masuk ke idle lagi");
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        }
        if(cupheadController.shot == true){
            this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
        }
    }

    update() {
        console.log("run");
        this.updateState()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 