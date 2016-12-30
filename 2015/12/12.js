var sum = require('../lib/sum.js')

module.exports = function (input, half) {
	return (function iterate(obj) {
		var values = Object.keys(obj).map(key => obj[key])
		var result = 0
		if (typeof obj === 'number') {
			result = obj
		} else if (typeof obj === 'object' && (Array.isArray(obj) || half === 0 || values.indexOf('red') === -1)) {
			result = sum( values.map(iterate) )
		}
		return result
	})(JSON.parse(input))
}
