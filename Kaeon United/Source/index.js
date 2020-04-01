let platform = "Browser";

if(typeof process === 'object') {

	if(typeof process.versions === 'object') {

		if(typeof process.versions.node !== 'undefined') {
			platform = "Node";
		}
	}
}

let data = "";

try {

	if(platform.toLowerCase() == "node")
		data = require("fs").readFileSync("./source.js", 'utf8');

	else {

		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", "./source.js", false);

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0)
					data = rawFile.responseText;
			}
		}

		rawFile.send(null);
	}

	eval(require("./ONESuite.js").preprocess(data));
}

catch(error) {
	
}

data = "";

try {

	if(platform.toLowerCase() == "node")
		data = require("fs").readFileSync("./source.op", 'utf8');

	else {

		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", "./source.op", false);

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0)
					data = rawFile.responseText;
			}
		}

		rawFile.send(null);
	}

	require("./ONESuite.js").process(data);
}

catch(error) {

}