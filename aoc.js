var fs = require('fs')
var path = require('path')

if (process.argv.length === 4) {
	var year = '2016'
	var day = Number(process.argv[2])
	var half = Number(process.argv[3])
} else {
	var year = process.argv[2]
	var day = Number(process.argv[3])
	var half = Number(process.argv[4])
}
if (year !== '2015' && year !== '2016') printUsageAndExit('year')
if (day < 1 || day > 25 || Math.round(day) !== day) printUsageAndExit('day')
if (half !== 1 && half !== 2) printUsageAndExit('half')

day = '/' + ('0' + day).slice(-2)
var fn = null
try {
	fn = require('./' + year + day + day + '-' + half)
} catch (err) {
	if (err.toString().slice(0, 25) !== 'Error: Cannot find module') throw err
	fn = require('./' + year + day + day)
}

var input = fs.readFileSync(path.join(__dirname, year, day, day + '-input.txt'), 'utf8')
input = /\n/.test(input) ? input.split(/\r?\n/g) : input

console.time('Run time')
console.log(fn(input, half - 1))
console.timeEnd('Run time')

function printUsageAndExit(thing) {
	console.error('Invalid ' + thing)
	console.error('')
	console.error('Usage: node aoc [year] day half')
	console.error('  year is either 2015 or 2016 (defaults to 2016)')
	console.error('  day is a number between 1 and 25')
	console.error('  half is 1 or 2')
	process.exit(1)
}
