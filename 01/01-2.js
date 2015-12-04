module.exports = function (input) {
	for (var i = 0, n = 0; n >= 0; i++) {
		n += (input[i] === '(' ? 1 : -1)
	}
	return i
}
