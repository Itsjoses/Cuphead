import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { CupheadIdleState } from "../design-pattern/state/cuphead/all-state/cupheadIdleState.js";
import { CupheadIntroState } from "../design-pattern/state/cuphead/all-state/cupheadIntroState.js";
import { BACKGROUD_CONF } from "../settings/backgroundSettings.js";
import { BULLET_CONF } from "../settings/bulletSettings.js";
import { GameSetting } from "../settings/gameSettings.js";
import { Die } from "./background/screen/dieScreen.js";
import { Character } from "./character.js";
import { CupheadBulletLoop } from "./cupheadBulletLoop.js";
import { CupheadBulletSpawn } from "./cupheadBulletSpawn.js";
export class CupHead extends Character{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.currentState = new CupheadIntroState(this)
        this.lastBulletSpawnTime = 0; // Initialize the last bullet spawn time
        this.bulletSpawnInterval = GameSetting.CUPHEADBULLETSPAWN; // Set the desired interval in milliseconds (1 second in this example)
        this.delayHitTime = Date.now(); // Initialize the last bullet spawn time
        this.delayHitInterval = 3000; // Set the desired interval in milliseconds (1 second in this example)
        this.hp = 3
        this.dead = false
        this.invincible = false
        this.invincibleTime = 0
        this.invincibleTimeInterval = 3000
    }

    delayHitReset(){
        if(this.controller.hit == "delay"){
            const currentTime = Date.now();
            if (currentTime - this.delayHitTime >= this.delayHitInterval) {
                this.controller.hit = "idle"
                this.delayHitTime = currentTime;
            }
        }
    }

    changePhase(){
        if(this.hp <= 0){
            if( this.dead == false){
                this.GAME.sound.disableAllSong()
                this.GAME.sound.startCupheadDeathSound()
                this.dead = true
                this.GAME.stop = true
                this.GAME.screen.push(new Die(0,0,1,BACKGROUD_CONF))
            }
        }
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick]
        this.GAME.ctx.drawImage(currentSprite,this.transform.position.x - currentSprite.width,this.transform.position.y,currentSprite.width,currentSprite.height)
    }

    updateState(){
        if(this.controller.right == true) this.transform.position.x += this.transform.velocity.x*this.GAME.delta
        else if(this.controller.left == true) this.transform.position.x -= this.transform.velocity.x*this.GAME.delta
    }

    shootBullet(bulletX,bulletY,orientationX,orientationY){
        const currentSprite =  this.sprite[this.tick]
            const currentTime = Date.now();
            if (currentTime - this.lastBulletSpawnTime >= this.bulletSpawnInterval) {
                // Spawn a new bullet
                this.GAME.bulletSpawns.push(new CupheadBulletSpawn(bulletX, bulletY - 15, 0, 0, 1, BULLET_CONF,orientationX,orientationY));
                this.GAME.bulletLoops.push(new CupheadBulletLoop(bulletX, bulletY, 0, 0, 1, BULLET_CONF,orientationX,orientationY));
                // Update the last bullet spawn time
                this.lastBulletSpawnTime = currentTime;
            }
    }

    update(){
        this.currentState.update()
    }

    invincibleDelay(){
        if(this.invincible == true){
            const currentTime = Date.now();
            if (currentTime - this.invincibleTime >= this.invincibleTimeInterval) {
                this.invincible = false
            }
        }
    }

    invincibleToggle(){
        this.invincibleTime = new Date()
        this.invincible = true
    }
}