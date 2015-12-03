var input = require('../get-input')(1)

var n = input.split('').reduce(function (memo, curr) {
	return memo + (curr === '(' ? 1 : -1)
}, 0)

console.log(n)
