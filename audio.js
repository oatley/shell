// music
let music;
let audioRun;
let audioHit;
let audioLand;

let audio = {
    // Initial prep for music
    prepAudio: function() {
        // Setup the background music
        music = game.add.audio('bgmusic');



        // Decodes all sounds, only after this is complete will startMusic run
        game.sound.setDecodedCallback([ music ], audio.startMusic, this);

        // Setup callbacks to resume and pause the music
        game.onPause.add(audio.pauseMusic, this);
        game.onResume.add(audio.resumeMusic, this);
    },
    // Mute background music
    muteMusicVolume: function() {
        if (music.mute == true) {
            music.mute = false;
            audioRun.mute = false;
            audioHit.mute = false;
            audioLand.mute = false;
        } else {
            music.mute = true;
            audioRun.mute = true;
            audioHit.mute = true;
            audioLand.mute = true;
        }
        /*if (player2Group.length > 0) { // Not really sure why this code is even here? wut?
            player2Group.forEach(function(player) {controller.controlPlayer(player, player2Group);}, this);
        }*/
    },
    // Increase background music volume
    increaseMusicVolume: function() {
        if (music.mute == true) {
            music.mute = false

        }
        music.volume += 1;

    },
    // Decrease background music volume
    decreaseMusicVolume: function() {
        if (music.volume > 0 && music.mute == true) {
            music.mute = false;

        }
        if (music.volume > 0){
            music.volume -= 1;

        } else {
            music.mute = true;

        }
    },
    // Resume music after a pause
    resumeMusic: function() {
        music.mute = false;

        //music.resumeAll();
        music.resume();
    },
    // Pause background music
    pauseMusic: function() {
        music.mute = false;

        music.pause();
    },
    // Initial start of background music
    startMusic: function() {
        music.volume = 0;

        music.mute = false;

        music.play();
    },
    getAudioRun: function (player) {
        // SoundFX
        let audioRun = game.add.audio('run');
        audioRun.ready = false;
        game.sound.setDecodedCallback([audioRun], player.setAudioRunReady, this);
        return audioRun;
        //audioHit = game.add.audio('hit');
        //audioLand = game.add.audio('land');
    }


};
