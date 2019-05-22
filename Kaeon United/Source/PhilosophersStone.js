var connections = [];

function call(operation) {

	try {
		return eval("" + operation);
	}
	
	catch(error) {
	
	}
	
	return null;
}

function getConnections(source) {
	
	source = Array.isArray(source) ? source : [source];
	
	let sourceConnections = [];
	
	for(let i = 0; i < connections.length; i++) {
	
		for(let j = 0; j < source.length; j++) {
		
			if(connections[i][0] === source[j]) {
			
				sourceConnections.push(connections[i][1]);
				
				break;
			}
		}
	}
	
	return sourceConnections;
}

function getConnectionPolicies(source, target) {

	for(let i = 0; i < connections.length; i++) {

		if(connections[i][0] === source && connections[i][1] === target)
			return connections[i][2];
	}

	return [];
}

function isConnected(source, target, policies, mutual) {
	
	source = Array.isArray(source) ? source : [source];
	target = Array.isArray(target) ? target : [target];

	policies = Array.isArray(policies) ? policies : [];
	
	for(let i = 0; i < source.length; i++) {
		
		let sourceConnections = getConnections(source[i]);
		
		for(let j = 0; j < target.length; j++) {
			
			if(!sourceConnections.includes(target[j]))
				return false;
			
			let connectionPolicies = getConnectionPolicies(source[i], target[j]);

			if(policies.length != connectionPolicies.length)
				return false;

			for(let i = 0; i < policies.length; i++) {

				if(policies[i] != connectionPolicies[i])
					return false;
			}
		}
	}
	
	return true && (mutual ? isConnected(source, target, false) : true);
}

function connect(source, target, policies, mutual) {
	
	source = Array.isArray(source) ? source : [source];
	target = Array.isArray(target) ? target : [target];

	policies = Array.isArray(policies) ? policies : [];
	
	for(let i = 0; i < source.length; i++) {
		
		for(let j = 0; j < target.length; j++) {
			
			disconnect(source[i], target[j]);

			connections.push([source[i], target[j], policies]);
		}
	}
	
	if(mutual)
		connect(source, target, policies, false);
}

function disconnect(source, target, mutual) {
	
	source = Array.isArray(source) ? source : [source];
	target = Array.isArray(target) ? target : [target];
	
	for(let i = 0; i < connections.length; i++) {
	
		let valid = false;
	
		for(let j = 0; j < source.length && !valid; j++) {
			
			for(let k = 0; k < target.length && !valid; k++)
				valid = connections[i][0] === source[j] && connections[i][1] === target[k];
		}
		
		if(valid) {
			
			connections.splice(i, 1);
			
			i--;
		}
	}
	
	if(mutual)
		disconnect(source, target, false);
}

function traverse(source, path) {

	path = path != null ? path : [];

	if(path.includes(source))
		return;

	path.push(source);
	
	let sourceConnections = getConnections(source);
	
	for(let i = 0; i < sourceConnections.length; i++) {

		let policies = getConnectionPolicies(source, sourceConnections[i]);
		let valid = true;
	
		for(let j = 0; j < policies.length && valid; j++) {

			if(!policies[j](path, sourceConnections[i]))
				valid = false;
		}

		if(valid)
			traverse(sourceConnections[i], path);
	}
	
	return path;
}

function abide(target, medium, override) {

	let multiple = Array.isArray(target);

	target = Array.isArray(target) ? target : [target];
	medium = Array.isArray(medium) ? medium : [medium];

	for(let i = 0; i < target.length; i++) {
		
		for(let j = 0; j < medium.length; j++) {
		
			let keys = Object.keys(medium[j]);
			
			for(let k = 0; k < keys.length; k++) {
			
				target[i][keys[k]] =
					override ?
						medium[j][keys[k]] :
						target[i][keys[k]] == null ?
							medium[j][keys[k]] :
							target[i][keys[k]];
			}
		}
	}

	return multiple ? target : target[0];
}

function retrieve(set, criteria) {
	
	let newSet = set.slice(0);
	
	for(let i = 0; i < newSet.length; i++) {
	
		let valid = true;
	
		for(let j = 0; j < criteria.length && valid; j++)
			valid = criteria[j](newSet[i]);
			
		if(!valid) {
		
			newSet.splice(i, 1);
			
			i--;
		}
	}
	
	return newSet;
}

function standard() {

	this.tags = [];

	this.standard = function(packet) {
		return null;
	}

	this.modify = function(alias, value) {
		this[alias] = value;
	}

	this.serialize = function() {
		return "";
	}

	this.deserialize = function(data) {
		
	}
	
	this.tag = function(tagStrings) {
		
		for(let i = 0; i < tagStrings; i++) {
		
			if(!isTagged(this, tagStrings[i]))
				this.tags.push(tagStrings[i].toLowerCase().replace(" ", ""));
		}
	}
	
	this.untag = function(tagStrings) {
		
		for(let i = 0; i < tagStrings; i++) {
		
			let format = tagStrings[i].toLowerCase().replace(" ", "");

			for(let i = 0; i < this.tags.length && !found; i++) {
				
				if(format == this.tags[i].toLowerCase().replace(" ", "")) {

					this.tags.splice(i, 1);

					i--;
				}
			}
		}
	}
}
	
function isTagged(stone, tagStrings) {

	if(this.tagStrings != null)
		this.tagStrings = Array.isArray(tagStrings) ? tagStrings : [tagStrings];
	
	if(stone == null)
		return false;
	
	for(let i = 0; i < this.tagStrings.length; i++) {
	
		let format = this.tagStrings[i].toLowerCase().replace(" ", "");

		let valid = false;

		for(let j = 0; j < stone.tags.length && valid; j++) {
			
			if(format == stone.tags[i].toLowerCase().replace(" ", ""))
				valid = true;
		}

		if(!valid)
			return false;
	}
	
	return true;
}

function privateConnection(path, connection) {
	return path.length <= 1;
}

module.exports = {

	connections,
	call,
	getConnections,
	getConnectionPolicies,
	isConnected,
	connect,
	disconnect,
	traverse,
	abide,
	retrieve,
	standard,
	isTagged,
	privateConnection
};