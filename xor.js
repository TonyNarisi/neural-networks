var synaptic = require('synaptic');

var Neuron    = synaptic.Neuron,
	  Layer     = synaptic.Layer,
	  Network   = synaptic.Network,
	  Trainer   = synaptic.Trainer,
	  Architect = synaptic.Architect

var input = new synaptic.Layer(2);
var hidden = new synaptic.Layer(3);
var output = new synaptic.Layer(1);

input.project(hidden);
hidden.project(output);

var network = new Network({
	input: input,
	hidden: [hidden],
	output: output
});

var trainingData = [
	{ input: [0,0], output: [1] },
	{ input: [0,1], output: [0] },
	{ input: [1,0], output: [0] },
	{ input: [1,1], output: [1] }
]

var learningRate = 0.3;

function train() {
	for (var i = 0; i < trainingData.length; i++) {
		network.activate(trainingData[i].input);
		network.propagate(learningRate, trainingData[i].output);
	}
}

function shuffle(arr) {
	var reps = arr.length;
	for (var i = 0; i < reps; i++) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

function retrain() {
	for (var i = 0; i < 5000; i++) {
		trainingData = shuffle(trainingData);
		train();
	}
}

retrain();

var result = network.activate([0,0]);
var eq = result[0] * 100 > 50;
console.log("Input: 0,0\nOutput " + (eq ? (result[0] * 100).toFixed(2) : ((1 - result[0]) * 100).toFixed(2)) + "% sure the two are " + (eq ?  "" : "in") + "equivalent.\n");

var result = network.activate([0,1]);
var eq = result[0] * 100 > 50;
console.log("Input: 0,1\nOutput " + (eq ? (result[0] * 100).toFixed(2) : ((1 - result[0]) * 100).toFixed(2)) + "% sure the two are " + (eq ?  "" : "in") + "equivalent.\n");

var result = network.activate([1,0]);
var eq = result[0] * 100 > 50;
console.log("Input: 1,0\nOutput " + (eq ? (result[0] * 100).toFixed(2) : ((1 - result[0]) * 100).toFixed(2)) + "% sure the two are " + (eq ?  "" : "in") + "equivalent.\n");

var result = network.activate([1,1]);
var eq = result[0] * 100 > 50;
console.log("Input: 1,1\nOutput " + (eq ? (result[0] * 100).toFixed(2) : ((1 - result[0]) * 100).toFixed(2)) + "% sure the two are " + (eq ?  "" : "in") + "equivalent.\n");