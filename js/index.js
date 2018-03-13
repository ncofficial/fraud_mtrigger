/* Card.js plugin by Jesse Pollak. https://github.com/jessepollak/card */
$('form').card({
    container: '.card-wrapper',
    width: 280,

    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    }
})

var current_history = [[],[],[]]
function mouse_currentXY(e){
	current_history[0]=(current_history[0]).concat([e.clientX])
	current_history[1]=(current_history[1]).concat([e.clientY])
	current_history[2]=(current_history[2]).concat(["time"])
}
$(document).ready(function() {
$("body").attr("onmousemove", "mouse_currentXY(event)")

// Mouse detect neural network

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect
var inputLayer = new Layer(4)
var hiddenLayer = new Layer(6)
var outputLayer = new Layer(1)

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)

var mouseTrigger = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
})

// Loading dataset for network
var fraud_history = [
	[[],[],[]],
	[[],[],[]],
	[[],[],[]],
	[[],[],[]],
	[[],[],[]]
]
var holder_history = [
	[[],[],[]],
	[[],[],[]],
	[[],[],[]],
	[[],[],[]],
	[[],[],[]]
]
var learningRate = .3
for (var i = 0; i < 20000; i++)
{
	// fraud => 1, !fraud => 0
	for(var j = 0; j < fraud_history.lenght; j++){
		mouseTrigger.activate([fraud_history[j]])
		mouseTrigger.propagate(learningRate, [1])
		mouseTrigger.activate(holder_history[j])
		mouseTrigger.propagate(learningRate, [0])
	}
}


// test the network
mouseTrigger.activate(fraud_history[0]) // must be [1]
mouseTrigger.activate(holder_history[0]) // must be [0]

/* Main trigger script */


/* Call main script */

$("#input-button").click(function() {
	//check for count of mousemoves
	if($(current_history[0]).size()!=0){
		$($(".body-text")[0]).text("Good human")
	}else{
		$($(".body-text")[0]).text("Bad robot")
	}
	console.log(current_history)
	console.log(mouseTrigger.activate(current_history))
	$(".body-text").removeClass("none")
	//check by neural network history of mousechanges
})
})