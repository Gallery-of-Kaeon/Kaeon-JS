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

function getKaeon() {

	if(getPlatform().toLowerCase() == "browser")
		return require("./kaeonBrowser.js");

	return require("./kaeonNode.js");
}

module.exports = {

	getPlatform,
	getKaeon
};