function has3Incrementing(str) {
	var result = false
	for (var i = 0; i < str.length - 2; i++) {
		if (str.charCodeAt(i) === str.charCodeAt(i + 1) - 1 &&
			str.charCodeAt(i) === str.charCodeAt(i + 2) - 2) result = true
	}
	return result
}

function valid(str) {
	return !/[ilo]/.test(str) &&
		/(.)\1.*(.(?!\1))\2/.test(str) &&
		has3Incrementing(str)
}

function increment(arr, index) {
	if (typeof arr === 'string') arr = arr.split('')
	if (typeof index === 'undefined') index = arr.length - 1
	arr[index] = String.fromCharCode(arr[index].charCodeAt(0) + 1)
	if (arr[index] === '{' && index > 0) {
		increment(arr, index - 1)
	}
	return arr.join('').replace(/\{/g, 'a')
}

module.exports = function findNext(input, half) {
	while (!valid(input)) {
		input = increment(input)
	}
	if (half) { // second half
		input = findNext(increment(input))
	}
	return input
}
