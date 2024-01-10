export class CupheadSprites {
    static CUPHEADINSTACE = null
    static getInstace(){
        if(this.CUPHEADINSTACE == null) this.CUPHEADINSTACE = new CupheadSprites()
        return this.CUPHEADINSTACE
    }
    constructor(){
        this.idleSprites = []
        this.runSprites = []
        this.jumpSprites = []
        this.dashSprites = []
        this.dashAirSprites = []
        this.shotStraightSprites = []
        this.runShotStraightSprites = []
        this.duckNormalSprites = []
        this.duckIdleSprites = []
        this.duckStandupSprites = []
        this.duckShootSprites = []
        this.introSprites = []
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

    async idleRender(){
        this.idleSprites = await this.spriteRender("../../../asset/Cuphead/Idle/cuphead_idle_00",11)
    }

    async runRender(){
        this.runSprites = await this.spriteRender("../../../asset/Cuphead/Run/Normal/cuphead_run_00",16)
    }
    async shotStraightRender(){
        this.shotStraightSprites = await this.spriteRender("../../../asset/Cuphead/Shoot/Straight/cuphead_shoot_straight_00",3)
    }
    async runShotStraightRender(){
        this.runShotStraightSprites = await this.spriteRender("../../../asset/Cuphead/Run/Shooting/Straight/cuphead_run_shoot_00",16)
    }
    async duckNormalRender(){
        this.duckNormalSprites = await this.spriteRender("../../../asset/Cuphead/Duck/Idle/cuphead_duck_00",3)
    }
    async duckIdleRender(){
        this.duckIdleSprites = await this.spriteRender("../../../asset/Cuphead/Duck/Idle/cuphead_duck_idle_00",8)
    }
    async duckStandupRender(){
        this.duckStandupSprites = await this.spriteRender("../../../asset/Cuphead/Duck/Idle/cuphead_duck_stand_00",3)
    }
    async duckShootRender(){
        this.duckShootSprites = await this.spriteRender("../../../asset/Cuphead/Duck/Shoot/cuphead_duck_shoot_00",3)
    }
    async duckShootRender(){
        this.duckShootSprites = await this.spriteRender("../../../asset/Cuphead/Duck/Shoot/cuphead_duck_shoot_00",3)
    }
    async jumpRender(){
        this.jumpSprites = await this.spriteRender("../../../asset/Cuphead/Jump/Cuphead/cuphead_jump_00",3)
    }
    async dashRender(){
        this.dashSprites = await this.spriteRender("../../../asset/Cuphead/Dash/Ground/cuphead_dash_00",8)
    }
    async dashAirRender(){
        this.dashAirSprites = await this.spriteRender("../../../asset/Cuphead/Dash/Air/cuphead_dash_air_00",6)
    }

    async introRender(){
        this.introSprites = await this.spriteRender("../../../asset/Cuphead/Intro/cuphead_intro_a_00",28)
    }
    
    async getHitGroundRender(){
        this.hitGroundSprites = await this.spriteRender("../../../asset/Cuphead/Hit/Ground/cuphead_hit_00",6)
    }

    async getHitAirRender(){
        this.hitAirSprites = await this.spriteRender("../../../asset/Cuphead/Hit/Air/cuphead_hit_air_00",6)
    }

    getIdle(){
        return this.idleSprites
    }
    getRun(){
        return this.runSprites
    }
    getShotStraight(){
        return this.shotStraightSprites
    }
    getRunShotStraight(){
        return this.runShotStraightSprites
    }
    getDuckNormalSpritest(){
        return this.duckNormalSprites
    }
    getDuckIdleSprites(){
        return this.duckIdleSprites
    }
    getDuckStandupSprites(){
        return this.duckStandupSprites
    }
    getDuckShootSprites(){
        return this.duckShootSprites
    }
    getJumpSprites(){
        return this.jumpSprites
    }
    getDashSprites(){
        return this.dashSprites
    }
    getDashAirSprites(){
        return this.dashAirSprites
    }


    async renderAllSprites(){
        await this.idleRender()
        await this.runRender()
        await this.shotStraightRender()
        await this.runShotStraightRender()
        await this.duckNormalRender()
        await this.duckIdleRender()
        await this.duckStandupRender()
        await this.duckShootRender()
        await this.jumpRender()
        await this.dashRender()
        await this.dashAirRender()
        await this.introRender()
        await this.getHitGroundRender() 
        await this.getHitAirRender() 
    }
}