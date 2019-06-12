let data = require("./io.js").open(process.argv[2])

for(let i = 0; i < data.length; i++) {

	if(data.charCodeAt(i) == 13) {
		data = data.substring(0, i) + data.substring(i + 1);
		i--;
	}
}

console.log(
	require("./ONE.js").writeONE(
		require("./ONEPlus.js").readONEPlus(
			data)));