import { BackgroundSprites } from "../../../design-pattern/singleton/backgroundSprite.js";
import { Cloud } from "./cloud.js";

export class CloudD extends Cloud{
    constructor(x,y,scale,CHAR_CONF){
        super(x,y,scale,CHAR_CONF.cloudD,BackgroundSprites.getInstance().pirateCloudsD)
    }
}