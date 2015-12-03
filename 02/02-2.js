var sum = require('../sum.js')
var multiply = require('../multiply.js')
var input = require('../get-input')(2)

var n = input.split('\n').map(boxToRibbonLength).reduce(sum, 0)
console.log(n)

function boxToRibbonLength(box) {
	var d = box.split('x').map(Number)
	var bow = d.reduce(multiply, 1)
	var shortestPerimeter = (d.reduce(sum, 0) - Math.max.apply(null, d)) * 2
	return shortestPerimeter + bow
}
