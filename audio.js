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

        // SoundFX
        audioRun = game.add.audio('run');
        audioHit = game.add.audio('hit');
        audioLand = game.add.audio('land');

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
            audioRun.mute = false;
            audioHit.mute = false;
            audioLand.mute = false;
        }
        music.volume += 1;
        audioRun.volume += 1;
        audioHit.volume += 1;
        audioLand.volume += 1;
    },
    // Decrease background music volume
    decreaseMusicVolume: function() {
        if (music.volume > 0 && music.mute == true) {
            music.mute = false;
            audioRun.mute = false;
            audioHit.mute = false;
            audioLand.mute = false;
        }
        if (music.volume > 0){
            music.volume -= 1;
            audioRun.volume -= 1;
            audioHit.volume -= 1;
            audioLand.volume -= 1;
        } else {
            music.mute = true;
            audioRun.mute = true;
            audioHit.mute = true;
            audioLand.mute = true;
        }
    },
    // Resume music after a pause
    resumeMusic: function() {
        music.mute = false;
        audioRun.mute = false;
        audioHit.mute = false;
        audioLand.mute = false;
        //music.resumeAll();
        music.resume();
    },
    // Pause background music
    pauseMusic: function() {
        music.mute = false;
        audioRun.mute = false;
        audioHit.mute = false;
        audioLand.mute = false;
        music.pause();
    },
    // Initial start of background music
    startMusic: function() {
        music.volume = 5;
        audioRun.mute = 10;
        audioHit.mute = 10;
        audioLand.mute = 10;
        music.mute = false;
        audioRun.mute = false;
        audioHit.mute = false;
        audioLand.mute = false;
        music.play();
    }

};
