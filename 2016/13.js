module.exports = (input, half) => {
	// const FAV_NUM =  10
	// const END = 7004

	const FAV_NUM = Number(input)
	const END = 31039
	const is_open = (x, y) => !((x*x + 3*x + 2*x*y + y + y*y + FAV_NUM).toString(2).replace(/0/g, '').length % 2)
	const key_is_open = key => is_open((key - key % 1000) / 1000, key % 1000)

	const range = n => new Array(n).fill().map((_, i) => i)

	const print = () => {
		const cols = range(50)
		const rows = range(50)
		console.log('  ' + cols.map(col => (' ' + col).slice(-2)).join(''))
		rows.forEach(row => {
			console.log((' ' + row).slice(-2) + ' ' + cols.map(col => is_open(col, row) ? ' .' : ' #').join(''))
		})
	}

	const distances = { 1001: 0 }
	let found_target = false
	const update_distance = (steps, key) => {
		if (key >= 0 && !distances[key] && key_is_open(key)) {
			distances[key] = steps
		}
	}

	let quit = false
	for (let steps = 1; !quit; steps++) {
		Object.entries(distances)
			.filter(([ key, val ]) => val === steps - 1)
			.forEach(([ key, val ]) => {
				key = Number(key)
				update_distance(steps, key - 1000)
				update_distance(steps, key - 1)
				update_distance(steps, key + 1000)
				update_distance(steps, key + 1)
			})

		quit = !half
			? distances[END] // puzzle 1
			: steps >= 50 // puzzle 2
	}

	// print()

	return !half
		? distances[END] // puzzle 1
		: Object.keys(distances).length // puzzle 2
}

