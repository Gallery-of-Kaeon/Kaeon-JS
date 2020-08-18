var ONESuite = require("./ONESuite.js");
var io = require("./io.js");

if(typeof process === 'undefined')
	global = { };

global.platform = "browser";

if(typeof process === 'object') {

	if(typeof process.versions === 'object') {

		if(typeof process.versions.node !== 'undefined')
			platform = "node";
	}
}

if(global.platform == "node") {
	global.xhr = require("xmlhttprequest").XMLHttpRequest;
	global.fs = require("fs");
}

else
	global.xhr = XMLHttpRequest;

try {
	global.oneSuite = require("./ONESuite.js");
}

catch(error) {

}

global.open = function(path) {

	if(global.platform == "node" &&
		!(path.toLowerCase().startsWith("http://") ||
		path.toLowerCase().startsWith("https://"))) {
		
		return global.fs.readFileSync(path, 'utf8');
	}

	let data = "";

	let rawFile = new global.xhr();
	rawFile.open("GET", path, false);

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0)
				data = rawFile.responseText;
		}
	}

	rawFile.send(null);

	return data;
}

let requireDefault = require;

require = function(path, reload) {

	if(reload) {

		if(require.cache[path] != null)
			delete require.cache[path];
	}

	else if(require.cache[path] != null)
		return require.cache[path];

	try {

		let item = require.requireDefault(path);
		require.cache[path] = item;

		return item;
	}

	catch(error) {

	}

	let data = global.open(path);

	if(global.oneSuite != null)
		data = global.oneSuite.preprocess(data);

	data = "var module={exports:{}};" + data + ";return module.exports;";

	require.cache[path] = (new Function(data))();

	return require.cache[path];
}

require.requireDefault = requireDefault;
require.cache = { };

(async () => {

	let operation = process.argv[2].toLowerCase();

	let data = null;

	if(process.argv[3] != null) {
		
		let flag = process.argv[3].toLowerCase();

		data = ONESuite.preprocess(flag == "open" ? io.open(process.argv[4]) : process.argv[4]);
	}

	let result = "";

	if(operation == "parse")
		result = ONESuite.write(ONESuite.parse(data));

	if(operation == "preprocess")
		result = data;

	if(operation == "process") {

		if(data != null)
			result = ONESuite.process(data);
		
		else {

			let state = { };

			while(true) {

				let input = io.getInput("Enter code (Enter 'q' to quit): ");

				if(input.toLowerCase() == "q")
					return;

				console.log("\n" + ONESuite.process(ONESuite.preprocess(input), state));
			}
		}
	}

	if(operation == "js") {

		if(data != null) {

			result = await eval(
				"(async () => {\n" +
				ONESuite.preprocess(data) +
				"\n})();"
			);
		}

		else {

			while(true) {

				let input = io.getInput("Enter code (Enter 'q' to quit): ");

				if(input.toLowerCase() == "q")
					return;

				console.log(
					await eval(
						"(async () => {\n" +
						oneSuite.preprocess(input) +
						"\n})();"
					)
				);
			}
		}
	}

	if(operation == "ucc") {
		
		var cmd = require("node-cmd");
		var path = require("path");

		cmd.get(
			"node \"" +
				path.dirname(__filename) +
				"\\UCC.js\" " +
				data,
			function(error, data, stderr) {

				if(data.trim().length != 0)
					console.log(data);
			}
		);
	}

	if(operation == "assemble") {

		if(!Array.isArray(data))
			data = ONESuite.preprocess("(] KF [> Use: CSB <)\n" + data);
		
		fs.writeFileSync(process.argv[5], new Uint8Array(Buffer.from(data)));
	}

	if(operation == "disassemble")
		io.save(require("./CSB.js").disassemble(fs.readFileSync(data)), process.argv[5]);

	if(result == null)
		result = "";

	result = ("" + result).trim();

	if(result != "") {

		console.log(result);

		if(process.argv[5] != null)
			io.save(result, process.argv[5]);
	}
})();