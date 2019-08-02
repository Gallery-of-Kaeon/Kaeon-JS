var io = require("./io.js");

function dynamicRequire(path) {
	return ((new Function("module={exports:{}};" + io.open(path) + ";return module.exports;"))());
}

module.exports = {
	dynamicRequire
};