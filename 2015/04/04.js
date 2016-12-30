var crypto = require('crypto')

module.exports = function (input, half) {
	for (var i = 0; true; i++) {
		var md5 = crypto.createHash('md5').update(input + i).digest('hex')
		if (md5.slice(0, 5 + half) === '000000'.slice(0, 5 + half)) return i
	}
}
