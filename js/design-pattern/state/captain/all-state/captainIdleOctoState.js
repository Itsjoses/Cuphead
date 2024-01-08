import { CaptainSprites } from "../../../singleton/captainSprite.js"
import { CaptainState } from "../captainState.js"
import { CaptainPutOctoState } from "./captainPutOctoState.js"
import { CaptainShootOctoState } from "./captainShootOcto.state.js"

export class CaptainIdleOctoState extends CaptainState {
    constructor(captain) {
        super(captain)
        this.captain.tick = 0
        this.captain.spriteInterval = 0
        this.captain.CURR_CHAR_CONF = this.captain.CHAR_CONF.idleOcto
        this.captain.sprite = CaptainSprites.getInstance().idleOctoCaptain
        this.captain.topSprite = CaptainSprites.getInstance().idleOctoTopCaptain
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
                x: 0,
                y: 0
            },
            8: {
                x: 0,
                y: 0
            },
            9: {
                x: 0,
                y: 0
            },
            10: {
                x: 0,
                y: 0
            },
            11: {
                x: 0,
                y: 0
            },
            12: {
                x: 0,
                y: 0
            },
            13: {
                x: 0,
                y: 0
            },
            14: {
                x: 20,
                y: 0
            },
            15: {
                x: 32,
                y: 0
            },
            16: {
                x: 38,
                y: 0
            },
            17: {
                x: 44,
                y: 0
            },
            18: {
                x: 60,
                y: 0
            },
            19: {
                x: 64,
                y: 0
            },
            20: {
                x: 84,
                y: 0
            }
        }
    }

    updateState() {
        if(this.captain.tick >= this.captain.sprite.length - 1){
            if( Math.random() * 100 <= 1){
                this.captain.currentState = new CaptainPutOctoState(this.captain)
            }else if(Math.random() * 100 <= 10){
                this.captain.currentState = new CaptainShootOctoState(this.captain)
            }
            
        }
    }

    updateFrame() {
        const currentSprite = this.captain.sprite[this.captain.tick]
        this.captain.transform.size.sizeW = currentSprite.width * this.captain.transform.scale
        this.captain.transform.size.sizeH = currentSprite.height * this.captain.transform.scale
        this.captain.transform.realPosition.x = this.captain.transform.position.x - currentSprite.width / 1.2
        this.captain.transform.realPosition.y = this.captain.transform.position.y + this.captain.GAME.waveHeight - currentSprite.height
        
        this.captain.GAME.ctx.drawImage(currentSprite,
            this.captain.transform.realPosition.x,
            this.captain.transform.realPosition.y,
            this.captain.transform.size.sizeW,
            this.captain.transform.size.sizeH)


        
    }

    updateTopFrame(){
        const currentSprite = this.captain.sprite[this.captain.tick]
        const currentTopSprite = this.captain.topSprite[this.captain.tick]
        this.captain.GAME.ctx.drawImage(currentTopSprite,
            this.captain.transform.position.x - currentTopSprite.width / 1.2,
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