export class Sounds {
    static SOUNDSSINGLETON = null
    static getInstance(){
        if(this.SOUNDSSINGLETON == null) this.SOUNDSSINGLETON = new Sounds()
        return this.SOUNDSSINGLETON
    }

    constructor(){
        this.backGroundMusicState = false
        this.cupheadDashState = false
        this.cupheadDeathState = false
        this.cupheadFireLoopState = false
        this.cupheadFireStartState = false
        this.cupheadHitState = false
        this.cupheadJumpState = false
        this.cupheadLandState = false
        this.opticalLoopState = false
        this.bellIntroState = false
        this.knockoutBellState = false
        this.knockoutBoomState = false
        this.announcerState = false
        this.announcerKnockoutState = false
    }

    async renderSong(){
        this.backGroundMusic = await this.loadSong("./../../../asset/Sounds/Music/Cuphead OST - Shootin n' Lootin [Music] (320 kbps).mp3")
        this.cupheadDash = await this.loadSong("./../../../asset/Sounds/Player/player_dash_01.wav")
        this.cupheadDeath = await this.loadSong("./../../../asset/Sounds/Player/player_death_01.wav")
        this.cupheadFireLoop = await this.loadSong("./../../../asset/Sounds/Player/player_default_fire_loop_01.wav")
        this.cupheadFireStart = await this.loadSong("./../../../asset/Sounds/Player/player_default_fire_start_01.wav")
        this.cupheadHit = await this.loadSong("./../../../asset/Sounds/Player/player_hit_01.wav")
        this.cupheadJump = await this.loadSong("./../../../asset/Sounds/Player/player_jump_01.wav")
        this.cupheadLand = await this.loadSong("./../../../asset/Sounds/Player/player_land_ground_01.wav")

        this.opticalLoop = await this.loadSong("./../../../asset/Sounds/Misc/OpticalLoop.wav")
        this.bellIntro = await this.loadSong("./../../../asset/Sounds/Misc/bell_intro.wav")
        this.knockoutBell = await this.loadSong("./../../../asset/Sounds/Misc/knockout_bell.wav")
        this.knockoutBoom= await this.loadSong("./../../../asset/Sounds/Misc/knockout_boom_01.wav")
        this.announcer= await this.loadSong("./../../../asset/Sounds/Announcer/announcer_0001_b.wav")
        this.announcerKnockout= await this.loadSong("./../../../asset/Sounds/Announcer/announcer_knockout_0004.wav")

        this.captainGunStart = await this.loadSong("./../../../asset/Sounds/Captain/pirate_gun_start.wav")
        this.captainGunEnd = await this.loadSong("./../../../asset/Sounds/Captain/pirate_gun_end.wav")
        this.captainGunShoot = await this.loadSong("./../../../asset/Sounds/Captain/pirate_gun_shoot_04.wav")
        this.captainLaugh = await this.loadSong("./../../../asset/Sounds/Captain/pirate_laugh_01.wav")

        this.backGroundMusic.volume = .5
    }

    async loadSong(url) {
        const audioElement = document.createElement('audio');
        audioElement.src = url;
        const divContainer = document.getElementById('audioContainer');

        divContainer.appendChild(audioElement);
    
        return audioElement;
    }

    disableAllSong(){
        this.backGroundMusic.volume = 0
    }

    playBackground(){
        this.backGroundMusic.loop = true
        this.backGroundMusic.play()
    }

    /**
     * cuphead
     */
    startCupheadHitSound(){
        this.cupheadHit.play()
        this.cupheadHitState = true
    }

    endCupheadHitSound(){
        this.cupheadHit.pause()
        this.cupheadHitState = false
    }

    startCupheadJumpSound(){
        this.cupheadJump.play()
        this.cupheadJumpState = true
    }

    endCupheadJumpSound(){
        this.cupheadJump.pause()
        this.cupheadJumpState = false
    }

    startCupheadLandSound(){
        this.cupheadLand.play()
    }

    startCupheadDashSound(){
        this.cupheadDash.play()
    }

    startCupheadDeathSound(){
        this.cupheadDeath.play()
    }

    opticalLoopSound(){
        this.opticalLoop.play()
        this.opticalLoop.loop = true
    }

    bellIntroSound(){
        this.bellIntro.play()
    }

    announcerSound(){
        this.announcer.play()
    }


}