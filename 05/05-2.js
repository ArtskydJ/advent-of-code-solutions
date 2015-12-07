var sum = require('../lib/sum.js')

module.exports = function (input) {
	return sum(input.split('\n').map(isNice))
}

function isNice(str) {
	return /(..).*\1/.test(str) && /(.).\1/.test(str)
}
