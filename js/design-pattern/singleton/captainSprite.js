export class CaptainSprites {
    static CAPTAINSPRITES = null
    static getInstance(){
        if(this.CAPTAINSPRITES == null) this.CAPTAINSPRITES = new CaptainSprites()
        return this.CAPTAINSPRITES
    }

    constructor(){
        this.idleCaptain = []
    }


    loadImage(url) {
        return new Promise((resolve) => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.src = url;
        });
    }

    async spriteRender(path,totalSprites){
        let tempImage = new Image()
        let tempArraySprites = []
        for(let i = 0;i<totalSprites;i++){
            if(i+1 < 10)tempImage = await this.loadImage(`${path}0${i+1}.png`)
            else tempImage = await this.loadImage(`${path}${i+1}.png`)
            tempArraySprites.push(tempImage)
        }
        return tempArraySprites
    }

    async reverseSpriteRender(path,totalSprites){
        let tempImage = new Image()
        let tempArraySprites = []
        for(let i = totalSprites-1;i>=0;i++){
            if(i < 10)tempImage = await this.loadImage(`${path}0${i}.png`)
            else tempImage = await this.loadImage(`${path}${i}.png`)
            tempArraySprites.push(tempImage)
        }
        return tempArraySprites
    }

    async spriteSelectedRender(path,StartSprite,EndSprite){
        let tempImage = new Image()
        let tempArraySprites = []
        for(let i = StartSprite;i<=EndSprite;i++){
            if(i < 10)tempImage = await this.loadImage(`${path}0${i}.png`)
            else tempImage = await this.loadImage(`${path}${i}.png`)
            tempArraySprites.push(tempImage)
        }
        return tempArraySprites
    }

    async idleCaptainRender(){
        this.idleCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Idle/pirate_idle_00",7)
    }

    async knockoutCaptainRender(){
        this.knockoutCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Knockout/pirate_knockout_00",16)
    }

    async laughCaptainRender(){
        this.laughCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Laugh/pirate_laugh_00",14)
    }

    async pickOctoCaptainRender(){
        this.pickOctoCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Pick up octopus/pirate_peaPickup_00",21)
    }

    async putOctoCaptainRender(){
        this.putOctoCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Put octopus down/pirate_peaPutDown_00",13)
    }

    async shootOctoCaptainRender(){
        this.shootOctoCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Shoot/pirate_peaShot_00",10)
    }

    async deathCaptainRender(){
        this.deathCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Death/Death/pirate_death_00",4)
    }
 
    async pickOctoTopCaptainRender(){
        this.pickOctoTopCaptain = await this.spriteSelectedRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Pick up octopus (Top)/pirate_peaPickup_00",17,21)
    }

    async putOctoTopCaptainRender(){
        this.putOctoTopCaptain = await this.spriteSelectedRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Put octopus down (Top)/pirate_peaPutDown_T_00",1,8)
    }

    async ShootOctoTopCaptainRender(){
        this.shootOctoTopCaptain = await this.spriteSelectedRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Shoot (Top)/pirate_peaShot_T_00",1,10)
    }

    async idleOctoCaptainRender(){
        this.idleOctoCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Idle (With octopus)/pirate_peaIdle_00",5)
    }

    async idleOctoTopCaptainRender(){
        this.idleOctoTopCaptain = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/Idle (With octopus, Top)/pirate_peaIdle_T_00",5)
    }

    async renderAllSprites(){
        await this.idleCaptainRender()
        await this.knockoutCaptainRender()
        await this.laughCaptainRender()
        await this.pickOctoCaptainRender()
        await this.putOctoCaptainRender()
        await this.shootOctoCaptainRender()
        await this.deathCaptainRender()
        await this.pickOctoTopCaptainRender()
        await this.putOctoTopCaptainRender()
        await this.ShootOctoTopCaptainRender()
        await this.idleOctoCaptainRender()
        await this.idleOctoTopCaptainRender()
    }
}