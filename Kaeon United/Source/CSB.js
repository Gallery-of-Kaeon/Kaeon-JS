function processCSB(string) {

	let assembly = [];

	string = string.split(" ").join("").split("\t").join("").split("\n");

	for(let i = 0; i < string.length; i++) {

		if(string[i].trim().length != 0)
			assembly.push(parseInt(string[i].trim(), 2));
	}

	return assembly;
}

function disassembleCSB(data) {

	let string = "";

	for(let i = 0; i < data.length; i++)
		string += data[i].toString(2) + (i < data.length - 1 ? "\n" : "");

	return string;
}

module.exports = function(item) {

	if(typeof item == "string")
		return processCSB(item);

	item.returnValue = processCSB(process.argv[2]);
};

module.exports.disassemble = disassembleCSB;