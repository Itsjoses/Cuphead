import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "../cupheadState.js";
import { CupheadDashAirState } from "./cupheadDashAirState.js";
import { CupheadHitAirState } from "./cupheadHitAirState.js";
import { CupheadIdleState } from "./cupheadIdleState.js";
import { CupheadRunShotStraightState } from "./cupheadRunShotStraightState.js";
import { CupheadShotStraightState } from "./cupheadShotStraightState.js";

export class CupheadJumpState extends CupheadState {
    constructor(cuphead) {
        super(cuphead)
        this.cuphead.tick = 0
        this.cuphead.spriteInterval = 0
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.jump
        this.cuphead.sprite = CupheadSprites.getInstace().getJumpSprites()
    }

    updateState() {
        const cupheadController = this.cuphead.controller
        if(cupheadController.hit == "hit"){
            cupheadController.delayHit = true
            this.cuphead.delayHitTime = Date.now();
            this.cuphead.currentState = new CupheadHitAirState(this.cuphead)
        }

        if(cupheadController.dash == true ){
            this.cuphead.tick = 0
            this.cuphead.currentState = new CupheadDashAirState(this.cuphead,this.cuphead.transform.position.y + this.cuphead.sprite[this.cuphead.tick].height)
        }
        if(cupheadController.jump == false){
            this.cuphead.tick = 0
            if(cupheadController.left || cupheadController.right){
                if(cupheadController.shot == true)this.cuphead.currentState = new CupheadRunShotStraightState(this.cuphead)
                this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
            }
            if(cupheadController.shot == true)this.cuphead.currentState = new CupheadShotStraightState(this.cuphead)
            this.cuphead.currentState = new CupheadIdleState(this.cuphead)
            
        }
    }

    frontRender(currentSprite){
        // console.log(this.cuphead.sprite);
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.drawImage(
            currentSprite,
            this.cuphead.transform.position.x,
            this.cuphead.transform.position.y,
            currentSprite.width,
            currentSprite.height)

        if(this.cuphead.controller.shot == true){
            this.cuphead.shootBullet(this.cuphead.transform.position.x + currentSprite.width, this.cuphead.transform.position.y + currentSprite.height/2,0,0) 
        }
    }
    backRender(currentSprite){
        const staticIdleSprite = CupheadSprites.getInstace().getIdle()
        this.cuphead.GAME.ctx.save()
        this.cuphead.transform.realPosition.x = this.cuphead.transform.position.x;
        this.cuphead.transform.realPosition.y = this.cuphead.transform.position.y;
        this.cuphead.transform.size.sizeW = currentSprite.width;
        this.cuphead.transform.size.sizeH = currentSprite.height;
        this.cuphead.GAME.ctx.translate(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2)
        this.cuphead.GAME.ctx.scale(-1,1)  
        this.cuphead.GAME.ctx.drawImage(currentSprite,-staticIdleSprite[0].width/2,-currentSprite.height / 2,currentSprite.width,currentSprite.height)
        this.cuphead.GAME.ctx.restore()
        if(this.cuphead.controller.shot == true){
            this.cuphead.shootBullet(this.cuphead.transform.position.x + staticIdleSprite[0].width/2,this.cuphead.transform.position.y  + currentSprite.height/2,-staticIdleSprite[0].width/2 + currentSprite.width,-currentSprite.height / 2 + currentSprite.height/2) 
        }
    }

    updateFrame(){
        const currentSprite = this.cuphead.sprite[this.cuphead.tick]
        if(this.cuphead.orientation == false) this.frontRender(currentSprite)
        else this.backRender(currentSprite)
    }

    update() {
        this.cuphead.groundCollision()
        this.updateFrame()
        this.updateTransform()
        this.cuphead.changeSprite()
        this.cuphead.wallCollision()
        this.updateState()
    }
} 