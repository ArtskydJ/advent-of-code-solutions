var sum = require('../lib/sum.js')

function getLengths(arr) {
	return sum(arr.map(function (str) {
		return str.length
	}))
}

function encode(str) {
	return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
}

module.exports = function (input, half) {
	return half === 0 ?
		getLengths(input) - getLengths(input.map(eval)) : // first
		getLengths(input.map(encode)) - getLengths(input) // second
}
