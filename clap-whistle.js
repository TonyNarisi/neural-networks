// Taken from tutorial here: http://progur.com/2016/09/how-to-create-and-use-neural-networks-in-javascript.html

// Bring in Synaptic library
var synaptic = require('synaptic');

var Neuron    = synaptic.Neuron,
	  Layer     = synaptic.Layer,
	  Network   = synaptic.Network,
	  Trainer   = synaptic.Trainer,
	  Architect = synaptic.Architect

// Create network
var input = new synaptic.Layer(2); 
var output = new synaptic.Layer(3);

input.project(output);

var trainingData = [
	{ input: [1,0], output: [1,0,0] }, // Clap to sit down
	{ input: [0,1], output: [0,1,0] }, // Whistle to run
	{ input: [1,1], output: [0,0,1] }  // Clap and whistle to jump
];

var learningRate = 0.4;

function train() {
	for (var i = 0; i < trainingData.length; i++) {
		input.activate(trainingData[i].input);
		output.activate();
		output.propagate(learningRate, trainingData[i].output);
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
	for (var i = 0; i < 1000; i++) {
		trainingData = shuffle(trainingData);
		train();
	}
}

retrain();

input.activate([0,1]);
var result = output.activate();
console.log("The network should sit down when the user claps, run when the user whistles, and jump when the user both claps and whistles.\n\nWhistle Results \nSit Neuron: " + (result[0] * 100).toFixed(2) + "%");
console.log("Run Neuron: " + (result[1] * 100).toFixed(2) + "%");
console.log("Jump Neuron: " + (result[2] * 100).toFixed(2) + "%\n");

input.activate([1,0]);
var result = output.activate();
console.log("Clap Results \nSit Neuron: " + (result[0] * 100).toFixed(2) + "%");
console.log("Run Neuron: " + (result[1] * 100).toFixed(2) + "%");
console.log("Jump Neuron: " + (result[2] * 100).toFixed(2) + "%\n");

input.activate([1,1]);
var result = output.activate();
console.log("Clap and Whistle Results \nSit Neuron: " + (result[0] * 100).toFixed(2) + "%");
console.log("Run Neuron: " + (result[1] * 100).toFixed(2) + "%");
console.log("Jump Neuron: " + (result[2] * 100).toFixed(2) + "%");