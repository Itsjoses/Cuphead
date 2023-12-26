import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchAttackState } from "./cupheadCrouchAttackState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadCrouchStandupState extends CupheadState {
  constructor(cuphead) {
    super(cuphead);
    this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchStandup;
    this.cuphead.sprite = CupheadSprites.getInstace().getDuckStandupSprites();
  }

  updateState() {
    const cupheadController = this.cuphead.controller;
    if (this.cuphead.tick >= this.cuphead.sprite.length - 1) {
      this.cuphead.tick = 0;
      if (cupheadController.jump == true) {
        this.cuphead.currentState = new CupheadJumpState(this.cuphead);
      }
      if (cupheadController.left == true || cupheadController.right == true) {
        if (cupheadController.shot == true)
          this.cuphead.currentState = new CupheadRunShotStraightState(
            this.cuphead
          );
        this.cuphead.currentState = new CupheadRunState(this.cuphead);
      }
      if (cupheadController.shot == true)
        this.cuphead.currentState = new CupheadShotStraightState(this.cuphead);
      else this.cuphead.currentState = new CupheadIdleState(this.cuphead);
    }
  }

  update() {
    this.updateFrame();
    this.updateState();
    this.cuphead.changeSprite();
    this.cuphead.groundCollision();
  }
}
