import { CaptainSprites } from "../../../singleton/captainSprite.js"
import { CaptainState } from "../captainState.js"
import { CaptainIdleState } from "./captainIdleState.js"

export class CaptainPutOctoState extends CaptainState {
    constructor(captain) {
        super(captain)
        this.captain.tick = 0
        this.captain.spriteInterval = 0
        this.captain.CURR_CHAR_CONF = this.captain.CHAR_CONF.putOcto
        this.captain.sprite = CaptainSprites.getInstance().putOctoCaptain
        this.captain.topSprite = CaptainSprites.getInstance().putOctoTopCaptain
        this.spriteBoundry = {
            0: {
                x: 30,
                y: 0
            },
            1: {
                x: 100,
                y: 0
            },
            2: {
                x: 35,
                y: 0
            },
            3: {
                x: 0,
                y: 0
            },
            4: {
                x: 0,
                y: 0
            },
            5: {
                x: 0,
                y: 0
            },
            6: {
                x: 0,
                y: 0
            },
            7: {
                x: -10,
                y: 0
            },
            8: {
                x: -20,
                y: 0
            },
            9: {
                x: -30,
                y: 0
            },
            10: {
                x: -35,
                y: 0
            },
            11: {
                x: -38,
                y: 0
            },
            12: {
                x: -40,
                y: 0
            }
        }
    }

    updateState() {
        if(this.captain.tick >= this.captain.sprite.length - 1){
            this.captain.currentState = new CaptainIdleState(this.captain)
        }
    }

    updateFrame() {
        const currentSprite = this.captain.sprite[this.captain.tick]
        this.captain.transform.size.sizeW = currentSprite.width * this.captain.transform.scale
        this.captain.transform.size.sizeH = currentSprite.height * this.captain.transform.scale

        this.captain.transform.realPosition.x = this.captain.transform.position.x - currentSprite.width / 1.2 + this.spriteBoundry[this.captain.tick].x
        this.captain.transform.realPosition.y = this.captain.transform.position.y + this.captain.GAME.waveHeight - currentSprite.height

        this.captain.GAME.ctx.drawImage(currentSprite,
            this.captain.transform.realPosition.x,
            this.captain.transform.realPosition.y,
            this.captain.transform.size.sizeW,
            this.captain.transform.size.sizeH)
    }

    updateTopFrame(){
        if(this.captain.tick <=7){

            const currentSprite = this.captain.sprite[this.captain.tick]
            const currentTopSprite = this.captain.topSprite[this.captain.tick]
            this.captain.GAME.ctx.drawImage(currentTopSprite,
                this.captain.transform.position.x - currentTopSprite.width / 1.2 + this.spriteBoundry[this.captain.tick].x,
                this.captain.transform.position.y + this.captain.GAME.waveHeight - currentSprite.height,
                currentTopSprite.width * this.captain.transform.scale,
                currentTopSprite.height * this.captain.transform.scale)
        }
    }

    update() {
        this.captain.changePhase()
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