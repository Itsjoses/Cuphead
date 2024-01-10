import { ShipBulletLoop } from "../../../../model/shipBulletLoop.js"
import { BULLET_CONF } from "../../../../settings/bulletSettings.js"
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
        this.shootTrue = false
    }

    updateState() {
        if(this.ship.tick >= this.ship.sprite.length - 9){
            if(this.shootTrue == false){
                this.ship.GAME.bulletLoops.push(new ShipBulletLoop(750,
                    550,
                    0, 0, 1,BULLET_CONF))
                    this.shootTrue = true
            }
        }else{
            this.shootTrue =false
        }
        if(this.ship.tick >= this.ship.sprite.length -1){
            const randomState = Math.random() * 100 
            if(randomState<= 50){
                this.ship.currentState = new ShipIdleState(this.ship)
            }
        }
    }

    rectDisplay(){

        const currentSprite = this.ship.sprite[this.ship.tick]
        const ctx = this.ship.GAME.ctx;
        
        // Draw a rectangle around the character (adjust dimensions as needed)
        ctx.beginPath();
        ctx.strokeStyle = 'red'; // Set the stroke color
        ctx.lineWidth = 2; // Set the line width 
        ctx.rect(
            750,
            550,
            30,
            30
        );
        ctx.stroke();
    }

    update() {
        this.rectDisplay()
        this.updateFrame()
        this.ship.changeSprite()
        this.updateState()
    }
} 