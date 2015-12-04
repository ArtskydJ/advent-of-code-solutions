var crypto = require('crypto')

module.exports = function (input) {
	for (var i = 0; true; i++) {
		if (crypto.createHash('md5').update(input + i).digest('hex').slice(0, 6) === '000000') return i
	}
}
