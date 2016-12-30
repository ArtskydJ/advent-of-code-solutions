module.exports = function (input) {
	return input.split('').reduce(function (memo, curr) {
		return memo + (curr === '(' ? 1 : -1)
	}, 0)
}
