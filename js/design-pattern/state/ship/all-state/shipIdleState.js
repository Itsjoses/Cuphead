import { ShipSprites } from "../../../singleton/shipSprite.js"
import { ShipState } from "../shipState.js"
import { ShipSpitsState } from "./shipSpitState.js"
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
        if(this.ship.GAME.boss.captain.hp == 0) return
        if(this.ship.GAME.intro == false) return
        console.log("masuk");
        const randomState = Math.random() * 100 
        if(this.ship.tick >= this.ship.sprite.length - 1){
            if(randomState<= 1){
                this.ship.currentState = new ShipBlinkState(this.ship)
            }
            if(randomState<= 3){
                this.ship.currentState = new ShipBlinkState(this.ship)
            }
            if(this.ship.phase == 2){
                if(randomState<= 5){
                    this.ship.currentState = new ShipSpitsState(this.ship)
                }
            }
        }

    }

    update() {
        this.updateFrame()
        this.ship.changeSprite()
        this.updateState()
    }
} 