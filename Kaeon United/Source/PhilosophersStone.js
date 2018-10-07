class PhilosophersStone {

	constructor() {
	
		this.connections = [];
		this.privateConnections = [];
		
		this.tags = [];
	}
	
	onCall(packet) {
		return null;
	}
	
	onIncoming(path) {
		return true;
	}
	
	onOutgoing(path) {
		
		if(path.length > 2) {
			
			var stone = path[path.length - 1];
			
			for(var i = 0; i < this.privateConnections.length; i++) {
			
				if(stone === this.privateConnections[i])
					return false;
			}
		}
	
		return true;
	}
}

function getAtlas(stone) {
	
	var atlas = [stone];
	
	for(var i = 0; i < stone.connections.length; i++) {
		
		var projectedPath = atlas.slice(0);
		projectedPath.push(stone.connections[i]);
		
		if(stone.onOutgoing(projectedPath))
			getAtlasTraversal(stone.connections[i], atlas);
	}
	
	return atlas;
}

function getAtlasTraversal(stone, atlas) {

	for(var i = 0; i < atlas.length; i++) {
		
		if(atlas[i] === stone)
			return;
	}
	
	var incoming = false;
	
	try {
		incoming = stone.onIncoming(atlas);
	}
	
	catch(error) {
		
	}
	
	if(incoming)
		atlas.push(stone);
	
	for(var i = 0; i < stone.connections.length; i++) {
		
		var projectedPath = atlas.slice(0);
		projectedPath.push(stone.connections[i]);
		
		var outgoing = false;
		
		try {
			outgoing = stone.onIncoming(projectedPath);
		}
		
		catch(error) {
			
		}
		
		if(outgoing)
			getAtlasTraversal(stone.connections[i], atlas);
	}
}

function call(stone, arg) {
	
	var call = [];
	var atlas = getAtlas(stone);
	
	for(var i = 0; i < atlas.length; i++) {
		
		try {
			
			var obj = atlas[i].onCall(arg);
			
			if(obj != null)
				call.push(obj);
		}
		
		catch(error) {
			
		}
	}
	
	return call;
}

function isTagged(stone, tags) {
	
	for(var i = 0; i < tags.length; i++) {
		
		var found = false;
		
		for(var j = 0; j < stone.tags.length; j++) {
			
			if(
				tags[i].toLowerCase() ==
				stone.tags[j].toLowerCase()) {
				
				found = true;
				
				break;
			}
		}
		
		if(!found)
			return false;
	}
	
	return true;
}

function get(stone, tags) {
	
	var tagged = [];
	var atlas = getAtlas(stone);
	
	for(var i = 0; i < atlas.length; i++) {
		
		if(isTagged(atlas[i], tags))
			tagged.push(atlas[i]);
	}
	
	return tagged;
}

function has(stone, tags) {
	return get(stone, tags).length > 0;
}

function isConnected(stone, connection, private) {
	
	var connections =
		private ?
			stone.privateConnections :
			stone.connections;
	
	for(var i = 0; i < connections.length; i++) {
		
		if(connections[i] === connection)
			return true;
	}
	
	return false;
}

function isConnectedMutually(stone, connection, private) {

	return
		isConnected(stone, connection, private) ||
		isConnected(connection, stone, private);
}

function connect(stone, connection, private) {

	if(isConnected(stone, connection, false))
		return;
		
	stone.connections.push(connection);
	
	if(private && !isConnected(stone, connection, true))
		stone.privateConnections.push(connection);
}

function connectMutually(stone, connection, private) {
	connect(stone, connection, private);
	connect(connection, stone, private);
}

module.exports = {

	PhilosophersStone,
	getAtlas,
	getAtlasTraversal,
	call,
	get,
	has,
	isConnected,
	isConnectedMutually,
	connect,
	connectMutually
};