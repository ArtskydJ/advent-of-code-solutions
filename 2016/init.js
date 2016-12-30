var fs = require('fs')
var opn = require('opn')

for(var n = 1; n <= 25; n++) {
	var padded = ('0' + n).slice(-2)
	var dir = __dirname + '/' + padded
	var prefix = dir + '/' + padded + '-'
	fs.mkdirSync(dir)
	fs.writeFileSync(prefix + 'input.txt', '')
	fs.writeFileSync(prefix + '1.js', 'module.exports = function (input) {\n\treturn input\n}\n')
	fs.writeFileSync(prefix + '2.js', 'module.exports = function (input) {\n\treturn input\n}\n')
	opn(prefix + 'input.txt')
}
