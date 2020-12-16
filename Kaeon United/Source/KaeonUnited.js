function getEnvironment() {

	let environment = "browser";
	
	if(typeof process === 'object') {
	
		if(typeof process.versions === 'object') {
	
			if(typeof process.versions.node !== 'undefined')
				environment = "node";
		}
	}

	return environment;
}

function getPlatform(environment) {

	if(environment == "browser") { // script, module, cdn

		if(typeof require == "function" && typeof module == "object") {

			if(module.parent != null)
				return "module";

			return "cdn";
		}

		return "script";
	}

	else {

		if(module.parent != null)
			return "module";

		return "command";
	}
}

function executeCommand(args) {

	var ONESuite = require("./ONESuite.js");
	var io = require("./io.js");

	if(typeof process === 'undefined')
		global = { };

	global.platform = platform;

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
}

function executeScript() {

	module = {
		id: '.',
		exports: { },
		parent: null,
		filename: "",
		loaded: false,
		children: [],
		paths: []
	};
	
	require = function(path) {
	
		require.cache = require.cache ? require.cache : [[], []];
	
		if(module.parent != null) {
	
			if(path.startsWith(".")) {
	
				path =
					module.filename.substring(
						0,
						module.filename.lastIndexOf('/') + 1
					) +
					path;
			}
		}
	
		let lowerPath = path.toLowerCase();
	
		while(lowerPath.startsWith("././"))
			lowerPath = lowerPath.substring(2);
	
		let index = require.cache[0].indexOf(lowerPath);
	
		if(index == -1) {
	
			let rawFile = new XMLHttpRequest();
			rawFile.open("GET", path, false);
	
			let allText = "";
	
			rawFile.onreadystatechange = function() {
	
				if(rawFile.readyState === 4) {
	
					if(rawFile.status === 200 || rawFile.status == 0)
						allText = rawFile.responseText;
				}
			}
	
			rawFile.send(null);
	
			let newModule = {
				id: path,
				exports: { },
				parent: module,
				filename: path,
				loaded: false,
				children: [],
				paths: []
			};
	
			require.cache[0].push(lowerPath);
			require.cache[1].push(newModule);
	
			if(require.universalPreprocessor != null)
				allText = require.universalPreprocessor.preprocess(allText);
	
			let newModuleContents = (
				new Function(
					"var module = arguments[0];" +
					require.toString() +
					"require.cache = arguments[1];" +
					allText +
					";return module;"
				)
			)(newModule, require.cache);
	
			for(key in newModuleContents)
				newModule.exports[key] = newModuleContents.exports[key];
	
			module.children.push(newModule);
	
			newModule.loaded = true;
	
			return newModule.exports;
		}
	
		else
			return require.cache[1][index].exports;
	}
	
	try {
		require.universalPreprocessor = require("./UniversalPreprocessor.js");
	}
	
	catch(error) {
	
	}
}

function executeCDN() {

}

function executeModule() {

	function interface(item) {

	}

	interface.libraries = {

	};

	return interface;
}

let platform = getPlatform(getEnvironment());

if(platform == "command")
	executeCommand(process.argv.slice(2));

if(platform == "script")
	executeScript();

if(platform == "cdn")
	executeCDN();

if(platform == "module")
	module.exports = executeModule();

// STUB