function getTriangleValue(row, col) {
	return (
		(col * (col + 1)) / 2 +
		(row * (row + 1)) / 2 +
		col * (row + 1) + 1
	)
}

function iterate(code) {
	return (code * 252533) % 33554393
}

module.exports = function (input, half) {
	var row = Number(input.match(/row (\d+)/)[1]) - 1    // These numbers are one based
	var col = Number(input.match(/column (\d+)/)[1]) - 1 // The `... - 1` is to make them zero based.

	var location = getTriangleValue(row, col)

	var code = 20151125
	for (var i = 1; i < location; i++) {
		code = iterate(code)
	}
	return code
}
