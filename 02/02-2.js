var fs = require('fs')
var sum = require('../sum.js')
var multiply = require('../multiply.js')
var input = fs.readFileSync('02_input.txt', 'utf-8')

var n = input.split('\n').map(boxToRibbonLength).reduce(sum, 0)
console.log(n)

function boxToRibbonLength(box) {
	var d = box.split('x').map(Number)
	var bow = d.reduce(multiply, 1)
	var shortestPerimeter = (d.reduce(sum, 0) - Math.max.apply(null, d)) * 2
	return shortestPerimeter + bow
}
