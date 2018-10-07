function getPlatform() {
	return (typeof module !== 'undefined' && this.module !== module) ? "Node" : "Browser";
}

function getKaeon() {

	if(getPlatform().toLowerCase() == "browser")
		return require("./kaeonBrowser");

	return require("./kaeonNode");
}

module.exports = {

	getPlatform,
	getKaeon
};