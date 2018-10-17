function getPlatform() {
	return "Browser";
}

function getInput() {
	return readline();
}

function open(file) {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);

	return allText;
}

module.exports = {

	getPlatform,
	getInput,
	open
};