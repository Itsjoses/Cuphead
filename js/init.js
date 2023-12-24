import { CupheadSprites } from "./design-pattern/singleton/cupheadSprite.js";
import { GAME } from "./game.js";
import { CupHead } from "./model/cuphead.js";
import { GameSetting } from "./settings/gameSettings.js";
import { CUPHEAD_CONF } from "./settings/cupheadSettings.js";
import { BackgroundSprites } from "./design-pattern/singleton/backgroundSprite.js";
import { BACKGROUD_CONF } from "./settings/backgroundSettings.js";
import { WaterA } from "./model/background/water/waterA.js";
import { WaterB } from "./model/background/water/waterB.js";
import { WaterC } from "./model/background/water/waterC.js";
import { WaterD } from "./model/background/water/waterD.js";
import { DockA } from "./model/background/dock/dockA.js";
import { DockB } from "./model/background/dock/dockB.js";
import { CloudA } from "./model/background/cloud/cloudA.js";
import { CloudB } from "./model/background/cloud/cloudB.js";
import { CloudC } from "./model/background/cloud/cloudC.js";
import { CloudD } from "./model/background/cloud/cloudD.js";

// getInstance
const game = GAME.getInstace();
const cupheadSprites = CupheadSprites.getInstace()
const backgroundSprites = BackgroundSprites.getInstance()

function canvasInit(){
    game.canvas.width = GameSetting.WIDTH
    game.canvas.height = GameSetting.HEIGHT
}

function renderSprite(){
    game.cuphead = new CupHead(150,1,300,300,1,CUPHEAD_CONF)
    game.waterA = new WaterA(1,740,300,300,1,BACKGROUD_CONF)
    game.waterB = new WaterB(1,730,300,300,1,BACKGROUD_CONF)
    game.waterC = new WaterC(1,590,300,300,1,BACKGROUD_CONF)
    game.waterD = new WaterD(1,520,300,300,1,BACKGROUD_CONF)
    game.dockA = new DockA(-270,510,300,300,1.2,BACKGROUD_CONF)
    game.dockB = new DockB(-170,574,300,300,1.2,BACKGROUD_CONF)
    game.cloudA = new CloudA(1,200,1,BACKGROUD_CONF)
    game.cloudB = new CloudB(1,150,1,BACKGROUD_CONF)
    game.cloudC = new CloudC(1,10,1,BACKGROUD_CONF)
    game.cloudD = new CloudD(1,1,1,BACKGROUD_CONF)
}

function eventRender(){
    const gameEvent = new Event()
    gameEvent.render()
}

async function play(){
    await cupheadSprites.renderAllSprites()
    await backgroundSprites.renderAllSprites()
    canvasInit()
    renderSprite()
    game.render()
    // eventRender()
}

play()
