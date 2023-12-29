import { CaptainSprites } from "../../../singleton/captainSprite.js"
import { CaptainState } from "../captainState.js"
import { CaptainPickOctoState } from "./captainPickOctoState.js"

export class CaptainIdleState extends CaptainState {
    constructor(captain) {
        super(captain)
        this.captain.tick = 0
        this.captain.spriteInterval = 0
        this.captain.CURR_CHAR_CONF = this.captain.CHAR_CONF.idle
        this.captain.sprite = CaptainSprites.getInstance().idleCaptain
     }

    updateState() {
        if(this.captain.tick >= this.captain.sprite.length - 1){
            if(Math.random() * 100 <= 5){
                this.captain.currentState = new CaptainPickOctoState(this.captain)
            }
        }
    }

    update() {
        this.updateFrame()
        this.captain.GAME.boss.mainShip.update()
        this.captain.changeSprite()
        this.updateState()
    }
} 