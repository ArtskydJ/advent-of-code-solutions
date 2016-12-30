var sum = require('../lib/sum.js')
var combinations = require('../lib/combinations.js')

var LITERS = 150

module.exports = function (input, half) {
	input = input.map(Number)
	return combinations(input.length, 2).reduce(function (memo, curr) {
		var enabledArr = curr.split('').map(Number)
		var containerCount = sum(enabledArr) // '01100010' -> 3

		if (containerCount <= memo.containerCount) {
			var capacity = sum(enabledArr.map((n, i) =>  n * input[i]))

			if (capacity === LITERS) {
				if (containerCount < memo.containerCount) {
					memo.containerCount = containerCount
					memo.permutations = 0
				}
				memo.permutations++
			}
		}
		return memo
	}, { containerCount: Infinity, permutations: 0 }).permutations
}
