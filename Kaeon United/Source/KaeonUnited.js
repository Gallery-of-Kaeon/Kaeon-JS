function require(path) {

    require.cache = require.cache ? require.cache : [[], []];

    let lowerPath = path.toLowerCase();
    let index = require.cache[0].indexOf(path.toLowerCase());

    if(index == -1) {

        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", path, false);

        let allText = "";

        rawFile.onreadystatechange = function() {

            if(rawFile.readyState === 4) {

                if(rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                }
            }
        }

        rawFile.send(null);

        let module = (new Function("var module={exports:{}};" + allText + "return module.exports;"))();

        require.cache[0].push(lowerPath);
        require.cache[1].push(module);

        return module;
    }

    else
        return require.cache[1][index];
}