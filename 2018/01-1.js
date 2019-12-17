module.exports = function (input) {
	return input.map(Number).reduce((a, b) => a + b, 0)
}
