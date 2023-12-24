import { GameObject } from "../parent/gameObject.js"
import { GAME } from "../game.js";
import { GameSetting } from "../settings/gameSettings.js";

export class Character extends GameObject{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale = 1,CHAR_CONF)
        this.controller = {
            left: false,
            right: false,
            shot: false,
            jump: false,
            crouch: false,
            dash: false
        }
    }

    groundCollision(){
        this.transform.velocity.y += GameSetting.GRAVITY * this.GAME.delta
        this.transform.position.y += this.transform.velocity.y
        if(this.transform.position.y  >= GameSetting.GROUND - this.sprite[this.tick].height){
            this.transform.position.y = GameSetting.GROUND -  this.sprite[this.tick].height
        } 
        else this.transform.position.y = this.transform.position.y
    }


}