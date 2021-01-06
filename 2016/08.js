const HEIGHT = 6
const WIDTH = 50

module.exports = (input, half) => {
	const line_template = new Array(WIDTH).fill(false)
	const lcd = range(HEIGHT).map(() => line_template.slice())

	input.forEach(line => {
		const [ command, ...args ] = line.split(` `)
		if (command === `rect`) {
			const [ wide, tall ] = args[0].split('x').map(Number)
			range(tall).forEach(i => lcd[i].fill(true, 0, wide))
		} else if (command === `rotate`) {
			let [ direction, index, , count ] = args
			index = Number(index.slice(2))
			count = Number(count)
			if (direction === `row`) {
				const a = lcd[index].slice(-count)
				const b = lcd[index].slice(0, -count)
				lcd[index] = a.concat(b)
			} else if (direction === `column`) {
				range(count).forEach(n => {
					var save = lcd[HEIGHT - 1][index]
					range(HEIGHT - 1).reverse().forEach(i => lcd[i + 1][index] = lcd[i][index])
					lcd[0][index] = save
				})
			}
		}
	})

	if (!half) {
		return lcd.map(line => line.map(Number)).flat().reduce((a, b) => a + b)
	} else {
		return lcd.map(line =>
			line.map(
				(c, i) => (c ? '#' : ' ') + ((i + 1) % 5 ? '' : '     ')
			).join('')
		).join('\n')
	}
}

function range(x) {
	return [ ...Array(x).keys() ]
}
