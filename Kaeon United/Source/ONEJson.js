var onePlus = require("./ONEPlus.js");

function getContent(content) {

	return content.startsWith("\"") &&
		content.endsWith("\"") &&
		!content.endsWith("\\\"") ?
			content.substring(1, content.length - 1) :
			content;
}

function getObject(element) {

	let content = element.content.toLowerCase().trim();

	if(content == "object") {

		let object = {};

		for(let i = 0; i < element.children.length; i++) {

			if(element.children[i].children.length == 0)
				object[getContent(element.children[i].content)] = null;

			else {

				object[getContent(element.children[i].content)] =
					getObject(element.children[i].children[0]);
			}
		}

		return object;
	}

	if(content == "list" || element.parent == null) {

		let list = [];

		for(let i = 0; i < element.children.length; i++)
			list.push(getObject(element.children[i]));

		if(element.parent == null && list.length == 1)
			return list[0];

		else if(element.parent == null && list.length == 0)
			return null;

		return list;
	}

	if(content == "true")
		return true;

	if(content == "false")
		return false;

	if(!isNaN(content))
		return Number(content);
		
	return getContent(element.content);
}

function processONEJson(data) {
	return JSON.stringify(getObject(onePlus.readONEPlus(data)));
}

module.exports = function(item) {

	try {

	if(typeof item == "string")
		return processONEJson(item);

	item.returnValue = processONEJson(process.argv[2]);

	} catch(error) { return item.returnValue = error.stack; }
};