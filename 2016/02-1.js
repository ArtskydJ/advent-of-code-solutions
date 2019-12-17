module.exports = function (input) {
	var x = 1, y = 1
	return input.map(function (line) {
		line.split('').forEach(function (dir) {
			x = Math.min(2, Math.max(0, x + ({ L: -1, R: 1 }[dir] || 0)))
			y = Math.min(2, Math.max(0, y + ({ U: -1, D: 1 }[dir] || 0)))
		})
		return [[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]][y][x]
	}).join('')
}
