#!/usr/bin/env node

// <script> document.documentElement.innerHTML = "";

var linkHTTP = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/HTTP%20Utils/httpUtils.js";
var linkIO = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/ioNode.js";
var linkONESuite = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONESuite.js";

var rawLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-United/master/Kaeon%20United/Source/KaeonUnited.js";
var sourceLink = "https://github.com/Gallery-of-Kaeon/Kaeon-United/blob/master/Kaeon%20United/Source/KaeonUnited.js";
var specLink = "https://github.com/Gallery-of-Kaeon/Kaeon-United/tree/master/Kaeon%20United/Specification";

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

function getXMLHTTPRequest() {

	/**
	 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
	 *
	 * This can be used with JS designed for browsers to improve reuse of code and
	 * allow the use of existing libraries.
	 *
	 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
	 *
	 * @author Dan DeFelippi <dan@driverdan.com>
	 * @contributor David Ellis <d.f.ellis@ieee.org>
	 * @license MIT
	 */

	var Url = require("url");
	var spawn = require("child_process").spawn;
	var fs = require("fs");

	var http = require("http");
	var https = require("https");

	let XMLHttpRequqst = function() {

		"use strict";

		var self = this;

		var request;
		var response;

		var settings = {};

		var disableHeaderCheck = false;

		var defaultHeaders = {
			"User-Agent": "node-XMLHttpRequest",
			"Accept": "*/*",
		};

		var headers = {};
		var headersCase = {};

		var forbiddenRequestHeaders = [
			"accept-charset",
			"accept-encoding",
			"access-control-request-headers",
			"access-control-request-method",
			"connection",
			"content-length",
			"content-transfer-encoding",
			"cookie",
			"cookie2",
			"date",
			"expect",
			"host",
			"keep-alive",
			"origin",
			"referer",
			"te",
			"trailer",
			"transfer-encoding",
			"upgrade",
			"via"
		];

		var forbiddenRequestMethods = [
			"TRACE",
			"TRACK",
			"CONNECT"
		];

		var sendFlag = false;
		var errorFlag = false;

		var listeners = {};


		this.UNSENT = 0;
		this.OPENED = 1;
		this.HEADERS_RECEIVED = 2;
		this.LOADING = 3;
		this.DONE = 4;

		this.readyState = this.UNSENT;

		this.onreadystatechange = null;

		this.responseText = "";
		this.responseXML = "";

		this.status = null;
		this.statusText = null;

		this.withCredentials = false;

		var isAllowedHttpHeader = function(header) {
			return disableHeaderCheck || (header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1);
		};

		var isAllowedHttpMethod = function(method) {
			return (method && forbiddenRequestMethods.indexOf(method) === -1);
		};

		this.open = function(method, url, async, user, password) {

			this.abort();

			errorFlag = false;

			if(!isAllowedHttpMethod(method))
				throw new Error("SecurityError: Request method not allowed");

			settings = {
				"method": method,
				"url": url.toString(),
				"async": (typeof async !=="boolean" ? true : async),
				"user": user || null,
				"password": password || null
			};

			setState(this.OPENED);
		};

		this.setDisableHeaderCheck = function(state) {
			disableHeaderCheck = state;
		};

		this.setRequestHeader = function(header, value) {

			if (this.readyState !== this.OPENED)
				throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");

			if(!isAllowedHttpHeader(header)) {

				console.warn("Refused to set unsafe header \"" + header + "\"");

				return;

			}

			if(sendFlag)
				throw new Error("INVALID_STATE_ERR: send flag is true");

			header = headersCase[header.toLowerCase()] || header;

			headersCase[header.toLowerCase()] = header;
			headers[header] = headers[header] ? headers[header] + ', ' + value : value;
		};

		this.getResponseHeader = function(header) {

			if(typeof header === "string" &&
				this.readyState > this.OPENED &&
				response &&
				response.headers &&
				response.headers[header.toLowerCase()] &&
				!errorFlag) {
				
				return response.headers[header.toLowerCase()];
			}

			return null;
		};

		this.getAllResponseHeaders = function() {

			if(this.readyState < this.HEADERS_RECEIVED || errorFlag)
				return "";

			var result = "";

			for(var i in response.headers) {

				if(i !== "set-cookie" && i !== "set-cookie2")
					result += i + ": " + response.headers[i] + "\r\n";
			}

			return result.substr(0, result.length - 2);
		};

		this.getRequestHeader = function(name) {

			if(typeof name === "string" && headersCase[name.toLowerCase()])
				return headers[headersCase[name.toLowerCase()]];

			return "";
		};

		this.send = function(data) {

			if(this.readyState !== this.OPENED)
				throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");

			if(sendFlag)
				throw new Error("INVALID_STATE_ERR: send has already been called");

			var ssl = false, local = false;
			var url = Url.parse(settings.url);

			var host;

			switch (url.protocol) {
				
				case "https:":

					ssl = true;

				case "http:":

					host = url.hostname;

					break;

				case "file:":

					local = true;

					break;

				case undefined:

				case null:

				case "":

					host = "localhost";

					break;

				default:

					throw new Error("Protocol not supported.");
			}

			if(local) {

				if(settings.method !== "GET")
					throw new Error("XMLHttpRequest: Only GET method is supported");

				if(settings.async) {

					fs.readFile(url.pathname, "utf8", function(error, data) {

						if(error)
							self.handleError(error);
						
						else {

							self.status = 200;
							self.responseText = data;

							setState(self.DONE);
						}
					});
				}
				
				else {

					try {

						this.responseText = fs.readFileSync(url.pathname, "utf8");
						this.status = 200;

						setState(self.DONE);
					}
					
					catch (e) {
						this.handleError(e);
					}
				}

				return;
			}

			var port = url.port || (ssl ? 443 : 80);

			var uri = url.pathname + (url.search ? url.search : "");

			for (var name in defaultHeaders) {

				if (!headersCase[name.toLowerCase()])
					headers[name] = defaultHeaders[name];
			}

			headers.Host = host;

			if (!((ssl && port === 443) || port === 80)) {
				headers.Host += ":" + url.port;
			}

			if (settings.user) {

				if (typeof settings.password === "undefined")
					settings.password = "";

				var authBuf = new Buffer(settings.user + ":" + settings.password);

				headers.Authorization = "Basic " + authBuf.toString("base64");
			}

			if(settings.method === "GET" || settings.method === "HEAD") {
				data = null;
			}
			
			else if(data) {

				headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

				if(!headers["Content-Type"])
					headers["Content-Type"] = "text/plain;charset=UTF-8";
			}
			
			else if(settings.method === "POST") {
				headers["Content-Length"] = 0;
			}

			var options = {
				host: host,
				port: port,
				path: uri,
				method: settings.method,
				headers: headers,
				agent: false,
				withCredentials: self.withCredentials
			};

			errorFlag = false;

			if (settings.async) {

				var doRequest = ssl ? https.request : http.request;

				sendFlag = true;

				self.dispatchEvent("readystatechange");

				var responseHandler = function responseHandler(resp) {

					response = resp;

					if(response.statusCode === 301 ||
						response.statusCode === 302 ||
						response.statusCode === 303 ||
						response.statusCode === 307) {
						
						settings.url = response.headers.location;

						var url = Url.parse(settings.url);

						host = url.hostname;

						var newOptions = {
							hostname: url.hostname,
							port: url.port,
							path: url.path,
							method: response.statusCode === 303 ? "GET" : settings.method,
							headers: headers,
							withCredentials: self.withCredentials
						};

						request = doRequest(newOptions, responseHandler).on("error", errorHandler);

						request.end();

						return;
					}

					response.setEncoding("utf8");

					setState(self.HEADERS_RECEIVED);

					self.status = response.statusCode;

					response.on("data", function(chunk) {

						if(chunk)
							self.responseText += chunk;

						if(sendFlag)
							setState(self.LOADING);
					});

					response.on("end", function() {

						if(sendFlag) {

							setState(self.DONE);

							sendFlag = false;
						}
					});

					response.on("error", function(error) {
						self.handleError(error);
					});
				};

				var errorHandler = function errorHandler(error) {
					self.handleError(error);
				};

				request = doRequest(options, responseHandler).on("error", errorHandler);

				if(data)
					request.write(data);

				request.end();

				self.dispatchEvent("loadstart");
			}
			
			else {

				var contentFile = ".node-xmlhttprequest-content-" + process.pid;
				var syncFile = ".node-xmlhttprequest-sync-" + process.pid;

				fs.writeFileSync(syncFile, "", "utf8");

				var execString =
					"var http = require('http'), https = require('https'), fs = require('fs');" +
					"var doRequest = http" + (ssl ? "s" : "") + ".request;" +
					"var options = " + JSON.stringify(options) + ";" +
					"var responseText = '';" +
					"var req = doRequest(options, function(response) {" +
					"response.setEncoding('utf8');" +
					"response.on('data', function(chunk) {" +
					"  responseText += chunk;" +
					"});" +
					"response.on('end', function() {" +
					"fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');" +
					"fs.unlinkSync('" + syncFile + "');" +
					"});" +
					"response.on('error', function(error) {" +
					"fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');" +
					"fs.unlinkSync('" + syncFile + "');" +
					"});" +
					"}).on('error', function(error) {" +
					"fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');" +
					"fs.unlinkSync('" + syncFile + "');" +
					"});" +
					(data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") +
					"req.end();";

				var syncProc = spawn(process.argv[0], ["-e", execString]);

				while(fs.existsSync(syncFile)) {

				}

				var resp = JSON.parse(fs.readFileSync(contentFile, 'utf8'));

				syncProc.stdin.end();

				fs.unlinkSync(contentFile);

				if (resp.err) {
					self.handleError(resp.err);
				}
				
				else {

					response = resp.data;

					self.status = resp.data.statusCode;
					self.responseText = resp.data.text;

					setState(self.DONE);
				}
			}
		};

		this.handleError = function(error) {

			this.status = 0;
			this.statusText = error;
			this.responseText = error.stack;

			errorFlag = true;

			setState(this.DONE);

			this.dispatchEvent('error');
		};

		this.abort = function() {

			if (request) {

				request.abort();

				request = null;
			}

			headers = defaultHeaders;

			this.status = 0;
			this.responseText = "";
			this.responseXML = "";

			errorFlag = true;

			if(this.readyState !== this.UNSENT &&
				(this.readyState !== this.OPENED || sendFlag) &&
				this.readyState !== this.DONE) {

				sendFlag = false;

				setState(this.DONE);
			}

			this.readyState = this.UNSENT;

			this.dispatchEvent('abort');
		};

		this.addEventListener = function(event, callback) {

			if(!(event in listeners))
				listeners[event] = [];

			listeners[event].push(callback);
		};

		this.removeEventListener = function(event, callback) {

			if(event in listeners) {
			
				listeners[event] = listeners[event].filter(function(ev) {
					return ev !== callback;
				});
			}
		};

		this.dispatchEvent = function(event) {

			if(typeof self["on" + event] === "function")
				self["on" + event]();

			if(event in listeners) {

				for(var i = 0, len = listeners[event].length; i < len; i++)
					listeners[event][i].call(self);
			}
		};

		var setState = function(state) {

			if(state == self.LOADING || self.readyState !== state) {

				self.readyState = state;

				if(settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
					self.dispatchEvent("readystatechange");
				}

				if(self.readyState === self.DONE && !errorFlag) {
					self.dispatchEvent("load");
					self.dispatchEvent("loadend");
				}
			}
		};
	};

	return { "XMLHttpRequest": XMLHttpRequqst };
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

function establishNodeRequire() {

	var Module = require("module");

	if(Module.prototype.require.kaeonUnited)
		return;

	var requireDefault = Module.prototype.require;
	var xhr = getXMLHTTPRequest();

	nodeRequire = function(path, reload) {

		if(path == "xmlhttprequest")
			return xhr;

		if(path.toLowerCase().endsWith("kaeonunited") || path.toLowerCase().endsWith("kaeonunited.js"))
			return executeModule("node");

		if(reload) {

			if(nodeRequire.cache[path] != null)
				delete nodeRequire.cache[path];
		}

		else if(nodeRequire.cache[path] != null)
			return nodeRequire.cache[path];

		try {

			let item = nodeRequire.requireDefault(path);
			nodeRequire.cache[path] = item;

			return item;
		}

		catch(error) {

		}

		let data = nodeRequire.open(path);

		if(nodeRequire.oneSuite != null)
			data = nodeRequire.oneSuite.preprocess(data);

		data = "require = arguments[0];var module={exports:{}};" + data + ";return module.exports;";

		nodeRequire.cache[path] = (new Function(data))(Module.prototype.require);

		return nodeRequire.cache[path];
	}

	nodeRequire.open = function(path) {

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

	nodeRequire.requireDefault = requireDefault;
	nodeRequire.cache = { };

	try {
		nodeRequire.oneSuite = require(linkONESuite);
	}

	catch(error) {

	}

	nodeRequire.kaeonUnited = true;
	
	Module.prototype.require = nodeRequire;
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
		require.ONESuite = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONESuite.js");
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

		document.documentElement.innerHTML =
`

<article class="markdown-body entry-content container-lg" itemprop="text"><h1 align="center">Kaeon United</h1>
<h2 align="center">It just works.</h2>
<p align="center">
	<img src="https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/3%20-%20Angaian/1%20-%20Art/1%20-%20Visual/1%20-%20Angaian/Angaian%20Crest.png" style="max-width:15%;"></a>
</p>
<h2 align="center">What is Kaeon United?</h2>
<p>Kaeon United (pronounced "KAI-on") is an API that provides developers access to <a href="https://github.com/Gallery-of-Kaeon/Kaeon-FUSION">Kaeon FUSION</a>,
<a href="https://github.com/Gallery-of-Kaeon/Kaeon-ACE">Kaeon ACE</a>,
the United Suite,
and various other miscellaneous utilities through a single JavaScript interface.</p>
<p>It may be used as a command line utility,
an HTML script,
a CommonJS module,
a Kaeon FUSION interface,
or as a CDN utility for JavaScript and Kaeon FUSION applications.</p>
<p>Its functionality will differ depending on which of the aforementioned options it is used through.</p>
<h2 align="center">API</h2>
<p>The interface to the Kaeon United API is through a single JavaScript File.</p>
<p>To use it, just reference it via the following link:</p>
<pre><code>	` + rawLink + `
</code></pre>
<p>In order to use it as an HTML script,
pass the aforementioned link through the <a href="https://www.jsdelivr.com/" rel="nofollow">jsDelivr CDN</a> or another similar service.</p>
<h2 align="center">Source</h2>
<p>To view the source code for Kaeon United,
click <a href="` + sourceLink + `">here</a>.</p>
<h2 align="center">Specification</h2>
<p>To view the specification for Kaeon United,
click <a href="` + specLink + `">here</a>.</p>

</article>

`;
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

let environment = getEnvironment();
let platform = getPlatform(environment);

if(environment == "node")
	establishNodeRequire();

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