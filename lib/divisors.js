module.exports = function divisors(n) {
	if (typeof n !== 'number' || n <= 0) throw new TypeError('Invalid input to `divisors()`. Expected a positive number. Got ' + n + '.')
	var result = []
	for (var i = 1; i <= Math.sqrt(n); i++) {
		if (n % i === 0) {
			result.push(i)
			if (n / i !== i) result.push(n / i)
		}
	}
	return result
}
