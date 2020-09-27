function addInput(element, input) {

	if(input == null) {

		element.input = { };

		input = element.input;
	}

	input = typeof input == "object" ? input : { };

	input.pc = {
		keyboard: [],
		mouse: {
			position: {
				x: 0,
				y: 0
			},
			buttons: {
				left: false,
				middle: false,
				right: false
			},
			scroll: 0
		}
	};

	element.addEventListener(
		"keydown",
		function(event) {
			
			if(!input.pc.keyboard.includes(event.keyCode))
				input.pc.keyboard.push(event.keyCode);
		}
	);

	element.addEventListener(
		"keyup",
		function(event) {

			for(let i = 0; i < input.pc.keyboard.length; i++) {
				
				if(input.pc.keyboard[i] == event.keyCode) {

					input.pc.keyboard.splice(i, 1);

					i--;
				}
			}
		}
	);

	element.addEventListener(
		"mousedown",
		function(event) {
			
			if(event.button == 0)
				input.pc.mouse.buttons.left = true;
			
			if(event.button == 1)
				input.pc.mouse.buttons.middle = true;
			
			if(event.button == 2)
				input.pc.mouse.buttons.right = true;
		}
	);

	element.addEventListener(
		"mouseup",
		function(event) {

			if(event.button == 0)
				input.pc.mouse.buttons.left = false;
			
			if(event.button == 1)
				input.pc.mouse.buttons.middle = false;
			
			if(event.button == 2)
				input.pc.mouse.buttons.right = false;
		}
	);

	element.addEventListener(
		"wheel",
		function(event) {

			input.pc.mouse.scroll = event.deltaY;

			setTimeout(
				function() {
					input.pc.mouse.scroll = 0;
				},
				1000 / 60
			);
		}
	);
}

module.exports = {
	addInput
};