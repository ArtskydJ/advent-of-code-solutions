var sum = require('../lib/sum.js')
var multiply = require('../lib/multiply.js')

function generate(all, depth, arr, remaining) {
	if (depth > 1) {
		for (var i = 0; i <= remaining; i++) {
			generate(all, depth - 1, arr.concat(i), remaining - i)
		}
	} else {
		all.push(arr.concat(remaining))
	}
}

function range(n) {
	var arr = []
	for (var i = 0; i < n; i++) {
		arr.push(i)
	}
	return arr
}

function max(arr) {
	return arr.reduce(function (largest, curr) {
		return largest > curr ? largest : curr
	}, -Infinity)
}

module.exports = function (input, half) {
	var scores = input.map(function (str) {
		return str.match(/(-?\d+)/g).map(Number)
	})
	var scoreRange = range(scores[0].length)

	var all = []
	generate(all, scores.length, [], 100)

	return max(all.map(function (sequence) {
		var ingredientScores = scoreRange.map(function (i) {
			return Math.max(0, sum(sequence.map(function (a, j) {
				return scores[j][i] * a
			})))
		})
		var calorieScore = ingredientScores.pop()
		if (half && calorieScore !== 500) return 0
		return multiply(ingredientScores)
	}))
}
