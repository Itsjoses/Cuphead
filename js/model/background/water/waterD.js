import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { Water } from "./water.js";

export class WaterD extends Water{
    constructor(x,y,w,h,scale = 1,CHAR_CONF){
        super(x,y,w,h,scale,CHAR_CONF)
        this.sprite = BackgroundSprites.getInstance().waterD
        this.CURR_CHAR_CONF = CHAR_CONF.waterD
    }
}