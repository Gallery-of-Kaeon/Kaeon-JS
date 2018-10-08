// FOR A JAVASCRIPT PROJECT, REPLACE ALL CODE WITH THE DESIRED JAVASCRIPT.
// FOR A KAEON FUSION PROJECT, LEAVE THE FILE AS IS.

var kaeonFUSION = require("./KaeonFUSION.js");
var fusion = new kaeonFUSION.KaeonFUSION();

var kaeon = require("./kaeon.js").getKaeon();
var data = kaeon.open("./index.op");

for(var i = 0; i < data.length; i++) {

	if(data.charCodeAt(i) == 13) {
		data = data.substring(0, i) + data.substring(i + 1);
		i--;
	}
}

fusion.process(require("./ONEPlus.js").readONEPlus(data));