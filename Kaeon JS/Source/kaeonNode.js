var fs = require('fs');

function open(file) {
	return fs.readFileSync(file, 'utf8');
}

module.exports = {
	open
};