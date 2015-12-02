var fs = require('fs')
var input = fs.readFileSync('01_input.txt', 'utf-8')

var arr = input.split('')
var n = 0
for (var i = 0; n >= 0; i++) {
	n += (arr[i] === '(' ? 1 : -1)
}	

console.log(i)
