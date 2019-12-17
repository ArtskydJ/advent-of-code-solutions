module.exports = function (input) {
	return input.split(', ').reduce(function (memo, curr) {
		var turn = { L: -1, R: 1 }[curr[0]]
		memo.heading = (memo.heading + 4 + turn) % 4
		var distance = Number(curr.slice(1))

		for (var i = 1; i <= distance; i++) {
			memo.x += [ 0, 1, 0, -1 ][memo.heading]
			memo.y += [ -1, 0, 1, 0 ][memo.heading]
			var location = memo.x + ',' + memo.y
			if (memo.visited.has(location) && !memo.firstVisitedTwiceDistance) {
				memo.firstVisitedTwiceDistance = Math.abs(memo.x) + Math.abs(memo.y)
			}
			memo.visited.add(location)
			//console.log(location)
		}
		return memo
	}, { visited: new Set(), heading: 0, x: 0, y: 0, firstVisitedTwiceDistance: '' }).firstVisitedTwiceDistance
}
