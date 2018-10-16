function getPlatform() {

	if(typeof process === 'object') {

		if(typeof process.versions === 'object') {

			if(typeof process.versions.node !== 'undefined') {
				return "Node";
			}
		}
	}

	return "Browser";
}

if(getPlatform().toLowerCase() == "browser")
	module.exports = require("./kaeonBrowser.js");

else
	module.exports = require("./kaeonNode.js");