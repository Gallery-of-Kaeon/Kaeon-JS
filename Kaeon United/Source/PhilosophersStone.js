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
	
	if(Array.isArray(stone)) {
		
		var atlas = [];
		
		for(var i = 0; i < stone.length; i++)
			atlas = atlas.concat(getAtlas(stone[i]));
		
		for(var i = 0; i < atlas.length; i++) {
		
			for(var j = 0; j < atlas.length; j++) {
				
				if(atlas[i] === atlas[j]) {
				
					atlas.splice(j, 1);
					
					j--;
				}
			}
		}
		
		return atlas;
	}
	
	else {
		
		var atlas = [stone];
		
		for(var i = 0; i < stone.connections.length; i++) {
			
			var projectedPath = atlas.slice(0);
			projectedPath.push(stone.connections[i]);
			
			if(stone.onOutgoing(projectedPath))
				getAtlasTraversal(stone.connections[i], atlas);
		}
		
		return atlas;
	}
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

function connect(stone, connection, mutual, private) {

	if(mutual) {
		connect(stone, connection, false, private);
		connect(connection, stone, false, private);
	}

	else {
	
		if(Array.isArray(stone)) {
		
			if(Array.isArray(connection)) {
			
				for(var i = 0; i < stone.length; i++) {
				
					for(var j = 0; j < connection.length; j++)
						connect(stone[i], connection[j], mutual, private);
				}
			}
			
			else {
			
				for(var i = 0; i < stone.length; i++)
					connect(stone[i], connection, mutual, private)
			}
		}
	
		else if(Array.isArray(connection)) {
			
			for(var i = 0; i < connection.length; i++)
				connect(stone, connection[i], mutual, private)
		}
		
		else {
		
			if(isConnected(stone, connection, false))
				return;
				
			stone.connections.push(connection);
			
			if(private && !isConnected(stone, connection, true))
				stone.privateConnections.push(connection);
		}
	}
}

function tag(stone, tags) {
	
	if(Array.isArray(stone)) {
		
		for(var i = 0; i < stone.length; i++)
			tag(stone[i], tags);
	}
	
	else {
	
		for(var i = 0; i < tags.length; i++) {
		
			if(stone.tags.includes(tags[i].toLowerCase()))
				stone.tags.push(tags[i]);
		}
	}
}

function isConnected(stone, connection, mutual, private) {

	if(mutual) {
	
		return
			isConnected(stone, connection, private) &&
			isConnected(connection, stone, private);
	}
	
	else {if(Array.isArray(stone)) {
		
			if(Array.isArray(connection)) {
				
				for(var i = 0; i < stone.length; i++) {
				
					for(var j = 0; j < connection.length; j++) {
					
						if(!isConnected(stone[i], connection[j], mutual, private))
							return false;
					}
				}
				
				return true;
			}
			
			else {
			
				for(var i = 0; i < stone.length; i++) {
				
					if(!isConnected(stone[i], connection, mutual, private))
						return false;
				}
						
				return true;
			}
		}
	
		else if(Array.isArray(connection)) {
			
			for(var i = 0; i < connection.length; i++) {
			
				if(!isConnected(stone, connection[i], mutual, private))
					return false;
			}
					
			return true;
		}
		
		else {
		
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
	}
}

function isTagged(stone, tags) {
	
	if(Array.isArray(stone)) {
		
		for(var i = 0; i < stone.length; i++) {
			
			if(!isTagged(stone[i]))
				return false;
		}
		
		return true;
	}
	
	else {
	
		for(var i = 0; i < tags.length; i++) {
			
			var found = false;
			
			for(var j = 0; j < stone.tags.length; j++) {
				
				if(tags[i].toLowerCase() == stone.tags[j].toLowerCase()) {
					
					found = true;
					
					break;
				}
			}
			
			if(!found)
				return false;
		}
		
		return true;
	}
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

module.exports = {

	PhilosophersStone,
	getAtlas,
	getAtlasTraversal,
	connect,
	tag,
	isConnected,
	isTagged,
	call,
	get,
};