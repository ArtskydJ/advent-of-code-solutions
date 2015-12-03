var fs = require('fs')
var path = require('path')

module.exports = function getInput(n) {
	n = ('0' + n).slice(-2)
	return fs.readFileSync(path.join(__dirname, n, n + '-input.txt'), 'utf8')
}
