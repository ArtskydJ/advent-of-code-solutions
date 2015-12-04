var fs = require('fs')
var path = require('path')

var day = Number(process.argv[2])
var half = Number(process.argv[3])

try {
	console.log(runSolution(day, half))
} catch (_) {
	printUsageAndExit()
}

function runSolution(day, half) {
	if (!day || !half) throw new Error('Expected day and half arguments.')
	day = '/' + ('0' + day).slice(-2)
	half = '' + half
	var fn = require('.' + day + day + '-' + half)
	var inputText = fs.readFileSync(path.join(__dirname, day, day + '-input.txt'), 'utf8')
	return fn(inputText)
}

function printUsageAndExit() {
	console.log('Usage:\nnode aoc <day> <half>')
	process.exit(1)
}
