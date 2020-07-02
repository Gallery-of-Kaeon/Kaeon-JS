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

if(global.platform == "node") {

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
}

try {

	let code = global.open("./source.op");
	
	if(global.oneSuite != null)
		code = global.oneSuite.preprocess(code);

	global.oneSuite.process(code);
}

catch(error) {
	console.log(error);
}

try {

	let code = global.open("./source.js");
	
	if(global.oneSuite != null)
		code = global.oneSuite.preprocess(code);

	eval(
		"(async () => {\n" +
		code +
		"\n})();"
	);
}

catch(error) {
	console.log(error);
}