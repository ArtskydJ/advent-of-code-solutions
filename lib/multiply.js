module.exports = function multiply(arr) {
	return arr.reduce(function (x, y) {
		return x * y
	}, 1)
}
