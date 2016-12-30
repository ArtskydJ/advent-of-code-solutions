var sum = require('../lib/sum.js')

module.exports = function (input, half) {
	var isNice = [
		function (str) {
			return /([aeiou].*){3}/.test(str) && /(.)\1/.test(str) && !/ab|cd|pq|xy/.test(str)
		},
		function (str) {
			return /(..).*\1/.test(str) && /(.).\1/.test(str)
		}
	]
	return sum(input.map(isNice[half]))
}
