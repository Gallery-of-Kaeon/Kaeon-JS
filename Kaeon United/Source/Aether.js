function call(module, packet) {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", module, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);

	return ((new Function("var module = { exports: {} };" + allText + "return module.exports;"))()).onCall(packet);
}

module.exports = {
	call
};