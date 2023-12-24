import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { Cloud } from "./cloud.js";

export class CloudA extends Cloud{
    constructor(x,y,scale,CHAR_CONF){
        super(x,y,scale,CHAR_CONF.cloudA,BackgroundSprites.getInstance().pirateCloudsA)
    }
}