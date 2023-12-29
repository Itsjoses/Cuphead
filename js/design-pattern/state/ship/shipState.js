
export class ShipState{
    constructor(ship){
        this.ship = ship
    }

    updateFrame(){
        const currentSprite = this.ship.sprite[this.ship.tick]
        this.ship.GAME.ctx.drawImage(currentSprite,this.ship.transform.position.x,this.ship.transform.position.y + this.ship.GAME.waveHeight,currentSprite.width * this.ship.transform.scale,currentSprite.height * this.ship.transform.scale)
    }
}