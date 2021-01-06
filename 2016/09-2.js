const one = require('./09-1.js')
// module.exports = input => {
// 	let result = input.length
// 	const markers = input.matchAll(/\((\d+)x(\d+)\)/g)
// 	Array.from(markers).forEach(([ match, char_count, repeat ]) => result += Number(char_count) * Number(repeat - 1) - match.length)
// 	return result
// }

module.exports = input => {
	let result = input
	while (result.includes('(')) {
		result = one(result)
	}
	return result.length
}



/*
    ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.
    A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.
    (3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.
    A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.
    (6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.
    X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.
*/

function assert(compressed, expect_length) {
	const actual_length = module.exports(compressed)
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
assert('X(8x2)(3x3)ABCY', 20)
assert('(27x12)(20x12)(13x14)(7x10)(1x12)A', 241920)
assert('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN', 445)
