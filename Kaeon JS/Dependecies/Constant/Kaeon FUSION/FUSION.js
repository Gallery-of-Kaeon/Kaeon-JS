var one = require("./ONE");
var philosophersStone = require("./PhilosophersStone");

class FUSION extends philosophersStone.PhilosophersStone {
	
	constructor() {

		this.running = false;

		this.fusionUnits = [];
		this.updated = false;

		this.tags.push("FUSION");
	}

	function onCall(packet) {
		
		if(("" + packet[0]).toLowerCase() == "update")
			update();
		
		else if(("" + packet[0]).toLowerCase() == "stop")
			this.running = false;

		return null;
	}

	function update() {
		
		var units = philosophersStone.get(this, ["FUSION Unit"]);

		for(var i = 0; i < units.length; i++) {
			
			for(var j = i + 1; j < units.length; j++) {
				
				if(typeof units[i] === typeof units[j]) {

					units.splice(j, 1);

					j--;
				}
			}
		}

		this.fusionUnits = units;

		this.updated = true;
	}

	function process(element) {
		
		this.running = true;

		update();

		internalProcess(element, true);

		this.fusionUnits = [];
		this.running = false;
	}

	function internalProcess(element, internal) {
		
		var currentElement = element;

		if(!internal) {

			this.running = true;

			update();
		}

		var processed = [[], []];

		var bubbleUp = false;

		while(running) {

			this.updated = false;

			var denied = isDenied(currentElement);

			var verifiedFUSIONUnits =
				!denied ?
					getVerifiedFUSIONUnits(currentElement) :
					[];

			// 112
		}
	}
}

class FUSIONUnit extends philosophersStone.PhilosophersStone {
	
	constructor() {
		this.tags.push("FUSION Unit");
	}

	function deny(element) {
		return false;
	}

	function verify(element) {
		return false;
	}

	function trickleDown(element) {
		return true;
	}

	function process(element, processed) {
		return null;
	}

	function isAdded(element, processed) {
		return true;
	}

	function terminate(element, processed) {
		return false;
	}

	function jump(element, processed) {
		return null;
	}

	function handleError(element, processed, error) {
		
	}
}

module.exports = {

	FUSION,
	FUSIONUnit
};