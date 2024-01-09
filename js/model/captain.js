import { CaptainIdleOctoState } from "../design-pattern/state/captain/all-state/captainIdleOctoState.js";
import { CaptainIdleState } from "../design-pattern/state/captain/all-state/captainIdleState.js";
import { CaptainLaughState } from "../design-pattern/state/captain/all-state/captainLaughState.js";
import { CaptainPickOctoState } from "../design-pattern/state/captain/all-state/captainPickOctoState.js";
import { CaptainPutOctoState } from "../design-pattern/state/captain/all-state/captainPutOctoState.js";
import { CaptainShootOctoState } from "../design-pattern/state/captain/all-state/captainShootOcto.state.js";
import { Character } from "./character.js";


export class Captain extends Character{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.currentState = new CaptainShootOctoState(this)
    }

    groundCollision(){

        this.transform.velocity.y += 10 * this.GAME.delta
        this.transform.position.y += this.transform.velocity.y
        if(this.transform.position.y  > 475 - this.sprite[this.tick].height){
            this.transform.position.y = 475 -  this.sprite[this.tick].height
        } 
        else this.transform.position.y = this.transform.position.y
    }

    update(){
        // console.log(this.hp);
        this.currentState.update()
    }
}