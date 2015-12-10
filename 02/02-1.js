var sum = require('../lib/sum.js')

module.exports = function (input) {
	return sum(input.map(boxToSquareFeet))
}

function boxToSquareFeet(box) {
	var d = box.split('x').map(Number)
	var sides = [
		d[0] * d[1],
		d[1] * d[2],
		d[2] * d[0]
	]
	var slack = Math.min.apply(null, sides)
	return sum(sides) * 2 + slack
}
