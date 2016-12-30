module.exports = function (input) {
	var x = 0, y = 2
	return input.map(function (line) {
		line.split('').forEach(function (dir) {
			x = Math.min(4 - Math.abs(y - 2), Math.max(Math.abs(y - 2), x + ({ L: -1, R: 1 }[dir] || 0)))
			y = Math.min(4 - Math.abs(x - 2), Math.max(Math.abs(x - 2), y + ({ U: -1, D: 1 }[dir] || 0)))
		})
		return [
			[ ' ', ' ', '1', ' ', ' ' ],
			[ ' ', '2', '3', '4', ' ' ],
			[ '5', '6', '7', '8', '9' ],
			[ ' ', 'A', 'B', 'C', ' ' ],
			[ ' ', ' ', 'D', ' ', ' ' ]
		][y][x]
	}).join('')
}
