var http = require('http')

module.exports = function getInput(day, cb) {
	http.get('http://adventofcode.com/day/' + day + '/input', function (res) {
		var str = ''
		res.on('data', function (buf) {
			str += buf.toString()
		})
		res.on('error', function (err) {
			throw err
		})
		res.on('end', function () {
			return console.log(require('util').inspect(res, {depth: 0}))
			if (res.statusCode === 200) {
				cb(res)
			} else {
				throw new Error('Recieved a ' + res.statusCode + ' status code, expected a 200 status code.')
			}
		})
	})
}