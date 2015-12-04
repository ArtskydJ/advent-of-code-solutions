var sum = require('../lib/sum.js')
var multiply = require('../lib/multiply.js')

module.exports = function (input) {
	return input.split('\n').map(boxToRibbonLength).reduce(sum, 0)
}

function boxToRibbonLength(box) {
	var d = box.split('x').map(Number)
	var bow = d.reduce(multiply, 1)
	var shortestPerimeter = (d.reduce(sum, 0) - Math.max.apply(null, d)) * 2
	return shortestPerimeter + bow
}
