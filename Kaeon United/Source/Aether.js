function call(module, packet) {
	return require(module).onCall(packet);
}

module.exports = {
	call
};