#!/usr/bin/env node

// <script> document.documentElement.innerHTML = "";

var linkHTTP = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/HTTP%20Utils/httpUtils.js";
var linkIO = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/ioNode.js";
var linkONESuite = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONESuite.js";

var linkDoc = null;

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

	if(environment == "browser") {

		if(typeof require == "function" && typeof module == "object") {

			if(module.parent != null)
				return "module";
		}

		return document.documentElement.innerHTML == "<head></head><body></body>" ? "cdn" : "script";
	}

	else {

		if(module.parent != null)
			return "module";

		return "command";
	}
}

function getURLArguments() {

	let vars = {};

	window.location.href.replace(
		/[?&]+([^=&]+)=([^&]*)/gi,
		function(m, key, value) {
			vars[decodeURIComponent(key).toLowerCase()] = decodeURIComponent(value);
		}
	);

	return vars;
}

function makeOnlineRequest(path, cors) {

	if(cors)
		path = "https://cors-anywhere.herokuapp.com/" + path;
	
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

	return allText;
}

function executeCommand(args) {

	var ONESuite = require(linkONESuite);
	var io = require(linkIO);

	(async () => {

		let operation = args[0].toLowerCase();

		let data = null;

		if(args[1] != null) {
			
			let flag = args[1].toLowerCase();

			data = ONESuite.preprocess(flag == "open" ? io.open(args[2]) : args[2]);
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
			
			fs.writeFileSync(args[3], new Uint8Array(Buffer.from(data)));
		}

		if(operation == "disassemble")
			io.save(require("./CSB.js").disassemble(fs.readFileSync(data)), args[3]);

		if(result == null)
			result = "";

		result = ("" + result).trim();

		if(result != "") {

			console.log(result);

			if(args[3] != null)
				io.save(result, args[3]);
		}
	})();
}

function executeScript() {

	if(typeof require != typeof undefined) {

		if(require.kaeonUnited)
			return;
	}

	module = {
		id: '.',
		exports: { },
		parent: null,
		filename: "",
		loaded: false,
		children: [],
		paths: []
	};
	
	function unitedRequire(path) {
	
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

			let allText = makeOnlineRequest(path);
	
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
	
			if(require.ONESuite != null)
				allText = require.ONESuite.preprocess(allText);
	
			let moduleFunction = new Function(
				"var module = arguments[0];" +
				require.toString() +
				"require.cache = arguments[1];" +
				allText +
				";return module;"
			);
			
			let newModuleContents = moduleFunction(newModule, require.cache);
	
			for(key in newModuleContents)
				newModule.exports[key] = newModuleContents.exports[key];
	
			module.children.push(newModule);
	
			newModule.loaded = true;
	
			return newModule.exports;
		}
	
		else
			return require.cache[1][index].exports;
	}

	require = unitedRequire;

	require.kaeonUnited = true;
	
	try {
		require.ONESuite = require(linkONESuite);
	}
	
	catch(error) {
	
	}
}

function executeJS(code) {
	
	eval(
		"(async () => {" +
		require.ONESuite.preprocess(code) +
		"})()"
	);
}

function executeOP(code) {
	require.ONESuite.process(code);
}

function executeHTML(code) {

	// document.write(code);

	document.documentElement.innerHTML = code;
}

function executeCDN() {

	let args = getURLArguments();

	if(args["unitedjs"] != null ||
		args["unitedjsraw"] != null ||
		args["unitedop"] != null ||
		args["unitedopraw"] != null) {

		executeScript();
	}

	if(args["unitedjs"] != null)
		executeJS(makeOnlineRequest(args["unitedjs"], true));

	if(args["unitedjsraw"] != null)
		executeJS(args["unitedjsraw"]);

	if(args["unitedop"] != null)
		executeOP(makeOnlineRequest(args["unitedop"], true));

	if(args["unitedopraw"] != null)
		executeOP(args["unitedopraw"]);

	if(args["html"] != null)
		executeHTML(makeOnlineRequest(args["html"], true));

	if(args["htmlraw"] != null)
		executeHTML(args["htmlraw"]);

	if(args["unitedjs"] == null &&
		args["unitedjsraw"] == null &&
		args["unitedop"] == null &&
		args["unitedopraw"] == null &&
		args["html"] == null &&
		args["htmlraw"] == null) {

		if(linkDoc != null)
			executeHTML(makeOnlineRequest(linkDoc, true));
	}
}

