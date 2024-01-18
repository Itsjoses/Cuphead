import { CupheadBulletLoop } from "../../../../model/cupheadBulletLoop.js";
import { BULLET_CONF } from "../../../../settings/bulletSettings.js";
import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadCrouchState } from "./cupheadCrouchState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadHitGroundState } from "./cupheadHitGroundState.js";
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
        if(this.cuphead.GAME.stop == true) return;
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
        if(cupheadController.dash == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadDashState(this.cuphead)
        }
        if(cupheadController.hit == "hit"){
            cupheadController.delayHit = true
            this.cuphead.delayHitTime = Date.now();
            this.cuphead.currentState = new CupheadHitGroundState(this.cuphead)
        }
    }

    /**
     * @override from updateFrame cuphead
     */

    frontRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getShotStraight()
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
   
    }
    backRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getShotStraight()
        this.cuphead.GAME.ctx.save()
        this.cuphead.GAME.ctx.translate(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2)
        this.cuphead.GAME.ctx.scale(-1,1)
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;  
        this.cuphead.GAME.ctx.drawImage(currentSprite,-staticIdleSprite[0].width/2,-currentSprite.height / 2,currentSprite.width,currentSprite.height)
        this.cuphead.GAME.ctx.restore()
    }

    updateFrame(){
        this.cuphead.invincibleDelay()
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]

        if(this.cuphead.controller.hit == "hit" || this.cuphead.controller.hit == "delay" ) this.hitSprite = 2
        else this.hitSprite = 0

        if(this.hitSprite == 0){
            if(this.cuphead.orientation == false) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
        }else{
            if(this.cuphead.tick % this.hitSprite == 0){
                if(this.cuphead.orientation == false) this.frontRender(currentSprite)
                else this.backRender(currentSprite)
            }
        }


    }

    shot(){
        if(this.cuphead.GAME.stop == true) return;
        const staticIdleSprite = CupheadSprites.getInstace().getShotStraight()
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]
        if(this.cuphead.orientation == false){
            this.cuphead.shootBullet(this.cuphead.transform.position.x + staticIdleSprite[0].width,this.cuphead.transform.position.y + staticIdleSprite[0].height/2.4,0,0)  
        }else if (this.cuphead.orientation == true){
            this.cuphead.shootBullet(
                this.cuphead.transform.position.x + staticIdleSprite[0].width/2 ,
            this.cuphead.transform.position.y  + staticIdleSprite[0].height/2,
            -staticIdleSprite[0].width/2 + staticIdleSprite[0].width,
            -staticIdleSprite[0].height / 2 + staticIdleSprite[0].height/2.4) 
        }
    }

    update() {
        this.updateFrame()
        this.shot()
        this.cupheadLoopSound()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateState()
    }
} 