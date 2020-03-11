var ONESuite = require("./ONESuite.js");
var io = require("./io.js");

let operation = process.argv[2].toLowerCase();

let data = null;

if(process.argv[3] != null) {
	
	let flag = process.argv[3].toLowerCase();

	data = flag == "open" ? io.open(process.argv[4]) : process.argv[4];
}

let result = "";

if(operation == "parse")
	result = ONESuite.write(ONESuite.parse(data));

if(operation == "preprocess")
	result = ONESuite.preprocess(data);

if(operation == "process") {

	if(data != null)
		result = ONESuite.process(data);
	
	else {

		let state = { };

		while(true) {

			let input = io.getInput("Enter code (Enter 'q' to quit): ");

			if(input.toLowerCase() == "q")
				break;

			console.log(ONESuite.process(input, state));
		}
	}
}

if(process.argv[5] != null)
	io.save(result, process.argv[5]);

if(result != "")
	console.log(result);