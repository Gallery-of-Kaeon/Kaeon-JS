let platform = "Browser";

if(typeof process === 'object') {

	if(typeof process.versions === 'object') {

		if(typeof process.versions.node !== 'undefined') {
			platform = "Node";
		}
	}
}

try {

	if(platform.toLowerCase() == "node")
		data = require("fs").readFileSync("./source.js", 'utf8');

	else {

		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", "./source.js", false);

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
}

catch(error) {

}

try {
	
	let kaeonFUSION = require("./KaeonFUSION.js");
	let fusion = new kaeonFUSION.KaeonFUSION();

	if(platform.toLowerCase() == "node")
		data = require("fs").readFileSync("./source.op", 'utf8');

	else {

		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", "./source.op", false);

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0) {
					data = rawFile.responseText;
				}
			}
		}

		rawFile.send(null);
	}

	for(let i = 0; i < data.length; i++) {

		if(data.charCodeAt(i) == 13) {
			data = data.substring(0, i) + data.substring(i + 1);
			i--;
		}
	}

	fusion.process(require("./ONEPlus.js").readONEPlus(data));
}

catch(error) {

}