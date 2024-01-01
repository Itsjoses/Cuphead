import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { CupheadIdleState } from "../design-pattern/state/cuphead/all-state/cupheadIdleState.js";
import { CupheadIntroState } from "../design-pattern/state/cuphead/all-state/cupheadIntroState.js";
import { Character } from "./character.js";
export class CupHead extends Character{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        // this.transform.velocity.x = 400
        this.currentState = new CupheadIdleState(this)
    }

    updateFrame(){
        const currentSprite =  this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x - currentSprite.width,this.transform.position.y,currentSprite.width,currentSprite.height)
    }

    updateState(){
        if(this.controller.right == true) this.transform.position.x += this.transform.velocity.x*this.GAME.delta
        else if(this.controller.left == true) this.transform.position.x -= this.transform.velocity.x*this.GAME.delta
    }

    update(){
        this.currentState.update()
    }
}