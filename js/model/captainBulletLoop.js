import { BulletSprite } from "../design-pattern/singleton/bulletSprite.js"
import { CupheadSprites } from "../design-pattern/singleton/cupheadSprite.js";
import { GameObject } from "../parent/gameObject.js"
import { GameSetting } from "../settings/gameSettings.js";

export class CaptainBulletLoop extends GameObject{
    constructor(x,y,w,h,scale,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BulletSprite.getInstance().captainBulletLoop
        this.CURR_CHAR_CONF = CHAR_CONF.cupheadLoop
        this.tick = 0
        this.spriteInterval = 0
        this.speed = GameSetting.CAPTAINBULLETSPEED * this.GAME.delta
        this.angle = 0
        this.target = {}
        this.getAngle()
    }

    getAngle(){
        const target={
            x: this.GAME.cuphead.transform.realPosition.x ,
            y: this.GAME.cuphead.transform.realPosition.y ,
            w: this.GAME.cuphead.transform.size.sizeW,
            h: this.GAME.cuphead.transform.size.sizeH
        }
        const deltaX = (this.transform.position.x + this.sprite[0].width /2) - (target.x + target.w/2);
        const deltaY = (this.transform.position.y + this.sprite[0].height /2) - (target.y + target.h/2);
    
        // Menggunakan atan2 untuk menghitung sudut rotasi
        this.angle = Math.atan2(deltaY, deltaX);
    }

    rectangleCircleCollision() {
        this.target={
            x: this.GAME.cuphead.transform.realPosition.x ,
            y: this.GAME.cuphead.transform.realPosition.y ,
            w: this.GAME.cuphead.transform.size.sizeW,
            h: this.GAME.cuphead.transform.size.sizeH
        } 
        // Convert the circle position to the rectangle's local coordinates
        const circleLocalX = (this.transform.position.x - 10) - (this.target.x + this.target.w / 2);
        const circleLocalY = this.transform.position.y - (this.target.y + this.target.h / 2);
    
        // Rotate the circle back to the rectangle's orientation
        const rotatedX = circleLocalX * Math.cos(this.angle) - circleLocalY * Math.sin(this.angle);
        const rotatedY = circleLocalX * Math.sin(this.angle) + circleLocalY * Math.cos(this.angle);
    
        // Closest point in the rectangle to the circle
        let closestX = Math.max(-this.target.w / 2, Math.min(rotatedX, this.target.w / 2));
        let closestY = Math.max(-this.target.h / 2, Math.min(rotatedY, this.target.h / 2));
    
        // Check if the distance between the circle and the closest point in the rectangle is less than the circle's radius
        const distanceX = rotatedX - closestX;
        const distanceY = rotatedY - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    
        return distanceSquared <= 15 * 15; // Adjust the radius as needed
    }

    updateFrame(){
        const currentSprite = this.sprite[this.tick];
        this.transform.realPosition.x = this.transform.position.x;
        this.transform.realPosition.y = this.transform.position.y;
        this.transform.size.sizeW = currentSprite.width * this.transform.scale;
        this.transform.size.sizeH = currentSprite.height * this.transform.scale;

        // Save the current state of the canvas
        this.GAME.ctx.save();
    
        // Translate to the center of the image
        this.GAME.ctx.translate(
            this.transform.realPosition.x,
            this.transform.realPosition.y
        );
    
        // Rotate only the sprite
        this.GAME.ctx.rotate(this.angle);
    
        // Draw the rotated image
        this.GAME.ctx.drawImage(
            currentSprite,
            -this.transform.size.sizeW / 2,
            -this.transform.size.sizeH / 2,
            this.transform.size.sizeW,
            this.transform.size.sizeH
        );
        this.GAME.ctx.beginPath();
        this.GAME.ctx.arc(-10, 0, 15, 0, 2 * Math.PI);
        this.GAME.ctx.strokeStyle = 'red';
        this.GAME.ctx.stroke();
    
        // Restore the canvas state to prevent affecting subsequent drawings
        this.GAME.ctx.restore();

    }

    transformBullet(){
        if(this.GAME.stop == true) return;
       this.transform.position.x -= this.speed * Math.cos(this.angle) 
       this.transform.position.y -= this.speed * Math.sin(this.angle) 
        
    }

    changeSprite(){
        if(this.GAME.stop == true) return;
        this.spriteInterval += 60* this.GAME.delta
        if (this.spriteInterval > this.CURR_CHAR_CONF.speed) {
            this.tick += 1;
            this.spriteInterval = 0;
          }
        if (this.tick >= this.sprite.length) this.tick = this.sprite.length - 1;
    }

    updateState(){
        if(this.Collision(this,this.GAME.boss.captain) && this.sprite == BulletSprite.getInstance().cupheadBulletLoop){
            this.GAME.boss.captain.hp -= 1
            this.tick = 0
            this.spriteInterval = 0
            this.sprite = BulletSprite.getInstance().cupheadBulletDie
            this.speed = 0
            this.CURR_CHAR_CONF = this.CHAR_CONF.cupheadDie
        }
    }

    removeBullet(){
        if(!(this.transform.position.x >= 0 &&
            this.transform.position.x <= GameSetting.WIDTH &&
            this.transform.position.y >= 0 &&
            this.transform.position.y <= GameSetting.HEIGHT)){
                this.GAME.removeBulletLoop(this);
            } 
    }


    update(){
        this.updateFrame()
        // this.updateState()
        this.transformBullet()
        this.changeSprite()
        this.removeBullet()
        if(this.rectangleCircleCollision() == true && this.GAME.cuphead.controller.hit == "idle" && this.GAME.cuphead.controller.dash == false && this.GAME.cuphead.invincible == false ){
            this.GAME.cuphead.controller.hit = "hit"
            this.GAME.cuphead.hp -= 1
        } 
    }
}