module.exports = function (input) {
	var computed = input.split('').reduce(function (memo, curr, i) {
		memo[i % 2].x += { '<': -1, '>': 1 }[curr] || 0
		memo[i % 2].y += { '^': -1, 'v': 1 }[curr] || 0
		memo.field[memo[i % 2].x + 'x' + memo[i % 2].y] = true
		return memo
	}, { 0: { x:0, y:0 }, 1: { x:0, y:0 }, field: { '0x0': true } })
	return Object.keys(computed.field).length
}
