import { GameObject } from "../parent/gameObject.js"
import { GAME } from "../game.js";
import { GameSetting } from "../settings/gameSettings.js";

export class Character extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.orientation = false
        this.hp = 100
        this.controller = {
            left: false,
            right: false,
            shot: false,
            jump: false,
            crouch: false,
            dash: false,
            hit: "idle",
        }
    }

    jump(){
        if(this.controller.jump == false && this.controller.dash == false){
            this.transform.velocity.y = GameSetting.JUMP * this.GAME.delta
            this.controller.jump = true
        }
    }

    dash(){
        if(this.controller.crouch != true && this.controller.dash != true){
            this.controller.dash = true
        }
    }

    groundCollision(){
        if(this.GAME.stop == true) return;
        this.transform.velocity.y += GameSetting.GRAVITY * this.GAME.delta
        this.transform.position.y += this.transform.velocity.y
        if(this.transform.position.y  > GameSetting.GROUND - this.sprite[this.tick].height){
            this.transform.position.y = GameSetting.GROUND -  this.sprite[this.tick].height
            this.controller.jump = false
        } 
        else this.transform.position.y = this.transform.position.y
        if(this.transform.velocity.y <= 0) this.controller.jump = true
    }

    wallCollision(){
        if(this.GAME.stop == true) return;
        if(this.transform.position.x + this.sprite[this.tick].width >= 874){
            this.transform.position.x = 874 - this.sprite[this.tick].width
        }
        if(this.transform.position.x <= 0){
            this.transform.position.x = 0
        }
    }


}