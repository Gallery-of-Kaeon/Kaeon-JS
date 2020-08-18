var tokenizer = require("./tokenizer.js");

var cTokens = [
	"auto",
	"double",
	"int",
	"struct",
	"break",
	"else",
	"long",
	"switch",
	"case",
	"enum",
	"register",
	"typedef",
	"char",
	"extern",
	"return",
	"union",
	"const",
	"float",
	"short",
	"unsigned",
	"continue",
	"for",
	"signed",
	"void",
	"default",
	"goto",
	"sizeof",
	"volatile",
	"do",
	"if",
	"static",
	"while",
	"\n",
	"\t",
	" ",
	"=",
	",",
	";",
	".",
	"!",
	"==",
	"!=",
	">=",
	"<=",
	"~",
	"#",
	"\\",
	"&",
	"*",
	"+",
	"-",
	"/",
	"++",
	"--",
	"^",
	"|",
	"_",
	"%",
	"?",
	">",
	"<",
	"[",
	"]",
	"{",
	"}",
	"(",
	")",
	"\"",
	"\'",
	"//",
	"/*",
	"*/"
];

var cppTokens = [
	"asm",
	"bool",
	"catch",
	"class",
	"const_cast",
	"delete",
	"dynamic_cast",
	"explicit",
	"export",
	"false",
	"friend",
	"inline",
	"mutable",
	"namespace",
	"new",
	"operator",
	"private",
	"protected",
	"public",
	"reinterpret_cast",
	"static_cast",
	"template",
	"this",
	"throw",
	"true",
	"try",
	"typeid",
	"typename",
	"using",
	"virtual",
	"wchar_t"
];

var ucTokens = [
	"\`",
	"global",
	"use",
	"var",
	"@"
];

var declarationTokens = [
	"auto",
	"double",
	"int",
	"struct",
	"long",
	"enum",
	"register",
	"typedef",
	"char",
	"extern",
	"union",
	"const",
	"float",
	"short",
	"unsigned",
	"signed",
	"void",
	"volatile",
	"static",
	"bool",
	"class",
	"friend",
	"inline",
	"mutable",
	"namespace",
	"operator",
	"private",
	"protected",
	"public",
	"typename",
	"using",
	"virtual",
	"global",
	"var",
	"#"
];

function formatSequence(sequence) {

	while(sequence[0] == " " ||
		sequence[0] == "\n" ||
		sequence[0] == "\t") {
		
		sequence.splice(0, 1);

		if(sequence.length == 0)
			return null;
	}

	while(sequence[sequence.length - 1] == " " ||
		sequence[sequence.length - 1] == "\n" ||
		sequence[sequence.length - 1] == "\t") {
		
		sequence.splice(sequence.length - 1, 1);
	}

	if(sequence[0] == "#") {

		sequence[sequence.length - 1] == "\n";

		return sequence;
	}

	let inSingleLiteral = false;
	let inDoubleLiteral = false;
	let inMultiLiteral = false;

	for(let i = 0; i < sequence.length; i++) {

		if((inSingleLiteral || inDoubleLiteral || inMultiLiteral) && sequence[i] == "\\") {

			i++;

			continue;
		}

		if(!(inMultiLiteral || inDoubleLiteral) && sequence[i] == "\'")
			inSingleLiteral = !inSingleLiteral;

		if(!(inMultiLiteral || inSingleLiteral) && sequence[i] == "\"")
			inDoubleLiteral = !inDoubleLiteral;

		if(!(inDoubleLiteral || inSingleLiteral) && sequence[i] == "\`") {

			sequence[i] = "\"";

			inMultiLiteral = !inMultiLiteral;
		}

		if(inMultiLiteral) {

			if(sequence[i] == "\n")
				sequence[i] = "\\n";

			if(sequence[i] == "\t")
				sequence[i] = "\\t";
		}

		if(inSingleLiteral || inDoubleLiteral || inMultiLiteral)
			continue;

		if(sequence[i] == " " ||
			sequence[i] == "\n" ||
			sequence[i] == "\t") {

			sequence[i] = " ";

			if(i < sequence.length - 1) {

				while(sequence[i + 1] == " " ||
					sequence[i + 1] == "\n" ||
					sequence[i + 1] == "\t") {

					sequence.splice(i + 1, 1);

					if(i == sequence.length - 1)
						break;
				}
			}
		}
	}

	if(sequence[0] == ";")
		return null;

	return sequence;
}

