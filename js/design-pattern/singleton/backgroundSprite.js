export class BackgroundSprites{
    static BACKGROUNDSPRITES = null
    static getInstance(){
        if(this.BACKGROUNDSPRITES == null) this.BACKGROUNDSPRITES = new BackgroundSprites()
        return this.BACKGROUNDSPRITES
    }

    constructor(){
        this.pirateDockA = null
        this.pirateDockB = null
        this.pirateCloudsA = null
        this.pirateCloudsB = null
        this.pirateCloudsC = null
        this.pirateCloudsD = null
        this.waterA = []
        this.waterB = []
        this.waterC = []
        this.waterD = []
        this.screenFX = []
    }

    async waterRender(){
        this.waterA = await this.spriteRender("../../../asset/Background/Water/Water A/pirate_WaterA_0",50)
        this.waterB = await this.spriteRender("../../../asset/Background/Water/Water B/pirate_WaterB_0",50)
        this.waterC = await this.spriteRender("../../../asset/Background/Water/Water C/pirate_WaterC_0",50)
        this.waterD = await this.spriteRender("../../../asset/Background/Water/Water D/pirate_WaterD_0",50)
    }

    async cloudRender(){
        this.pirateCloudsA = await this.loadImage("../../../asset/Background/Sky/pirate_clouds_A.png")
        this.pirateCloudsB = await this.loadImage("../../../asset/Background/Sky/pirate_clouds_B.png")
        this.pirateCloudsC = await this.loadImage("../../../asset/Background/Sky/pirate_clouds_C.png")
        this.pirateCloudsD = await this.loadImage("../../../asset/Background/Sky/pirate_clouds_D.png")
    }

    async dockRender(){
        this.pirateDockA = await this.loadImage("../../../asset/Background/Dock/pirateDockA.png")
        this.pirateDockB = await this.loadImage("../../../asset/Background/Dock/pirateDockB.png")
    }

    async allScreen(){
        this.screenFX = await this.spriteRender("../../../asset/Screen FX/cuphead_screen_fx_0",126)
    }

    async renderAllSprites(){
        await this.waterRender()
        await this.cloudRender()
        await this.dockRender()
        await this.allScreen()
    }

    async spriteRender(path,totalSprites){
        let tempImage = new Image()
        let tempArraySprites = []
        for(let i = 0;i<totalSprites;i++){
            if(i+1 < 10)tempImage = await this.loadImage(`${path}00${i+1}.png`)
            else if(i+1 < 100) tempImage = await this.loadImage(`${path}0${i+1}.png`)
            else tempImage = await this.loadImage(`${path}${i+1}.png`)
            tempArraySprites.push(tempImage)
        }
        return tempArraySprites
    }

    loadImage(url) {
        return new Promise((resolve) => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.src = url;
        });
    }

    loadImage(url) {
        return new Promise((resolve) => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.src = url;
        });
    }
}