export class Transform{
    constructor(positionX,positiony,sizeW,sizeH,scale = 1,rotationX = 0,rotationY = 0,velocityX = 0,velocityY = 0){
        this.position = {
            x: positionX,
            y: positiony,
        },
        this.rotation = {
            x: rotationX,
            y: rotationY
        },
        this.scale = scale
        this.size = {
            w: sizeW,
            h: sizeH
        },
        this.velocity = {
            x: velocityX,
            y: velocityY
        }
    }
}