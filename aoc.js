var fs = require('fs')
var path = require('path')

var day = Number(process.argv[2])
var half = Number(process.argv[3])

console.log(runSolution(day, half))

function runSolution(day, half) {
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
	return fn(input, half - 1)
}

function printUsageAndExit() {
	console.log('Usage: node aoc <day> <half>')
	process.exit(1)
}
