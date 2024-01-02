import { GameSetting } from "./settings/gameSettings.js";
export class GAME {
    static GAMEINSTANCE = null;
    static getInstace = () => {
        if(this.GAMEINSTANCE == null){
            this.GAMEINSTANCE = new GAME()
        }
        return this.GAMEINSTANCE
    }

    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.delta = 0
        this.lastTime = new Date()
        this.tempInterval = 0
        this.tempFrameCounter = 0
        this.cuphead = null
        this.waterA = null
        this.waterB = null
        this.waterC = null
        this.waterD = null
        this.dockA = null
        this.dockB = null
        this.cloudA = null
        this.sail = null
        this.waveHeight = 0
        this.ebbtide = false
        this.bulletRender = []

    }

    stroke(){
        this.ctx.strokeStyle = "#cccccc"
        this.ctx.lineWidth = 5;
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(1280,0)
        this.ctx.moveTo(1280, 0);
        this.ctx.lineTo(1280,720)
        this.ctx.moveTo(1280, 720);
        this.ctx.lineTo(0,720)
        this.ctx.moveTo(0, 720);
        this.ctx.lineTo(0,0)
        this.ctx.stroke()
        this.ctx.closePath();
    }

    getDelta(){
        const currTime = new Date()
        const diffDelta = (currTime - this.lastTime) / 1000
        this.delta = diffDelta
        this.lastTime = currTime
    }

    async render(){
        this.ctx.clearRect(0, 0, GameSetting.WIDTH, GameSetting.HEIGHT);
        this.stroke()
        this.getDelta()
        this.cloudD.update()
        this.cloudC.update()
        this.cloudB.update()
        this.cloudA.update()
        this.waterD.update()
        this.waterC.update()
        this.waterB.update()
        this.dockA.update()
        this.cuphead.update()
        this.boss.update()
        this.dockB.update()
        if(this.bulletRender != []){
            this.bulletRender.forEach(bullet => {
                bullet.update()
            })
        }
        this.waterA.update()
        this.gameWave()
        requestAnimationFrame(this.render.bind(this))
    }

    gameWave(){
        if(this.ebbtide == false) this.waveHeight += (25 * this.delta)
        if(this.ebbtide == true) this.waveHeight -= (25 * this.delta) 
        if(this.waveHeight >= 50) this.ebbtide = true
        if(this.waveHeight <= 0) this.ebbtide = false
    }

}