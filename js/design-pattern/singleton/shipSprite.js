export class ShipSprites{
    static CAPTAINSPRITES = null
    static getInstance(){
        if(this.CAPTAINSPRITES == null) this.CAPTAINSPRITES = new ShipSprites()
        return this.CAPTAINSPRITES
    }

    constructor(){
        this.railShip = []
        this.sailShip = []
        this.mastShip
        this.blinkShip = []
        this.idleShip = []
        this.spitsShip = []
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

    
    async railRender(){
        this.railShip = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Ship]/Phase 1-3/[Ship parts]/Rail/pirate_boatRail_00",3)
    }

    async sailRender(){
        this.sailShip = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Ship]/Phase 1-3/[Ship parts]/Sail/pirate_boatSail_00",10)
    }

    async mastRender(){
        this.mastShip = await this.loadImage("../../../asset/Captain Brineybeard/Captain Brineybeard/[Ship]/Phase 1-3/[Ship parts]/pirate_boatMast.png")
    }

    async blinkRender(){
        this.blinkShip = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Ship]/Phase 1-3/Blink/pirate_boat_blink_00",7)
    }

    async idleRender(){
        this.idleShip = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Ship]/Phase 1-3/Idle/pirate_boat_idle_00",3)
    }

    async spitsRender(){
        this.spitsShip = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Ship]/Phase 1-3/Spits cannonball/pirate_boat_cannon_00",29)
    }

    async renderAllSprites(){
        await this.railRender()
        await this.sailRender()
        await this.mastRender()
        await this.blinkRender()
        await this.idleRender()
        await this.spitsRender()
    }
}