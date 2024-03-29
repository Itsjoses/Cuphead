import { GAME } from "./game.js";
import { GameSetting } from "./settings/gameSettings.js";
const CURRGAME = GAME.getInstace()



function checkUp(){
    window.addEventListener("keyup",(e) => {
        if(CURRGAME.stop || CURRGAME.stop || CURRGAME.intro == false) return;
        if(e.keyCode == GameSetting.K_RIGHT) CURRGAME.cuphead.controller.right = false
        if(e.keyCode == GameSetting.K_LEFT) CURRGAME.cuphead.controller.left = false
        if(e.keyCode == GameSetting.K_DOWN) CURRGAME.cuphead.controller.crouch = false
        if(e.keyCode == GameSetting.K_SHOT) CURRGAME.cuphead.controller.shot = false
    })
}

function checkDown(){
    window.addEventListener("keydown",(e) => {
        if(CURRGAME.stop || CURRGAME.stop || CURRGAME.intro == false) return;
        if(e.keyCode == GameSetting.K_RIGHT){
            CURRGAME.cuphead.controller.right = true
        } 
        if(e.keyCode == GameSetting.K_LEFT){
            CURRGAME.cuphead.controller.left = true
        } 
        if(e.keyCode == GameSetting.K_DOWN) CURRGAME.cuphead.controller.crouch = true
        if(e.keyCode == GameSetting.K_JUMP){CURRGAME.cuphead.jump()} 
        if(e.keyCode == GameSetting.K_SHOT) CURRGAME.cuphead.controller.shot = true
        if(e.keyCode == GameSetting.K_DASH) CURRGAME.cuphead.dash()
    })
}

function start(){
    checkDown()
    checkUp()
}

start()

