var sum = require('./lib/sum.js')
var multiply = require('./lib/multiply.js')

function iterate(k, usedIndexes) {
	var currentPackages = usedIndexes.map(i => k.arr[i])
	var currentSum = sum(currentPackages)
	var currentQe = multiply(currentPackages)

	var lastIndex = usedIndexes[usedIndexes.length - 1]
	var nextIndex = typeof lastIndex === 'number' ? lastIndex + 1 : 0

	var shouldKeepIterating = usedIndexes.length + 1 < k.maxDepth

	var smallestQe = Infinity

	for (var j = nextIndex; j < k.arr.length; j++) {
		var thisSum = currentSum + k.arr[j]
		var thisQe = Infinity

		if (shouldKeepIterating && thisSum < k.targetSum) { // KEEP ITERATING and sum is small enough
			thisQe = iterate(k, usedIndexes.concat(j))
		} else if (!shouldKeepIterating && thisSum === k.targetSum) { // LEAF NODE and valid sum
			thisQe = currentQe * k.arr[j]
		}

		if (thisQe < smallestQe) smallestQe = thisQe
	}

	return smallestQe
}


module.exports = function (input, half) {
	input = input.map(Number)
	//input = [ 1, 2, 3, 4, 5, 7, 8, 9, 10, 11 ]
	var targetSum = sum(input) / (3 + half) // 3 or 4

	var smallestQe = Infinity
	for (var allowDepth = 1; smallestQe === Infinity; allowDepth++) {
		smallestQe = iterate({ arr: input, maxDepth: allowDepth, targetSum: targetSum }, [])
	}
	return smallestQe
}