function formatSequences(sequences) {
	
	for(let i = 0; i < sequences.length; i++) {

		sequences[i] = formatSequence(sequences[i]);

		if(sequences[i] == null) {

			sequences.splice(i, 1);

			i--;
		}
	}

	return sequences;
}

function getSequences(tokens) {

	let spaceTokens = [
		" ",
		"\n",
		"\t"
	];

	let glueTokens = [
		"+",
		"-",
		"*",
		"/",
		"%",
		"=",
		"|",
		"&",
		"?",
		":",
		"<",
		">",
		"@",
	];

	let conditionalTokens = [
		"if",
		"else",
		"while",
		"do",
		"for"
	];

	let sequences = [];

	let nest = 0;
	let innerNest = 0;

	let newLine = true;

	let inSingleLiteral = false;
	let inDoubleLiteral = false;
	let inMultiLiteral = false;

	let glue = false;

	let currentSequence = [];

	let lastToken = "";
	let innerLastToken = "";

	for(let i = 0; i < tokens.length; i++) {

		if((tokens[i] != " " && tokens[i] != "\t") || currentSequence.length > 0)
			currentSequence.push(tokens[i]);

		let escaped = false;

		if(i > 0) {
			
			if(tokens[i - 1] == "\\")
				escaped = true;
		}

		if(tokens[i] == "\'" && !escaped && !(inMultiLiteral || inDoubleLiteral))
			inSingleLiteral = !inSingleLiteral;

		if(tokens[i] == "\"" && !escaped && !(inMultiLiteral || inSingleLiteral))
			inDoubleLiteral = !inDoubleLiteral;

		if(tokens[i] == "\`" && !escaped && !(inDoubleLiteral || inSingleLiteral))
			inMultiLiteral = !inMultiLiteral;

		if(inSingleLiteral || inDoubleLiteral || inMultiLiteral)
			continue;

		if(tokens[i] == "{")
			nest++;

		else if(tokens[i] == "}") {

			nest--;

			if(nest == 0 && innerNest == 0) {

				lastToken = "";
				innerLastToken = "";

				sequences.push(currentSequence);
				currentSequence = [];
			}
		}

		else if(tokens[i] == "(")
			innerNest++;

		else if(tokens[i] == ")")
			innerNest--;

		else if((nest == 0 && innerNest == 0) || conditionalTokens.includes(lastToken)) {

			if(glueTokens.includes(tokens[i]) &&
				!(tokens[i] == ">" &&
					currentSequence.join("").trim().startsWith("#"))) {

				glue = true;
			}
	
			else if(!spaceTokens.includes(tokens[i]))
				glue = false;
	
			if(tokens[i] == "\n" && !glue) {
				newLine = true;
				glue = true;
			}

			if(tokens[i] == ";") {
				sequences.push(currentSequence);
				currentSequence = [];
			}

			else if(newLine && !glue) {

				if(!conditionalTokens.includes(innerLastToken)) {

					if(currentSequence.join("").trim().length > 0) {

						currentSequence[currentSequence.length - 1] = ";";

						sequences.push(currentSequence);
					}

					currentSequence = [tokens[i]];
				}

				newLine = false;
			}
		}

		if(nest == 0 && innerNest == 0 && tokens[i] != ")" && tokens[i].trim().length != 0)
			lastToken = tokens[i];

		if(innerNest == 0 && tokens[i] != ")" && tokens[i].trim().length != 0)
			innerLastToken = tokens[i];
	}

	if(currentSequence[currentSequence.length - 1] != ";" &&
		currentSequence[currentSequence.length - 1] != "}") {

		currentSequence.push(";");
	}

	if(currentSequence.join("").trim().length > 0)
		sequences.push(currentSequence);

	return sequences;
}

function getMainSequence(sequences) {

	for(let i = 0; i < sequences.length; i++) {

		if(sequences[i].length < 5)
			continue;

		if(sequences[i][2] == "main") {

			if(sequences[i][3] == "(" || sequences[i][4] == "(")
				return sequences[i];
		}
	}

	return null;
}

function getUseSequences(sequences) {

	let uses = [];

	for(let i = 0; i < sequences.length; i++) {

		if(sequences[i][0] == "use")
			uses.push(sequences[i]);
	}

	return uses;
}

