module.exports = function sum(arr) {
	return arr.reduce(function(x, y) {
		return x + y
	}, 0)
}
