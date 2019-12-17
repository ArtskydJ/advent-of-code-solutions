module.exports = function (input, half) {
	var splitInput = input.map(splitIntoParts)
	if (half) {
		splitInput = splitInput.map(rotate)
	}
	return splitInput.filter(validTriangle).length
}

function splitIntoParts(line) {
	return line.trim().split(/\s+/).map(Number)
}

function validTriangle(parts) {
	return (parts[0] + parts[1] + parts[2]) - (Math.max.apply(null, parts) * 2) > 0
}

function rotate(curr, i, arr) {
	var x = i % 3
	return [
		arr[i - x + 0][x],
		arr[i - x + 1][x],
		arr[i - x + 2][x]
	]
}