function getOperationSequences(sequences, declarations) {

	let operations = [];

	for(let i = 0; i < sequences.length; i++) {

		if(declarationTokens.includes(sequences[i][0])) {

			for(let j = 2; j < sequences[i].length; j++) {

				if(sequences[i][j] == "=")
					operations.push(sequences[i].slice(j - 2));

				if(sequences[i][j] == "=" || sequences[i][j] == "{") {

					if(declarations != null)
						declarations.push(sequences[i].slice(0, j).concat([";"]));

					if(sequences[i][j] == "=") {

						sequences.splice(i, 1);

						i--;
					}
						
					break;
				}
			}
		}

		else
			operations.push(sequences[i]);
	}

	return operations;
}

function getFunctionSequences(sequences) {

	let functions = [];

	for(let i = 0; i < sequences.length; i++) {

		if(declarationTokens.includes(sequences[i][0])) {

			for(let j = 2; j < sequences[i].length; j++) {

				if(sequences[i][j] == "=" || sequences[i][j].trim() == "main")
					break;

				if(sequences[i][j] == "{") {

					functions.push(sequences[i].slice(0));

					sequences[i].splice(j);
					sequences[i].push(";");
						
					break;
				}
			}
		}
	}

	return functions;
}

function removeSequences(sequences, remove) {

	let removed = [];

	remove = Array.isArray(remove[0]) ? remove : [remove];

	for(let i = 0; i < sequences.length; i++) {

		for(let j = 0; j < remove.length; j++) {

			if(sequences[i] === remove[j]) {

				removed.push(sequences[i]);

				sequences.splice(i, 1);
				i--;

				break;
			}
		}
	}

	return removed;
}

function processMain(sequences) {

	let mainBody = [];

	let declarations = [];

	let uses = getUseSequences(sequences);
	removeSequences(sequences, uses);

	let mainSequence = getMainSequence(sequences);

	if(mainSequence != null) {

		for(let i = 0; i < mainSequence.length; i++) {

			if(mainSequence[i] == "(") {

				while(mainSequence[i + 1] != ")")
					mainSequence.splice(i + 1, 1);

				mainSequence.splice(i + 1, 1);

				mainSequence[i] = "(int argc, char* argv[])";

				break;
			}
		}

		mainSequence.splice(mainSequence.length - 1, 1);

		removeSequences(sequences, mainSequence);
	}

	else
		mainSequence = ["int main(int argc, char* argv[]){"];

	let operations = getOperationSequences(sequences, declarations);
	removeSequences(sequences, operations);

	for(let i = 0; i < operations.length; i++)
		mainSequence = mainSequence.concat(operations[i]);

	mainSequence.push("}");

	for(let i = 0; i < declarations.length; i++)
		mainBody = mainBody.concat(declarations[i]);
	
	mainBody = mainBody.concat(mainSequence);

	sequences.push(mainBody);

	for(let i = 0; i < uses.length; i++) {

		let current = "";
		
		for(let j = 2; j < uses[i].length; j++) {

			if(current.length > 0 && (uses[i][j].trim() == "," || uses[i][j].trim() == ";")) {

				if(current.trim().startsWith("\""))
					sequences.unshift(["#include " + current.trim() + "\n"]);
	
				else
					sequences.unshift(["#include <" + current.trim() + ">\n"]);

				current = "";
			}

			else
				current += uses[i][j];
		}
	}
}

function getFunctionDeclaration(sequence) {

	for(let i = 0; i < sequence.length; i++) {

		if(sequence[i] == "{")
			return sequence.slice(0, i + 1);
	}
}

function processFunction(tokens, main) {

	let declaration = "";

	if(!main) {

		let declarationSequence = getFunctionDeclaration(tokens);
		tokens = tokens.slice(declarationSequence.length, tokens.length - 1);

		declaration = declarationSequence.join("");
	}

	let sequences = getSequences(tokens);

	let functions = getFunctionSequences(sequences);
	removeSequences(sequences, functions);

	sequences = formatSequences(sequences);

	if(main)
		processMain(sequences);

	for(let i = 0; i < functions.length; i++)
		sequences.push([processFunction(functions[i], false)]);

	let output = [declaration];

	for(let i = 0; i < sequences.length; i++)
		output = output.concat(sequences[i]);

	if(!main)
		output.push("}");

	return output.join("");
}

