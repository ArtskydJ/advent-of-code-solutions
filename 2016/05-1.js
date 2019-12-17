var crypto = require('crypto')

module.exports = function (input) {
	var password = ''
	for (var i = 0; true; i++) {
		var md5 = crypto.createHash('md5')
		md5.update(input + i)
		var hash = md5.digest('hex')
		if (hash[0] === '0' && hash[1] === '0' && hash[2] === '0' && hash[3] === '0' && hash[4] === '0') {
			password += hash[5]
			if (password.length >= 8) return password
		}
	}
}
