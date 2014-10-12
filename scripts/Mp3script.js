//This script let user control the MP3 player. 
var player;
		var intv;//to keep track of song playing time
		var slider;//let user control song position
		//init
		window.onload = function()
		{
			document.getElementById('btnPlay').addEventListener('click', playMusic,false);
			document.getElementById('btnPause').addEventListener('click',pauseMusic,false);
			document.getElementById('btnStop').addEventListener('click',stopMusic,false);
			document.getElementById('btnVolUp').addEventListener('click', volUp, false);
			document.getElementById('btnVolDown').addEventListener('click', volDown, false);
			player = document.getElementById('player');
			slider = document.getElementById('sliderTime');
			slider.addEventListener('change', reposition, false);
		}
		function reposition()
		{
			player.currentTime = slider.value;
		}
		//Music Volumn control
		//0.0 Silent - 1.0 Full Volume
		function volUp()
		{
			if(player.volume <1)
			{
				player.volume +=0.1;//ten steps volume
			}
			else
			{
				player.volume = 1;
			}
		}
		function volDown()
		{
			if(player.volume > 0)
			{
				player.volume -= 0.1;
			}
			else
			{
				player.volume = 0;
			}
		}
		//Music play control
		////////
		function playMusic()
		{
			player.play();
			intv = setInterval(update, 100);
			slider.max = player.duration;
		}
		//update song time every 100 ms
		function update()
		{
			document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
			slider.value = player.currentTime;
		}
		function millisToMins(seconds)
		{   //get formula from: http://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
			var numMinutes = Math.floor((((seconds %31536000) % 86400) % 3600) /60);
			var numSeconds = (((seconds % 31536000) % 86400) % 3600) % 60;
			if(numSeconds >=10)
			{
				return "Time Elapsed: " + numMinutes + ":" + Math.round(numSeconds);
			}else
			{
				return "Time Elapsed: " + numMinutes + ":0" + Math.round(numSeconds);
			}
			
		}
		function pauseMusic()
		{
			player.pause();
			clearInterval(intv); //reset counter
		}
		function stopMusic()
		{
			player.pause();
			player.currentTime = 0;//go back to the beginning of the song
			clearInterval(intv);  
		}