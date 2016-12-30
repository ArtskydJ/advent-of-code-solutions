var sum = require('../lib/sum.js')

var LITERS = 150

function x(availableContainers, previousSum) {
	return sum(availableContainers.map(function (container, i) {
		var currentSum = previousSum + container
		if (currentSum < LITERS) {
			return x(availableContainers.slice(i + 1), currentSum)
		} else {
			return Number(currentSum === LITERS)
		}
	}))
}

module.exports = function (input, half) {
	return x(input.map(Number), 0)
}
