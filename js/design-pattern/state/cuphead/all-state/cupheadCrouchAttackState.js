import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";
import { CupheadCrouchIdleState } from "./cupheadCrouchIdleState.js";
import { CupheadCrouchStandupState } from "./cupheadCrouchStandupState.js";
import { CupheadHitGroundState } from "./cupheadHitGroundState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";

export class CupheadCrouchAttackState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchAttack
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckShootSprites()
        this.lastBulletSpawnTime = 0; // Initialize the last bullet spawn time
        this.bulletSpawnInterval = 200; // Set the desired interval in milliseconds (1 second in this example)
    }

    updateState(){
        const cupheadController = this.cuphead.controller

        if(cupheadController.shot == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadCrouchIdleState(this.cuphead)
        }
        if(cupheadController.crouch == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadCrouchStandupState(this.cuphead)
        }
        if(cupheadController.jump == true){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadJumpState(this.cuphead)
        }
        if(cupheadController.hit == "hit"){
            cupheadController.delayHit = true
            this.cuphead.delayHitTime = Date.now();
            this.cuphead.currentState = new CupheadHitGroundState(this.cuphead)
        }
    }

    frontRender(currentSprite){
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.realPosition.x,this.cuphead.transform.realPosition.y,this.cuphead.transform.size.sizeW,this.cuphead.transform.size.sizeH)
        this.cuphead.shootBullet(this.cuphead.transform.position.x + currentSprite.width, this.cuphead.transform.position.y + currentSprite.height/4,0,0) 
    }
    backRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.save()
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;

        this.cuphead.GAME.ctx.translate(
            this.cuphead.transform.realPosition.x + staticIdleSprite[0].width / 2,
            this.cuphead.transform.realPosition.y + this.cuphead.transform.size.sizeH / 2
        );

        this.cuphead.GAME.ctx.scale(-1,1)  
        this.cuphead.GAME.ctx.drawImage(
            currentSprite,
            -staticIdleSprite[0].width / 2,
            -this.cuphead.transform.size.sizeH / 2,
            currentSprite.width,
            currentSprite.height
        );
        this.cuphead.shootBullet(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2,-staticIdleSprite[0].width/2 + currentSprite.width,-currentSprite.height / 2 + currentSprite.height/4) 
        this.cuphead.GAME.ctx.restore()
    }

    updateFrame(){
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]
        if(this.cuphead.orientation == false) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
    }

    update(){
        this.updateFrame()
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
    }
} 