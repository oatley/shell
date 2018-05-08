var audio = {
    // Mute background music
    muteMusicVolume: function() {
        if (music.mute == true) {
            music.mute = false;
        } else {
            music.mute = true;
        }if (player2Group.length > 0) {
            player2Group.forEach(function(player) {controlPlayer(player, player2Group);}, this);
        }
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
        music.volume = 5;
        music.mute = false;
        music.play();
    }

};
