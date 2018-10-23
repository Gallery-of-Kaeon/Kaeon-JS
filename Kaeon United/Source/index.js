// FOR A JAVASCRIPT PROJECT, REPLACE ALL CODE WITH THE DESIRED JAVASCRIPT.
// FOR A KAEON FUSION PROJECT, LEAVE THE FILE AS IS.

var kaeonFUSION = require("./KaeonFUSION.js");
var fusion = new kaeonFUSION.KaeonFUSION();

var platform = "Browser";

if(typeof process === 'object') {

	if(typeof process.versions === 'object') {

		if(typeof process.versions.node !== 'undefined') {
			platform = "Node";
		}
	}
}

var data = "";

if(platform.toLowerCase == "Node")
	data = require("fs").readFileSync("./index.op", 'utf8');

else {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "./index.op", false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				data = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);
}

for(var i = 0; i < data.length; i++) {

	if(data.charCodeAt(i) == 13) {
		data = data.substring(0, i) + data.substring(i + 1);
		i--;
	}
}

fusion.process(require("./ONEPlus.js").readONEPlus(data));