function filterComments(tokens) {

	let inComment = false;
	let inMultiComment = false;

	let inLiteral = false;
	let inMultiLiteral = false;

	for(let i = 0; i < tokens.length; i++) {

		if(inLiteral || inMultiLiteral) {

			if(tokens[i] == "\\") {

				i++;

				continue;
			}
		}

		else {

			if(tokens[i] == "//")
				inComment = true;

			else if(!inComment && tokens[i] == "/*")
				inMultiComment = true;
		}

		let remove = inComment || inMultiComment;

		if(!remove) {

			if(tokens[i] == "\"")
				inLiteral = !inLiteral;

			if(tokens[i] == "\`")
				inMultiLiteral = !inMultiLiteral;
		}

		else {
			
			if(inComment && tokens[i] == "\n")
				inComment = false;

			else if(inMultiComment && tokens[i] == "*/")
				inMultiComment = false;

			tokens.splice(i, 1);

			i--;
		}
	}

	return tokens;
}

function getIndex(state, alias) {

	for(let i = state.length - 1; i >= 0; i--) {

		for(let j = state[i].length - 1; j >= 0; j--) {
			
			if(state[i][j][0] == alias)
				return state[i][j][1];
		}
	}

	return -1;
}

function getType(sequence) {
		
	if(sequence.includes("\"")) {

		return "char[" +
			(
				sequence.
					join("").split("\\").
					join("").split("\r").
					join("").
					trim().
					length - 2
			) +
			"]";
	}

	if(sequence.includes("\'"))
		return "char";

	if(sequence.includes("."))
		return "double";

	for(let i = 0; i < sequence.length; i++) {

		if(!isNaN(sequence[i]) && sequence[i] != " ")
			return "signed int";
	}

	return null;
}

function processOutput(input) {

	let tokens = 
		tokenizer.tokenize(
			cTokens.concat(cppTokens).concat(ucTokens),
			input
		);

	let inLiteral = false;

	let lastToken = "";
	let nest = 0;

	for(let i = 0; i < tokens.length; i++) {

		if(inLiteral && tokens[i] == "\\") {

			i++;

			continue;
		}

		if(tokens[i] == "\"")
			inLiteral = !inLiteral;

		if(inLiteral)
			continue;
		
		if(tokens[i] == "bool")
			tokens[i] = "int";
		
		if(tokens[i] == "true")
			tokens[i] = "1";
	
		if(tokens[i] == "false")
			tokens[i] = "0";

		if(tokens[i] == "@")
			tokens[i] = "&";

		if(tokens[i] == "{")
			nest++;

		if(tokens[i] == "}") {

			nest--;
			
			if(lastToken == ")")
				tokens[i] = ";}";
		}

		if(nest == 0 && tokens[i].trim().length != 0)
			lastToken = tokens[i];
	}

	inLiteral = false;
	
	let state = [[]];

	for(let i = 0; i < tokens.length; i++) {

		if(inLiteral && tokens[i] == "\\") {

			i++;

			continue;
		}

		if(tokens[i] == "\"")
			inLiteral = !inLiteral;

		if(tokens[i] == "{" ||tokens[i] == "(")
			state.push([]);

		if(tokens[i] == "}" ||tokens[i] == ")")
			state.splice(state.length - 1, 1);

		if(inLiteral ||
			tokens[i] == "\"" ||
			tokens[i] == "{" ||
			tokens[i] == "}") {

			continue;
		}

		if(tokens[i] == "var") {

			tokens[i] = "void*";

			state[state.length - 1].push([tokens[i + 2].trim(), i]);
		}

		if(tokens[i] == "=") {
			
			let alias = tokens[i - 1] == " " ? tokens[i - 2] : tokens[i - 1];
			let index = getIndex(state, alias);

			if(index == -1)
				continue;

			let end = i + 2;

			let inSequenceLiteral = false;

			for(; end <= tokens.length; end++) {

				if(inSequenceLiteral && tokens[end] == "\\")
					continue;

				if(tokens[end] == "\"")
					inSequenceLiteral = !inSequenceLiteral;
				
				if(inSequenceLiteral)
					continue;

				if(tokens[end] == ";")
					break;
			}

			let type = getType(tokens.slice(i + 1, end));

			if(type != null) {

				let size = null;

				if(type.includes("[")) {

					size = type.substring(type.indexOf("["));
					
					type = type.substring(0, type.indexOf("["));
				}

				tokens[index] = type;

				if(size != null)
					tokens[index + 2] += size;
			}
		}
	}

	return tokens.join("");
}

function processUnitedC(input) {

	return processOutput(
		processFunction(
			filterComments(
				tokenizer.tokenize(
					cTokens.concat(cppTokens).concat(ucTokens),
					input
				)
			),
			true
		)
	);
}

module.exports = function(item) {

	if(typeof item == "string")
		return processUnitedC(item);

	item.returnValue = processUnitedC(process.argv[2]);
};