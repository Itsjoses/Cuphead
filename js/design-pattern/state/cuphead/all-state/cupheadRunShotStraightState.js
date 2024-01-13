import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadDashState } from "./cupheadDashState.js";
import { CupheadHitGroundState } from "./cupheadHitGroundState.js";
import { CupheadJumpState } from "./cupheadJumpState.js";
import { CupheadRunState } from "./cupheadRunState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadRunShotStraightState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.runShotStraight
        this.cuphead.sprite = CupheadSprites.getInstace().getRunShotStraight()
        this.lastBulletSpawnTime = 0; // Initialize the last bullet spawn time
        this.bulletSpawnInterval = 200; // Set the desired interval in milliseconds (1 second in this example)
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        if(cupheadController.shot == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadRunState(this.cuphead)
        }
        if(cupheadController.left == false && cupheadController.right == false){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
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

    frontRender(currentSprite){
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.drawImage(currentSprite,this.cuphead.transform.position.x,this.cuphead.transform.position.y,currentSprite.width,currentSprite.height)
        this.cuphead.shootBullet(this.cuphead.transform.position.x + currentSprite.width,this.cuphead.transform.position.y + currentSprite.height/2.2,0,0) 
    }
    backRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getRunShotStraight()
        this.cuphead.GAME.ctx.save()
        this.cuphead.GAME.ctx.translate(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2)
        this.cuphead.GAME.ctx.scale(-1,1)  
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.drawImage(currentSprite,-staticIdleSprite[0].width/2,-currentSprite.height / 2,currentSprite.width,currentSprite.height)
        this.cuphead.shootBullet(
            this.cuphead.transform.position.x + staticIdleSprite[0].width/2,
            this.cuphead.transform.position.y  + currentSprite.height/2,
            -staticIdleSprite[0].width/2 + currentSprite.width,
            -currentSprite.height / 2 + currentSprite.height/2.2) 
        this.cuphead.GAME.ctx.restore()
    }

    updateFrame(){
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

    update(){
        this.updateFrame()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.cuphead.wallCollision()
        this.updateState()
    }
} 