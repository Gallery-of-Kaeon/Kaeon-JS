var ui = require("https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Computation/1%20-%20APIs/4%20-%20Utilities/3%20-%20UI/1%20-%20Visual/1%20-%20General/1%20-%20UI/1%20-%20JavaScript/1%20-%20Source/ui.js");

function createStartScreen(element, text, callback) {

	let button = ui.create(
		{
			tag: "button",
			style: {
				position: "absolute",
				left: "40%",
				top: "45%",
				width: "20%",
				height: "10%",
				background: "white",
				color: "black",
				"border-radius": "25px",
				font: "bold 100% arial"
			},
			children: [
				text
			]
		}
	);

	button.onclick = function() {

		element.innerHTML = "";

		callback(element);
	}
	
	ui.extend(
		element,
		ui.create(
			{
				tag: "div",
				style: {
					position: "absolute",
					left: "0%",
					top: "0%",
					width: "100%",
					height: "100%",
					background: "black"
				},
				children: [
					button
				]
			}
		)
	);
}

module.exports = {
	createStartScreen
};