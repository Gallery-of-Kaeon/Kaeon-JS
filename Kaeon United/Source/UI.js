var styles = [];

function load() {
	
	for(let i = 0; i < arguments.length; i++) {

		if(!Array.isArray(arguments[i]))
			arguments[i] = [arguments[i]];

		for(let j = 0; j < arguments[i].length; j++) {

			if(arguments[i][j].endsWith(".js"))
				loadScript(arguments[i][j]);

			if(arguments[i][j].endsWith(".css"))
				loadStyle(arguments[i][j]);
		}
	}
}

function loadStyle(path) {
	
	let link = document.createElement("link");

	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", path);

	document.head.appendChild(link);
}

function loadScript(path) {

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", path, false);

	var allText = "";

	rawFile.onreadystatechange = function() {

		if(rawFile.readyState === 4) {

			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}

	rawFile.send(null);
	
	let script = document.createElement("script");
	script.text = allText;
	
	document.head.appendChild(script).parentNode.removeChild(script);
}

function create(tag, className, id) {

	let element = document.createElement(tag);

	if(className != null)
		element.className = className;

	if(id != null)
		element.id = id;

	for(let i = 0; i < styles.length; i++)
		styles[i](element);

	return element;
}

function fill(element, content) {

	element.innerHTML = content;

	return element;
}

function extend(element, child) {

	child = Array.isArray(child) ? child : [child];

	for(let i = 0; i < child.length; i++)
		element.appendChild(child[i]);

	return element;
}

function specify(element, attribute, extend) {

	if(Array.isArray(attribute[0])) {

		for(let i = 0; i < attribute.length; i++) {
		
			element.setAttribute(
				attribute[i][0],
				extend ?
					element.getAttribute(attribute[i][0]) + attribute[i][1] :
					attribute[i][1]);
		}
	}

	else {
	
		element.setAttribute(
			attribute[0],
			extend ?
				element.getAttribute(attribute[0]) + attribute[1] :
				attribute[1]);
	}

	return element;
}

function setStyle(element, styles) {

	if(!Array.isArray(styles)) {
	
		styles = arguments;
		
		if(styles.length > 0) {
		
			styles.splice(0, 1);
			
			if(styles.length == 2)
				styles = [styles];
		}
	}
	
	for(let i = 0; i < styles.length; i++) {
	
		if(!Array.isArray(styles[i]))
			styles[i] = [styles[i]];
	}

	for(let i = 0; i < styles.length; i++) {
	
		let style = styles[i][0];
		let value = styles[i][1];
	
		let result =
			element.style.cssText.match(
				new RegExp(
					"(?:[;\\s]|^)(" +
					style.replace("-", "\\-") +
					"\\s*:(.*?)(;|$))"
				)
			),
			index;
		
		if (result) {
		
			index = result.index + result[0].indexOf(result[1]);
			
			element.style.cssText =
				element.style.cssText.substring(0, index) +
				style + ": " + value + ";" +
				element.style.cssText.substring(index + result[1].length);
		}
		
		else
			element.style.cssText += " " + style + ": " + value + ";";
	}
		
	return element;
}

function get(id, className, tag) {

	if(id != null)
		return document.getElementById(id);
	
	if(className != null)
		return document.getElementsByClassName(className);
	
	if(tag != null)
		return document.getElementsByTagName(tag);
}

function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

function interpolate(value, target, increment) {
	
	if(value == target)
		return value;

	if(value < target) {

		value += increment;
		
		if(value > target)
			value = target;
	}
	
	else if(value > target) {
		
		value -= increment;
		
		if(value < target)
			value = target;
	}

	return value;
}

module.exports = {

	styles,
	load,
	loadStyle,
	loadScript,
	create,
	fill,
	extend,
	specify,
	setStyle,
	get,
	isVisible,
	interpolate
};