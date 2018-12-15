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

function getAtlas(stone, all) {
	
	if(Array.isArray(stone)) {
		
		stone = stone.slice(0);
		
		var atlas = [];
		
		for(var i = 0; i < stone.length; i++)
			atlas = atlas.concat(getAtlas(stone[i], all));
		
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
				getAtlasTraversal(stone.connections[i], atlas, all);
		}
		
		return atlas;
	}
}

function getAtlasTraversal(stone, atlas, all) {

	for(var i = 0; i < atlas.length; i++) {
		
		if(atlas[i] === stone)
			return;
	}
	
	var incoming = all;
	
	if(!all) {
		
		try {
			incoming = stone.onIncoming(atlas);
		}
		
		catch(error) {
			
		}
	}
	
	if(incoming)
		atlas.push(stone);
	
	for(var i = 0; i < stone.connections.length; i++) {
		
		var projectedPath = atlas.slice(0);
		projectedPath.push(stone.connections[i]);
		
		var outgoing = all;
		
		if(!all) {
			
			try {
				outgoing = stone.onOutgoing(projectedPath);
			}
			
			catch(error) {
				
			}
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
		
			stone = stone.slice(0);
		
			if(Array.isArray(connection)) {
		
				connection = connection.slice(0);
			
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
		
			connection = connection.slice(0);
			
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

function disconnect(stone, connection, mutual) {

	if(mutual) {
		disconnect(stone, connection, false);
		disconnect(connection, stone, false);
	}

	else {
	
		if(Array.isArray(stone)) {
		
			stone = stone.slice(0);
		
			if(Array.isArray(connection)) {
		
				connection = connection.slice(0);
			
				for(var i = 0; i < stone.length; i++) {
				
					for(var j = 0; j < connection.length; j++)
						disconnect(stone[i], connection[j], mutual);
				}
			}
			
			else {
			
				for(var i = 0; i < stone.length; i++)
					disconnect(stone[i], connection, mutual)
			}
		}
	
		else if(Array.isArray(connection)) {
		
			connection = connection.slice(0);
			
			for(var i = 0; i < connection.length; i++)
				disconnect(stone, connection[i], mutual)
		}
		
		else {
			
			for(var i = 0; i < stone.connections.length; i++) {
			
				if(stone.connections[i] === connection) {
				
					stone.connections.splice(i, 1);
					
					i--;
				}
			}
			
			for(var i = 0; i < stone.privateConnections.length; i++) {
			
				if(stone.privateConnections[i] === connection) {
				
					stone.privateConnections.splice(i, 1);
					
					i--;
				}
			}
		}
	}
}

function tag(stone, tags) {
	
	if(Array.isArray(stone)) {
		
		stone = stone.slice(0);
		
		for(var i = 0; i < stone.length; i++)
			tag(stone[i], tags);
	}
	
	else {
	
		if(Array.isArray(tags)) {
		
			tags = tags.slice(0);
		
			for(var i = 0; i < tags.length; i++) {
				
				var tag = formatTag(tags[i]);
				
				if(!stone.tags.includes(tag))
					stone.tags.push(tag);
			}
		}
	
		else
			stone.tags.push(formatTag(tags));
	}
}

function detag(stone, tags) {
	
	if(Array.isArray(stone)) {
		
		stone = stone.slice(0);
		
		for(var i = 0; i < stone.length; i++)
			detag(stone[i], tags);
	}
	
	else {
	
		if(!Array.isArray(tags))
			tags = [tags];
			
		else
			tags = tags.slice(0);

		for(var i = 0; i < stone.tags.length; i++) {
			
			var tag = formatTag(stone.tags[i]);
		
			for(var j = 0; j < tags.length; j++) {
			
				if(tag == formatTag(tags[j])) {
				
					stone.tags.splice(i, 1);
					
					i--;
					break;
				}
			}
		}
	}
}

function isConnected(stone, connection, mutual, private) {

	if(mutual) {
	
		return
			isConnected(stone, connection, false, private) &&
			isConnected(connection, stone, false, private);
	}
	
	else {
	
		if(Array.isArray(stone)) {
		
			stone = stone.slice(0);
		
			if(Array.isArray(connection)) {
		
				connection = connection.slice(0);
				
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
		
			connection = connection.slice(0);
			
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
		
		store = store.slice(0);
		
		for(var i = 0; i < stone.length; i++) {
			
			if(!isTagged(stone[i]))
				return false;
		}
		
		return true;
	}
	
	else {
	
		if(!Array.isArray(tags))
			tags = [tags];
	
		for(var i = 0; i < tags.length; i++) {
			
			var found = false;
			
			for(var j = 0; j < stone.tags.length; j++) {
				
				if(formatTag(tags[i]) == formatTag(stone.tags[j])) {
					
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

function get(stones, tags) {
	
	var tagged = [];
	
	for(var i = 0; i < stones.length; i++) {
		
		if(isTagged(stones[i], tags))
			tagged.push(stones[i]);
	}
	
	return tagged;
}

function call(stones, packet) {
	
	var call = [];
	
	for(var i = 0; i < stones.length; i++) {
		
		try {
			
			var value = stones[i].onCall(packet);
			
			if(value != null)
				call.push(value);
		}
		
		catch(error) {
			
		}
	}
	
	return call;
}

function formatTag(tag) {
	
	var newTag = tag.toLowerCase();
	
	for(var i = 0; i < tag.length; i++) {
		
		if(newTag.charAt(i) == " " ||
			newTag.charAt(i) == "\t" ||
			newTag.charAt(i) == "\n") {
		
			newTag = newTag.substring(0, i) + newTag.substring(i + 1);
			
			i--;
		}
	}
	
	return newTag;
}

module.exports = {

	PhilosophersStone,
	getAtlas,
	getAtlasTraversal,
	connect,
	disconnect,
	tag,
	detag,
	isConnected,
	isTagged,
	call,
	get,
	formatTag
};