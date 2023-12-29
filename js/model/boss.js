import { CAPTAIN_CONF } from "../settings/captainSettings.js"
import { SHIP_CONF } from "../settings/shipSettings.js"
import { Captain } from "./captain.js"
import { MainShip } from "./ship/mainShip.js"
import { Mast } from "./ship/mast.Ship.js"
import { Rail } from "./ship/railShip.js"
import { Sail } from "./ship/sailShip.js"

export class Boss {
    static BOSS = null
    static getInstance(){
        if (this.BOSS == null) this.BOSS = new Boss()
        return this.BOSS
    }


    constructor() {
        this.sail = new Sail(980, -80, 300, 300, 1, SHIP_CONF)
        this.rail = new Rail(1150, 270, 300, 300, 1, SHIP_CONF)
        this.mast = new Mast(1230, 50, 300, 300, 1, SHIP_CONF)
        this.mainShip = new MainShip(830, 170, 300, 300, 1.25, SHIP_CONF)
        this.captain = new Captain(1300, 400, 300, 300, 1, CAPTAIN_CONF)
    }

    update() {
        this.mast.update()
        this.sail.update()
        this.captain.update()
        this.rail.update()
        // this.mainShip.update()
    }
}