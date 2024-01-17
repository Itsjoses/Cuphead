import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadDashState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.dash
        this.cuphead.sprite = CupheadSprites.getInstace().getDashSprites()
        this.sounds.startCupheadDashSound()
    }

    updateState() {
        if(this.cuphead.GAME.stop == true) return;
        // console.log("ini position x :",this.cuphead.transform.position.x,"ini width canvas :", this.cuphead.sprite[this.cuphead.tick].width);
        if(this.cuphead.tick >= this.cuphead.sprite.length -1){
            // console.log("masuk ke idle");
            this.cuphead.controller.dash = false
            // console.log("ini udah false",this.cuphead.controller.dash );
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            
        }
    }

    frontRender(){
        const currentSprite =  this.cuphead.sprite[this.cuphead.tick]
        const currentStaticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.transform.realPosition.x = 0;
        this.cuphead.transform.realPosition.y = 0;
        this.cuphead.transform.size.sizeW = 0;
        this.cuphead.transform.size.sizeH = 0;
        this.cuphead.GAME.ctx.drawImage(
            currentSprite,
            this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width,
            this.cuphead.transform.position.y,currentSprite.width,
            currentSprite.height)
        const ctx = this.cuphead.GAME.ctx;
        
        // Draw a rectangle around the character (adjust dimensions as needed)
        ctx.beginPath();
        ctx.strokeStyle = 'red'; // Set the stroke color
        ctx.lineWidth = 2; // Set the line width 
        ctx.rect(
            this.cuphead.transform.position.x - currentSprite.width + currentStaticIdleSprite[0].width,
            this.cuphead.transform.position.y,currentSprite.width,
            currentSprite.height
        );
        ctx.stroke();
    }

    backRender() {
        const currentSprite = this.cuphead.sprite[this.cuphead.tick];
        const staticIdleSprite = CupheadSprites.getInstace().getIdle();
        const ctx = this.cuphead.GAME.ctx;
        this.cuphead.transform.realPosition.x = 0;
        this.cuphead.transform.realPosition.y = 0;
        this.cuphead.transform.size.sizeW = 0;
        this.cuphead.transform.size.sizeH = 0;
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
        // const rectWidth = currentSprite.width;
        // const rectHeight = currentSprite.height;
        
        // // Draw a rectangle around the character (adjust dimensions as needed)
        // ctx.beginPath();
        // ctx.strokeStyle = 'red'; // Set the stroke color
        // ctx.lineWidth = 2; // Set the line width 
        // ctx.rect(
        //     -(currentSprite.width/2),   // Adjusted this line
        //     -rectHeight / 2,
        //     rectWidth,
        //     rectHeight
        // );
        // ctx.stroke();
        ctx.restore();
    }

    /**
     * @override from cuphead wallCollision
     */
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
        this.cuphead.groundCollision()
        this.wallCollision()
    }
} 