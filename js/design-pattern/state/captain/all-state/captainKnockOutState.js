import { CaptainSprites } from "../../../singleton/captainSprite.js"
import { CaptainState } from "../captainState.js"
import { CaptainPickOctoState } from "./captainPickOctoState.js"

export class CaptainKnockOutState extends CaptainState {
    constructor(captain) {
        super(captain)
        this.captain.tick = 0
        this.captain.spriteInterval = 0
        this.captain.CURR_CHAR_CONF = this.captain.CHAR_CONF.knockOut
        this.captain.sprite = CaptainSprites.getInstance().knockOutCaptain
     }

    update() {
        this.captain.changePhase()
        this.updateFrame()
        this.captain.GAME.boss.mainShip.update()
        this.captain.changeSprite()
    }
} 