var fs = require('fs')
var sum = require('../sum.js')
var input = fs.readFileSync('02_input.txt', 'utf-8')

var n = input.split('\n').map(boxToSquareFeet).reduce(sum, 0)
console.log(n)

function boxToSquareFeet(box) {
	var d = box.split('x').map(Number)
	var sides = [
		d[0] * d[1],
		d[1] * d[2],
		d[2] * d[0]
	]
	var slack = Math.min.apply(null, sides)
	return sides.reduce(sum, 0) * 2 + slack
}
