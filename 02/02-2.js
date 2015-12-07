var sum = require('../lib/sum.js')
var multiply = require('../lib/multiply.js')

module.exports = function (input) {
	return sum(input.split('\n').map(boxToRibbonLength))
}

function boxToRibbonLength(box) {
	var d = box.split('x').map(Number)
	var bow = multiply(d)
	var shortestPerimeter = (sum(d) - Math.max.apply(null, d)) * 2
	return shortestPerimeter + bow
}
