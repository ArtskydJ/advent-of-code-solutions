var fs = require('fs')
var path = require('path')

var day = Number(process.argv[2])
var half = Number(process.argv[3])

if (!day || !half) printUsageAndExit()
day = '/' + ('0' + day).slice(-2)
var fn = null
try {
	fn = require('.' + day + day + '-' + half)
} catch (err) {
	if (err.toString().slice(0, 25) !== 'Error: Cannot find module') throw err
	fn = require('.' + day + day)
}
var input = fs.readFileSync(path.join(__dirname, day, day + '-input.txt'), 'utf8')
input = /\n/.test(input) ? input.split(/\r?\n/g) : input

console.time('Run time')
console.log(fn(input, half - 1))
console.timeEnd('Run time')

function printUsageAndExit() {
	console.error('Usage: node aoc <day> <half>')
	console.error('  <day> is a number between 1 and 25')
	console.error('  <half> is 1 or 2')
	process.exit(1)
}
