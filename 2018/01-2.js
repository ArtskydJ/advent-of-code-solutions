module.exports = function (input) {
	const inp = input.map(Number)
	var idx = 0
	var freq = 0
	var state = {} // { '0': 1 }
	while (! state[ freq ] ) {
		state[ freq ] = true
		freq += inp[ idx ]
		idx = (idx + 1) % inp.length
	}
	return freq
}
