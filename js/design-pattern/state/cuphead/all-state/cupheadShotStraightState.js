import { CupheadBulletLoop } from "../../../../model/cupheadBulletLoop.js";
import { BULLET_CONF } from "../../../../settings/bulletSettings.js";
import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import {  CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";

export class CupheadShotStraightState extends CupheadState{
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.shotStraight
        this.cuphead.sprite = CupheadSprites.getInstace().getShotStraight()
        this.lastBulletSpawnTime = 0; // Initialize the last bullet spawn time
        this.bulletSpawnInterval = 200; // Set the desired interval in milliseconds (1 second in this example)
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
        }
        if(cupheadController.left == true || cupheadController.right == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
        }
        if(cupheadController.crouch == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadCrouchState(this.cuphead)
        }
        if(cupheadController.jump == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadJumpState(this.cuphead)
        }
    }

    /**
     * @override from updateFrame cuphead
     */

    frontRender(currentSprite){
        // console.log(this.cuphead.sprite);

        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
        const ctx = this.cuphead.GAME.ctx;
        // Draw a rectangle around the character (adjust dimensions as needed)
        ctx.beginPath();
        ctx.strokeStyle = 'red'; // Set the stroke color
        ctx.lineWidth = 2; // Set the line width 
        ctx.rect(
            this.cuphead.transform.position.x + currentSprite.width,
            this.cuphead.transform.position.y + currentSprite.height/2.4,
            30,
            30
        );
        ctx.stroke();
            // Check if enough time has passed since the last bullet spawn
            const currentTime = Date.now();
            if (currentTime - this.lastBulletSpawnTime >= this.bulletSpawnInterval) {
                // Spawn a new bullet
                this.cuphead.GAME.bulletRender.push(new CupheadBulletLoop(this.cuphead.transform.position.x + currentSprite.width, this.cuphead.transform.position.y + currentSprite.height / 2.7, 0, 0, 1, BULLET_CONF));
                // Update the last bullet spawn time
                this.lastBulletSpawnTime = currentTime;
            }
    }
    backRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.save()
        this.cuphead.GAME.ctx.translate(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2)
        this.cuphead.GAME.ctx.scale(-1,1)  
        this.cuphead.GAME.ctx.drawImage(currentSprite,-staticIdleSprite[0].width/2,-currentSprite.height / 2,currentSprite.width,currentSprite.height)
        const ctx = this.cuphead.GAME.ctx;
        ctx.beginPath();
        ctx.strokeStyle = 'red'; // Set the stroke color
        ctx.lineWidth = 2; // Set the line width 
        ctx.rect(
            -staticIdleSprite[0].width/2 + currentSprite.width,
            -currentSprite.height / 2 + currentSprite.height/2.4,
            30,
            30
        );
        ctx.stroke();
        this.cuphead.GAME.ctx.restore()
    }

    updateFrame(){
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]
        if(this.cuphead.orientation == false) this.frontRender(currentSprite)
        else this.backRender(currentSprite)

    }
    update() {
        this.updateFrame()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateState()
    }
} 