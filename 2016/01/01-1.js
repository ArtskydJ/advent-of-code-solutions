module.exports = function (input) {
	var rays = input.split(', ').reduce(function (memo, curr) {
		var turn = { L: -1, R: 1}[curr[0]]
		var nowHeading = (memo.heading + 4 + turn) % 4
		var distance = Number(curr.slice(1))
		memo[nowHeading] += distance
		memo.heading = nowHeading
		return memo
	}, { 0: 0, 1: 0, 2: 0, 3: 0, heading: 0 })
	return Math.abs(rays[0] - rays[2]) + Math.abs(rays[1] - rays[3])
}
