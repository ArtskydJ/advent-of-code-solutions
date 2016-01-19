var sum = require('../lib/sum.js')
var combinations = require('../lib/combinations.js')
// var getQuantumEntanglement = require('../lib/multiply.js')

/*
.reduce(function flatten(arr1, arr2) {
	return arr1.concat(arr2)
}, [])
*/

function iterate(soFar, available, numOfGroups) {
	var groupSize = sum(available) / numOfGroups
	console.log(groupSize)
	var combos = combinations(available.length, 2)
	console.log(combos)

	var groups = combos.map(function (combo) {
		var oks = combo.split('').map(Number)
		return available.filter(function (_, i) {
			return oks[i]
		})
	}).filter(function (list) {
		return sum(list) === groupSize
	}).map(function (group) {
		console.log('group', group)
		var remaining = available.filter(function (x) {
			return group.indexOf(x) === -1
		})
		console.log('remaining', remaining)
		console.log('so far', soFar.concat([group]))
		if (numOfGroups >= 2) {
			if (remaining.length) {
				return iterate(soFar.concat([group]), remaining, numOfGroups - 1)
			} else {
				return '-'
			}
		} else {
			return soFar.concat([group]) // last group
		}
	})/*.reduce(function flatten(memo, arr) {
		for (var i = 0; i < arr.length; i++) {
			memo.push(arr[i])
		}
		return memo
	}, [])*/
	return groups
}

module.exports = function (input, half) {
	// input = input.map(Number)
	input = [ 1, 2, 3, 4, 5, 7, 8, 9, 10, 11 ]
	//input = [ 1, 2, 4, 5 ]

	var groups = iterate([], input, /*3*/ 3)
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
	console.log(require('util').inspect(groups, { depth: 5 }))
	return null // groups
}
