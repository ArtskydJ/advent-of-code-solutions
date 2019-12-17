var fs = require('fs')
var path = require('path')

const [ year, day, half ] = process.argv.slice(2).map(Number)

if (year < 2015 || year > 2025) printUsageAndExit('year')
if (day < 1 || day > 25 || Math.round(day) !== day) printUsageAndExit('day')
if (half !== 1 && half !== 2) printUsageAndExit('half')

const paddedDay = '/' + ('0' + day).slice(-2)
var fn = null
try {
	fn = require('./' + year + paddedDay + '-' + half)
} catch (err) {
	if (err.toString().slice(0, 25) !== 'Error: Cannot find module') throw err
	fn = require('./' + year + paddedDay)
}

var input = fs.readFileSync(path.join(__dirname, '' + year, paddedDay + '-input.txt'), 'utf8')
input = /\n/.test(input) ? input.split(/\r?\n/g) : input

console.time('Run time')
console.log(fn(input, half - 1))
console.timeEnd('Run time')

function printUsageAndExit(thing) {
	console.error('Invalid ' + thing)
	console.error('')
	console.error('Usage: node aoc year day half')
	console.error('  year is 2015 or greater')
	console.error('  day is a number between 1 and 25')
	console.error('  half is 1 or 2')
	process.exit(1)
}
