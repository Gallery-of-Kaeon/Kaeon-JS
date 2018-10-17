var fs = require('fs');
var readline = require('./modules/readline-sync/readline-sync');

function getPlatform() {
	return "Node";
}

function getInput() {
	return readline.question("");
}

function open(file) {
	return fs.readFileSync(file, 'utf8');
}

module.exports = {

	getPlatform,
	getInput,
	open
};