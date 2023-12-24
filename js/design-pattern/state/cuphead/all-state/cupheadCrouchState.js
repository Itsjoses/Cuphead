import { CupheadSprites } from "../../../singleton/cupheadSprite.js";
import { CupheadState } from "./../cupheadState.js";

export class CupheadCrouchState extends CupheadState{
    constructor(cuphead){
        super(cuphead)
        this.cuphead.CURR_CHAR_CONF = this.cuphead.CHAR_CONF.crouchNormal
        this.cuphead.sprite = CupheadSprites.getInstace().getDuckNormalSpritest()
    }

    updateState(){
        const cupheadController = this.cuphead.controller
        console.log(this.cuphead.tick);

        if(cupheadController.crouch == false){
            if(cupheadController.crouch == false){
                
            }
        }
        
        if(this.cuphead.tick >= this.cuphead.sprite.length - 1 && this.cuphead.sprite == CupheadSprites.getInstace().getDuckNormalSpritest() ){
            if(this.cuphead.sprite == CupheadSprites.getInstace().getDuckNormalSpritest()){
                this.cuphead.sprite = CupheadSprites.getInstace().getDuckIdleSprites()
            }
        }
    }

    update(){
        this.updateState()
        this.cuphead.changeSprite()
        this.cuphead.groundCollision()
        this.updateFrame()
    }
} 