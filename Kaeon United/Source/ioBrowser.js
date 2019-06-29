function getInput(query) {

	if(query != null)
		console.log(query);

	return readline();
}

function open(file) {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);

	return allText;
}

function save(content, file) {
	
}

module.exports = {

	getInput,
	open,
	save
};