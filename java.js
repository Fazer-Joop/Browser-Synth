"use strict";

var audioContext = new AudioContext();

window.onload = function() {
	var onOff = document.getElementById("on-off");
	var span = document.getElementsByTagName("span")[0];
	/* BEGIN INITIAL SET*/

	var osc = false; //osc state = false//
	/* END SET INITIAL*/

	var freqSliderVal = document.getElementsByTagName("input")[1].value;

	var selectedWaveform = "sawtooth";

	var waveformTypes = document.getElementsByTagName("li");

	function select() {
		var selectedWaveformElement = document.getElementById(this.id).id;
		
		selectedWaveform = document.getElementById(this.id).id;
		console.log(selectedWaveform);

		for (var i = 0; i < waveformTypes.length; i+=1) {
			waveformTypes[i].classList.remove("selected-waveform");
		}

		selectedWaveformElement.classList.add("selected-waveform");
	}

	for (var i = 0; i < waveformTypes.length; i++){
		waveformTypes[i].addEventListener('click', select);
	}

	setInterval(function(){
		if(!osc){
			console.log("Oscillator is stopped.Waiting to start...");
		} else {
			freqSliderVal = document.getElementsByTagName("input")[1].value;
			osc.frequency.value = freqSliderVal;
			console.log("Oscillator is playing. Frequency value is" + freqSliderVal);
			osc.type = selectedWaveform;
		}
	},50);


	onOff.addEventListener("click", function(){

		if(!osc){
			osc = audioContext.createOscillator();
			osc.type = selectedWaveform;
			osc.frequency.value = freqSliderVal;
			osc.connect(audioContext.destination);
			osc.start(audioContext.currentTime);
			onOff.value = "stop";
			span.innerHTML = "Click to stop Oscillator"
		} else {
			osc.stop(audioContext.currentTime);
			osc = false;
			onOff.value = "start";
			span.innerHTML = "Click to start oscillator"
		}
	});
};

