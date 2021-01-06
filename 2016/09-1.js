module.exports = input => {
	let output = ''
	for (var i = 0; i < input.length; i++) {
		if (input[i] !== '(') {
			output += input[i]
		} else {
			const end = input.indexOf(')', i) + 1
			const [ char_count, repeat ] = input.slice(i + 1, end - 1).split('x').map(Number)
			const characters = input.slice(end, end + char_count)
			output += characters.repeat(repeat)
			i = end - 1 + char_count
		}
	}
	return output
}

function assert(compressed, expect_length) {
	const actual_length = module.exports(compressed).length
	if (actual_length !== expect_length) {
		console.error(compressed)
		console.error(`Expected: ${expect_length} -- Actual: ${actual_length}`)
		process.exit(1)
	}
}

assert('ADVENT', 6)
assert('A(1x5)BC', 7)
assert('(3x3)XYZ', 9)
assert('A(2x2)BCD(2x2)EFG', 11)
assert('(6x1)(1x3)A', 6) // part 1
assert('X(8x2)(3x3)ABCY', 18) // part 1
