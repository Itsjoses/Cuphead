import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import {  CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";

export class CupheadShotStraightState extends CupheadState{
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.shotStraight
        this.cuphead.sprite = CupheadSprites.getInstace().getShotStraight()
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == false){
            console.log("masuk ke idle lagi");
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        }
        if(cupheadController.left == true || cupheadController.right == true){
            this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
        }
    }

    update() {
        console.log("idle");
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 