function executeModule(environment) {

	function library(item) {

	}

	Object.assign(library, {
		http: require(linkHTTP),
		io: require(linkIO)
	});

	return library;
}

function fileExists(file, fs) {

    try {

		fs.existsSync(file);
		
        return true;
	}
	
	catch(err) {
		return false;
	}
}

function moduleExists(file, fs) {

	if(fileExists(file, fs))
		return true;

	if(fileExists(file + ".js", fs))
		return true;

	return false;
}

let environment = getEnvironment();
let platform = getPlatform(environment);

var requireDefault = null;

let united = false;

if(typeof require != typeof undefined) {

	requireDefault = require;

	united = require.kaeonUnited;
}

if(environment == "node" && !united) {

	var execSync = require('child_process').execSync;
	var fs = require('fs');

	var installedModules = [
		"assert",
		"buffer",
		"child_process",
		"cluster",
		"crypto",
		"dgram",
		"dns",
		"domain",
		"events",
		"fs",
		"http",
		"https",
		"net",
		"os",
		"path",
		"punycode",
		"querystring",
		"readline",
		"stream",
		"string_decoder",
		"timers",
		"tls",
		"tty",
		"url",
		"util",
		"v8",
		"vm",
		"zlib"
	];

	try {
		installedModules = installedModules.concat(Object.keys(JSON.parse(execSync('npm ls --json').toString()).dependencies));
	}
	
	catch(error) {
		
	}

	try {
		installedModules = installedModules.concat(Object.keys(JSON.parse(execSync('npm ls -g --json').toString()).dependencies));
	}
	
	catch(error) {
		
	}

	if(!installedModules.includes("xmlhttprequest"))
		execSync('npm install xmlhttprequest');

	var xhr = require('xmlhttprequest');

	require = function(path, reload) {

		if(path == "xmlhttprequest")
			return xhr;

		if(path.toLowerCase().endsWith("kaeonunited") || path.toLowerCase().endsWith("kaeonunited.js"))
			return executeModule("node");

		if(reload) {

			if(require.cache[path] != null)
				delete require.cache[path];
		}

		else if(require.cache[path] != null)
			return require.cache[path];

		if(!path.startsWith("http://") && !path.startsWith("https://")) {

			if(moduleExists(path)) {

				try {
		
					let item = requireDefault(path);
					require.cache[path] = item;
		
					return item;
				}
	
				catch(error) {

				}
			}

			else {

				if(!installedModules.includes(path)) {
		
					try {
						execSync('npm install ' + path);
					}
		
					catch(error) {
						console.log(error);
					}
				}

				try {
		
					let item = requireDefault(path);
					require.cache[path] = item;
		
					return item;
				}
	
				catch(error) {

				}
			}
		}

		let data = require.open(path);

		if(require.oneSuite != null)
			data = require.oneSuite.preprocess(data);

		data = "require = arguments[0];var module={exports:{}};" + data + ";return module.exports;";

		require.cache[path] = (new Function(data))(require);

		return require.cache[path];
	}

	require.open = function(path) {

		if(global.platform == "node" &&
			!(path.toLowerCase().startsWith("http://") ||
			path.toLowerCase().startsWith("https://"))) {
			
			return global.fs.readFileSync(path, 'utf8');
		}

		let data = "";

		let rawFile = new xhr.XMLHttpRequest();
		
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

	try {
		require.oneSuite = require(linkONESuite);
	}

	catch(error) {

	}
	
	require.cache = { };

	require.kaeonUnited = true;
}

if(platform == "command")
	executeCommand(process.argv.slice(2));

if(platform == "script")
	executeScript();

if(platform == "cdn")
	executeCDN();

if(platform == "module")
	module.exports = executeModule(environment);

// STUB

// </script>