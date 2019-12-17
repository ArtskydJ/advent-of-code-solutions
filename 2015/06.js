var sum = require('./lib/sum.js')

module.exports = function (input, half) {
	var grid = []
	for (var i = 0; i < 1000; i++) {
		var row = []
		for (var j = 0; j < 1000; j++) {
			row.push(false)
		}
		grid.push(row)
	}

	input.forEach(function (command) {
		var type = command.replace(/^turn | \d.+/g, '')
		var coords = command.match(/\d+/g).map(Number)
		for (var i = coords[0]; i <= coords[2]; i++) {
			for (var j = coords[1]; j <= coords[3]; j++) {
				if (half === 0) {
					grid[i][j] = { on: true, off: false, toggle: !grid[i][j] }[type]
				} else {
					var newValue = grid[i][j] + { on: 1, off: -1, toggle: 2 }[type]
					grid[i][j] = Math.max(0, newValue)
				}
			}
		}
	})

	return sum(grid.map(sum))
}
