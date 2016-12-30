module.exports = function (input) {
	var computed = input.split('').reduce(function (memo, curr, i) {
		if (!i) memo.field[memo.x + 'x' + memo.y] = true
		memo.x += { '<': -1, '>': 1 }[curr] || 0
		memo.y += { '^': -1, 'v': 1 }[curr] || 0
		memo.field[memo.x + 'x' + memo.y]  = true
		return memo
	}, { x:0, y:0, field: {} })
	return Object.keys(computed.field).length
}
