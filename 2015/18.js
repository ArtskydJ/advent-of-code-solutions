var sum = require('./lib/sum.js')

function getFromGrid(grid, x, y) {
	return (x >= 0 && x < 100 && y >= 0 & y < 100) && grid[y][x]
}

function countLitNeighbors(grid, x, y) {
	return (
		Number(getFromGrid(grid, x - 1, y - 1)) +
		Number(getFromGrid(grid, x - 1, y + 1)) +
		Number(getFromGrid(grid, x + 1, y - 1)) +
		Number(getFromGrid(grid, x + 1, y + 1)) +
		Number(getFromGrid(grid, x, y - 1)) +
		Number(getFromGrid(grid, x, y + 1)) +
		Number(getFromGrid(grid, x - 1, y)) +
		Number(getFromGrid(grid, x + 1, y))
	)
}

function iterate(grid) {
	return grid.map(function (row, y) {
		return row.map(function (light, x) {
			var neighbors = countLitNeighbors(grid, x, y)
			return neighbors === 3 || (light && neighbors === 2)
		})
	})
}

function turnOnCorners(grid) {
	grid[0][0] = true
	grid[0][99] = true
	grid[99][0] = true
	grid[99][99] = true
}

module.exports = function (input, half) {
	var grid = input.map(function (line) {
		return line.split('').map(function (char) {
			return char === '#'
		})
	})

	if (half) turnOnCorners(grid)
	for (var i = 0; i < 100; i++) {
		grid = iterate(grid)
		if (half) turnOnCorners(grid)
	}

	return sum(grid.map(function (row) {
		return sum(row)
	}))
}
