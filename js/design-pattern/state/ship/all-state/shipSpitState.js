import { ShipSprites } from "../../../singleton/shipSprite.js"
import { ShipState } from "../shipState.js"
import { ShipIdleState } from "./shipIdleState.js"


export class ShipSpitsState extends ShipState {
    constructor(ship) {
        super(ship)
        this.ship.tick = 0
        this.ship.spriteInterval = 0
        this.ship.CURR_CHAR_CONF = this.ship.CHAR_CONF.spits
        this.ship.sprite = ShipSprites.getInstance().spitsShip
    }

    updateState() {
        if(this.ship.tick >= this.ship.sprite.length - 1){
            this.ship.currentState = new ShipIdleState(this.ship)
        }
        
    }

    update() {
        this.updateFrame()
        this.ship.changeSprite()
        this.updateState()
    }
} 