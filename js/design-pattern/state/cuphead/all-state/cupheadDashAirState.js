import { GameSetting } from "../../../../settings/gameSettings.js";
import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadDashAirState extends CupheadState {
    constructor(cuphead,airGround) {
        super(cuphead)
        this.airGround = airGround
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.dash
        this.cuphead.sprite = CupheadSprites.getInstace().getDashAirSprites()
        this.currentVelocityY = this.cuphead.transform.velocity.y
    }

    updateState() {
        if(this.cuphead.tick >= this.cuphead.sprite.length -1){
            this.cuphead.controller.dash = false
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        }
    }

    frontRender(){
        const currentSprite =  this.cuphead.sprite[this.cuphead.tick]
        const currentStaticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.drawImage(
            currentSprite,
            this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width,
            this.cuphead.transform.position.y,currentSprite.width,
            currentSprite.height)
    }

    backRender() {
        const currentSprite = this.cuphead.sprite[this.cuphead.tick];
        const staticIdleSprite = CupheadSprites.getInstace().getIdle();
        const ctx = this.cuphead.GAME.ctx;
        ctx.save();
        ctx.translate(
            this.cuphead.transform.position.x + currentSprite.width/2,
            this.cuphead.transform.position.y + currentSprite.height / 2
        );
        ctx.scale(-1, 1);
        ctx.drawImage(
            currentSprite,
            -(currentSprite.width/2),  // Adjusted this line
            -currentSprite.height / 2,
            currentSprite.width,
            currentSprite.height
        );
        ctx.restore();
    }

    groundCollision(){
        if(this.cuphead.sprite == CupheadSprites.getInstace().getDashAirSprites()){
            this.cuphead.transform.velocity.y += this.airGround  * this.cuphead.GAME.delta
            this.cuphead.transform.position.y += this.cuphead.transform.velocity.y
            if(this.cuphead.transform.position.y  > this.airGround  - this.cuphead.sprite[this.cuphead.tick].height){
                this.cuphead.transform.position.y = this.airGround  -  this.cuphead.sprite[this.cuphead.tick].height
            } 
            else this.cuphead.transform.position.y = this.cuphead.transform.position.y
        }else{
            this.cuphead.transform.velocity.y = 5
        }
    }

    wallCollision(){
        const currentSprite = this.cuphead.sprite[this.cuphead.tick];
        const currentStaticIdleSprite = CupheadSprites.getInstace().getIdle()
        if((this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width) + currentSprite.width >= 874){
            this.cuphead.transform.position.x = 874 - currentStaticIdleSprite[0].width
        }
        if(this.cuphead.transform.position.x <= 0){
            this.cuphead.transform.position.x = 0
        }
    }

    update() {
        this.updateFrame()
        this.updateState()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.groundCollision()
        this.wallCollision()
    }
} 