import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { CupheadIdleState } from "../design-pattern/state/cuphead/all-state/cupheadIdleState.js";
import { CupheadIntroState } from "../design-pattern/state/cuphead/all-state/cupheadIntroState.js";
import { BULLET_CONF } from "../settings/bulletSettings.js";
import { GameSetting } from "../settings/gameSettings.js";
import { Character } from "./character.js";
import { CupheadBulletLoop } from "./cupheadBulletLoop.js";
import { CupheadBulletSpawn } from "./cupheadBulletSpawn.js";
export class CupHead extends Character{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.currentState = new CupheadIdleState(this)
        this.lastBulletSpawnTime = 0; // Initialize the last bullet spawn time
        this.bulletSpawnInterval = GameSetting.CUPHEADBULLETSPAWN; // Set the desired interval in milliseconds (1 second in this example)
        this.delayHitTime = Date.now(); // Initialize the last bullet spawn time
        this.delayHitInterval = 3000; // Set the desired interval in milliseconds (1 second in this example)
    }

    delayHitReset(){
        console.log();
        if(this.controller.hit == "delay"){
            const currentTime = Date.now();
            if (currentTime - this.delayHitTime >= this.delayHitInterval) {
                this.controller.hit = "idle"
                this.delayHitTime = currentTime;
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
}