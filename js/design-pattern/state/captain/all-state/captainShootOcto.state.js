import { CaptainSprites } from "../../../singleton/captainSprite.js"
import { CaptainState } from "../captainState.js"
import { CaptainIdleOctoState } from "./captainIdleOctoState.js"

export class CaptainShootOctoState extends CaptainState {
    constructor(captain) {
        super(captain)
        this.captain.tick = 0
        this.captain.spriteInterval = 0
        this.captain.CURR_CHAR_CONF = this.captain.CHAR_CONF.shootOcto
        this.captain.sprite = CaptainSprites.getInstance().shootOctoCaptain
        this.captain.topSprite = CaptainSprites.getInstance().shootOctoTopCaptain
        this.spriteBoundry = {
            0: {
                x: 0,
                y: 0
            },
            1: {
                x: 0,
                y: 0
            },
            2: {
                x: 0,
                y: 0
            },
            3: {
                x: 20,
                y: 0
            },
            4: {
                x: 32,
                y: 0
            },
            5: {
                x: 38,
                y: 0
            },
            6: {
                x: 44,
                y: 0
            },
            7: {
                x: 60,
                y: 0
            },
            8: {
                x: 64,
                y: 0
            },
            9: {
                x: 72,
                y: 0
            }
        }
    }

    updateState() {
        if(this.captain.tick >= this.captain.sprite.length - 1){
            this.captain.currentState = new CaptainIdleOctoState(this.captain)
        }
    }

    updateFrame() {
        const currentSprite = this.captain.sprite[this.captain.tick]
     
        console.log(this.captain.tick, this.captain.transform.position.x - currentSprite.width);
        this.captain.GAME.ctx.drawImage(currentSprite,
            this.captain.transform.position.x - currentSprite.width / 1.2 + this.spriteBoundry[this.captain.tick].x,
            this.captain.transform.position.y + this.captain.GAME.waveHeight - currentSprite.height,
            currentSprite.width * this.captain.transform.scale,
            currentSprite.height * this.captain.transform.scale)
    }

    updateTopFrame(){
        const currentSprite = this.captain.sprite[this.captain.tick]
        const currentTopSprite = this.captain.topSprite[this.captain.tick]
        this.captain.GAME.ctx.drawImage(currentTopSprite,
            this.captain.transform.position.x - currentTopSprite.width / 1.2 + this.spriteBoundry[this.captain.tick].x,
            this.captain.transform.position.y + this.captain.GAME.waveHeight - currentSprite.height,
            currentTopSprite.width * this.captain.transform.scale,
            currentTopSprite.height * this.captain.transform.scale)
    }

    update() {
        this.updateFrame()
        /**
         * need call like this so the frame can be stack
         */
        this.captain.GAME.boss.mainShip.update()
        this.updateTopFrame()
        this.captain.changeSprite()
        this.updateState()
    }
} 