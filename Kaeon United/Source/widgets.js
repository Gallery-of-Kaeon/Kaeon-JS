var ui = require("./ui.js");

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