var platform = "Browser";

if(typeof process === 'object') {

	if(typeof process.versions === 'object') {

		if(typeof process.versions.node !== 'undefined') {
			platform = "Node";
		}
	}
}

if(platform.toLowerCase == "Node")
	data = require("fs").readFileSync("./main.js", 'utf8');

else {

	let rawFile = new XMLHttpRequest();
	rawFile.open("GET", "./main.js", false);

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				data = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);
}

eval(data);

var kaeonFUSION = require("./KaeonFUSION.js");
var fusion = new kaeonFUSION.KaeonFUSION();

if(platform.toLowerCase == "Node")
	data = require("fs").readFileSync("./main.op", 'utf8');

else {

	let rawFile = new XMLHttpRequest();
	rawFile.open("GET", "./main.op", false);

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