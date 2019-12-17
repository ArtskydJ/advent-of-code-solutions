function sixteenBit(n) {
	return (n + 65536) % 65536
}

function process(instructions, wires) {
	return instructions.reduce(function (memo, instruction) {
		var matched = instruction.match(/(?:(?:(?:(\w+) )?(\w+) )?(\w+)) -> (\w+)/)

		var l = memo.wires[matched[1]]
		if (typeof l === 'undefined') l = Number(matched[1])

		var op = matched[2]

		var r = memo.wires[matched[3]]
		if (typeof r === 'undefined') r = Number(matched[3])

		var target = matched[4]

		if (!isNaN(r) && (op === undefined || op === 'NOT' || !isNaN(l))) {
			if (!memo.wires[target]) memo.wires[target] = sixteenBit({
				undefined: r,
				AND: l & r,
				OR: l | r,
				LSHIFT: l << r,
				RSHIFT: l >> r,
				NOT: ~r
			}[op])
		} else {
			memo.instructions.push(instruction)
		}
		return memo
	}, { instructions: [], wires: wires || {} })
}

module.exports = function (input, half) {
	var memo = process(input)
	while (memo.instructions.length) {
		memo = process(memo.instructions, memo.wires)
	}
	if (half) { // second half
		var a = memo.wires.a
		memo = { instructions: input, wires: { b: a } }
		while (memo.instructions.length) {
			memo = process(memo.instructions, memo.wires)
		}
	}
	return memo.wires.a
}
