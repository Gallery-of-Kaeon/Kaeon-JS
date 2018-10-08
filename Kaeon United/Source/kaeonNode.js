var fs = require('fs');
var readline = require('./modules/readline-sync/readline-sync');

function getInput() {
	return readline.question("");
}

function open(file) {
	return fs.readFileSync(file, 'utf8');
}

function dynamicRequire(path) {
	return require(path);
}

module.exports = {

	getInput,
	open,
	dynamicRequire
};