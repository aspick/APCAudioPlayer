var AudioPlayer = function(audioElement,playerElement){
	this.player = playerElement;
	this.audio = audioElement;
}

AudioPlayer.prototype.build = function(){
	// contains single page jQuery objects
	var player = this.player;
	var audio = this.audio[0];
	var _this = this;

	function buildControlls(){
		var playButton = $('<div class="apc-button apc-play-button"></div>');
		var backButton = $('<div class="apc-button apc-back-button"></div>');
		var pauseButton = $('<div class="apc-button apc-pause-button hidden"></div>');
		var repeatButton = $('<div class="apc-button apc-repeat-button hidden"></div>');
		var timeField = $('<span class="apc-time-field">0:00 / -:--</span>');

		player.append(backButton);
		player.append(playButton);
		player.append(pauseButton);
		player.append(repeatButton);
		player.append(timeField);

		playButton.click(function(){
			audio.play();
			playButton.addClass('hidden');
			repeatButton.addClass('hidden');
			pauseButton.removeClass('hidden');
		});
		backButton.click(function(){
			audio.currentTime = 0.0;
		});
		pauseButton.click(function(){
			audio.pause();
			pauseButton.addClass('hidden');
			playButton.removeClass('hidden');
		});
		repeatButton.click(function(){
			audio.currentTime = 0.0;
			audio.play();
			repeatButton.addClass('hidden');
			pauseButton.removeClass('hidden');
		});

		audio.addEventListener('ended',function(){
			pauseButton.addClass('hidden');
			playButton.addClass('hidden');
			repeatButton.removeClass('hidden');
		});
		audio.addEventListener('timeupdate',function(){
			$('.apc-time-field').html(formatSecs(audio.currentTime) + ' / ' + formatSecs(audio.duration));
		});
		audio.addEventListener('loadedmetadata',function(){
			audio.duration
			$('.apc-time-field').html('0:00' + ' / ' + formatSecs(audio.duration));
		});
	}

	function formatSecs(sec){
		var isec = parseInt(sec);
		var min = parseInt(isec / 60);
		var rsec = isec % 60;
		if(rsec < 10){
			return min + ':0' + rsec;
		}else{
			return min + ':' + rsec;
		}
	}

	buildControlls();

}