module.exports = (input, half) => {
	const registers = {}
	const get_value = x => Number.isNaN(Number(x)) ? (registers[x] || 0) : Number(x)

	if (half) {
		registers.c = 1
	}

	for (var i = 0; i < input.length; i++) {
		const [ command, first, second ] = input[i].split(' ')
		if (command === 'cpy') {
			registers[second] = get_value(first)
		} else if (command === 'jnz') {
			if (get_value(first) !== 0) {
				i += Number(second) - 1 // offset the i++ in the loop
			}
		} else if (command === 'inc') {
			registers[first]++
		} else if (command === 'dec') {
			registers[first]--
		}
		// console.log(registers)
	}
	return registers.a
}
