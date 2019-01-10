var module = {
    id: '.',
    exports: { },
    parent: null,
    filename: "",
    loaded: false,
    children: [],
    paths: []
};

function require(path) {
    
    require.cache = require.cache ? require.cache : [[], []];

    if(module.parent != null) {

        if(path.startsWith(".")) {
            
            path =
                module.filename.substring(0, module.filename.lastIndexOf('/') + 1) +
                path;
        }
    }

    let lowerPath = path.toLowerCase();
    let index = require.cache[0].indexOf(lowerPath);

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

        let newModule = {
            id: path,
            exports: { },
            parent: module,
            filename: path,
            loaded: false,
            children: [],
            paths: []
        };

        require.cache[0].push(lowerPath);
        require.cache[1].push(newModule);

        let newModuleContents = (
            new Function(
                "var module = arguments[0];" +
                require.toString() +
                "require.cache = arguments[1];" +
                allText +
                "return module;"
            )
        )(newModule, require.cache);

        for(key in newModuleContents)
            newModule.exports[key] = newModuleContents.exports[key];

        module.children.push(newModule);

        newModule.loaded = true;

        return newModule.exports;
    }

    else
        return require.cache[1][index].exports;
}