export class BulletSprite {
    static BULLETSPRITE = null
    static getInstance(){
        if(this.BULLETSPRITE == null) this.BULLETSPRITE = new BulletSprite()
        return this.BULLETSPRITE
    }

    constructor(){
        this.captainBulletSpawn = []
        this.captainBulletLoop = []
        this.cupheadBulletDie = []
        this.cupheadBulletLoop = []
        this.cupheadBulletSpawn = []
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

    async bulletRender(){
        this.cupheadBulletDie = await this.spriteRender("../../../asset/Bullet/Dies/bullet_dies_00",6)
        this.cupheadBulletLoop = await this.spriteRender("../../../asset/Bullet/Loop/bullet_loop_00",8)
        this.cupheadBulletSpawn = await this.spriteRender("../../../asset/Bullet/Spawning/bullet_spawn_00",3)
        this.captainBulletSpawn = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Miscellaneous]/Bullet (Yellow)/Bullet (Effect, yellow, A)/yellow_pirate_peaBulletDeath_A_00",5)
        this.captainBulletLoop = await this.spriteRender("../../../asset/Captain Brineybeard/Captain Brineybeard/[Miscellaneous]/Bullet (Yellow)/Bullet (Yellow, A)/yellow_pirate_peaBullet_A_00",4)
    }

    async renderAllSprites(){
        await this.bulletRender()

    }
}