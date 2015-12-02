var fs = require('fs')
var input = fs.readFileSync('01_input.txt', 'utf-8')

var n = input.split('').reduce(function (memo, curr) {
	return memo + (curr === '(' ? 1 : -1)
}, 0)

console.log(n)
