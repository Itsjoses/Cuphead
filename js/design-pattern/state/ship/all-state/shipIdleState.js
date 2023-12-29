import { ShipSprites } from "../../../singleton/shipSprite.js"
import { ShipState } from "../shipState.js"
import { ShipBlinkState } from "./shipblinkState.js"


export class ShipIdleState extends ShipState {
    constructor(ship) {
        super(ship)
        this.ship.tick = 0
        this.ship.spriteInterval = 0
        this.ship.CURR_CHAR_CONF = this.ship.CHAR_CONF.idle
        this.ship.sprite = ShipSprites.getInstance().idleShip
    }

    updateState() {
        if(this.ship.tick >= this.ship.sprite.length - 1){
            if(Math.random() * 100 <= 1){
                this.ship.currentState = new ShipBlinkState(this.ship)
            }
            if(Math.random() * 100 <= 3){
                this.ship.currentState = new ShipBlinkState(this.ship)
            }
        }

    }

    update() {
        this.updateFrame()
        this.ship.changeSprite()
        this.updateState()
    }
} 