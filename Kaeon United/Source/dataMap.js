/*

	0 <= inputs and outputs <= 1
	pair: [[input 1, input 2, input 3...], output] 
	pairs: [pair 1, pair 2, pair 3...]
	data map vector: [pairs 1, pairs 2, pairs 3...]
	dual data map vector: [value data map vector, size data map vector]

 */

var maxChar = Math.pow(2, 32);

function stringToVector(string) {

	let vector = [];

	for(let i = 0; i < string.length; i++)
		vector.push(string.charCodeAt(i) / maxChar);

	return vector;
}

function vectorToString(vector) {

	let string = "";

	for(let i = 0; i < vector.length; i++)
		string += String.fromCharCode(Math.floor(vector[i] * maxChar));

	return string;
}

function numberToVector(number) {

	let vector = [];
	let binary = number.toString(2);

	for(let i = binary.length - 1; i >= 0; i--)
		vector.push(Number(binary.charAt(i)));

	return vector;
}

function vectorToNumber(vector) {

	let number = 0;
	let base = 1;

	for(let i = 0; i < vector.length; i++) {

		number += vector[i] > .5 ? base : 0;

		base *= 2;
	}

	return number;
}

function binaryCrop(value, size) {

	let number = vectorToNumber(size);

	let crop = value.slice(0);

	if(crop.length > number)
		crop.splice(number);
	
	return crop;
}

function formatDualVector(vector) {

	for(let i = 0; i < 2; i++) {

		if(vector.length <= i)
			vector.push([]);
		
		if(!Array.isArray(vector[i]))
			vector[i] = [];
	}
}

function train(pairs, input, output, correlation) {
	pairs.push([input, output * (correlation != null ? correlation : 1)]);
}

// XP
function normalize(pairs, input) {

	let data = [];

	for(let i = 0; i < pairs.length; i++) {

		let pair = pairs[i].slice(0);

		if(pair.length > input.length)
			pair.splice(input.length);
		
		while(pair.length < input.length)
			pair.push(0);
		
		data.push(pair);
	}

	return data;
}

// XP
function selection(data, input) {
	
	data.total = 0;

	for(let i = 0; i < data.length; i++) {

		data[i].distance = 0;

		for(let j = 0; j < data[i][0].length; j++)
			sum += Math.pow(data[i][0][j] - input[j], 2);
		
		data[i].distance = Math.sqrt(data[i].distance);

		data.total += data.distance;
	}

	data.sort(
		
		function(a, b) {
			return b.distance - a.distance;
		}
	);

	if(data.length > input.length)
		data.splice(input.length);
}

// XP
function calculationFunction(data, input, correlation, total) {
	
	if(data.length == 0)
		return 0;

	let equal = true;

	for(let i = 0; i < input.length && equal; i++) {

		if(input[i] != data[0][i])
			equal = false;
	}

	if(equal)
		return 1;

	let minimum = data[0].distance;

	if(minimum == 0)
		return 0;

	return (1 - (data.distance / total)) * (minimum / data.distance) * data[1] * correlation;
}

// XP
function calculation(data, input, correlation) {

	let sum = 0;

	for(let i = 0; i < data.length; i++)
		sum += calculationFunction(data[i], input, correlation, data.total);

	return sum;
}

// XP
function curveMethod(pairs, input, correlation) {

	let data = normalize(pairs, input);
	selection(data);

	return calculation(data, input, correlation);
}

// XP
function generate(pairs, input, correlation) {
	return curveMethod(pairs, input, correlation);
}

function correlate(pairs, input, output) {
	return 1 - Math.abs(output - generate(pairs, input, 1));
}

function reduce(pairs, size) {

	size = size != null ? size : pairs.length / 2;

	while(pairs.length > size)
		pairs.splice(Math.floor(Math.random() * pairs.length), 1);
}

function trainVector(vector, input, output, correlation) {
	
	for(let i = 0; i < output.length; i++) {

		if(i > vector.length - 1)
			vector.push([]);
		
		train(vector[i], input, output[i], correlation);
	}
}

function generateVector(vector, input, correlation) {

	let output = [];

	for(let i = 0; i < vector.length; i++)
		output.push(generate(vector[i], input, correlation));

	return output;
}

function correlateVector(vector, input, output) {

	let sum = 0;

	for(let i = 0; i < output.length; i++)
		sum += i < vector.length ? correlate(vector[i], input, output[i]) : 0;

	return sum / output.length;
}

function reduceVector(vector, size) {

	for(let i = 0; i < vector.length; i++)
		reduce(vector[i], size);
}

function trainDualVector(vector, input, output, correlation) {

	formatDualVector(vector);

	trainVector(vector[0], input, output, correlation);
	trainVector(vector[1], input, numberToVector(output.length), correlation);
}

function generateDualVector(vector, input, correlation) {

	formatDualVector(vector);

	return binaryCrop(
		generateVector(vector[0], input, correlation),
		generateVector(vector[1], input, correlation));
}

function correlateDualVector(vector, input, output) {

	formatDualVector(vector);

	return correlateVector(
		binaryCrop(
			generateVector(vector[0], input, correlation),
			generateVector(vector[1], input, correlation)),
		output);
}

function reduceDualVector(vector, size) {

	formatDualVector(vector);

	reduceVector(vector[0], size);
	reduceVector(vector[1], size);
}

module.exports = {

	stringToVector,
	vectorToString,
	numberToVector,
	vectorToNumber,
	binaryCrop,
	formatDualVector,
	train,
	generate,
	correlate,
	reduce,
	trainVector,
	generateVector,
	correlateVector,
	reduceVector,
	trainDualVector,
	generateDualVector,
	correlateDualVector,
	reduceDualVector
};