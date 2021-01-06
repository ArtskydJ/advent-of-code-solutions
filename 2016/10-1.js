module.exports = input => {

	const LO_COMPARE = 17
	const HI_COMPARE = 61

	// const LO_COMPARE = 2
	// const HI_COMPARE = 5
	// input = [
	// 	`value 5 goes to bot 2`,
	// 	`bot 2 gives low to bot 1 and high to bot 0`,
	// 	`value 3 goes to bot 1`,
	// 	`bot 1 gives low to output 1 and high to bot 0`,
	// 	`bot 0 gives low to output 2 and high to output 0`,
	// 	`value 2 goes to bot 2`,
	// ]

	const locations = {}
	const push_location = (location, value) => {
		if (!locations[location]) {
			locations[location] = []
		}
		locations[location].push(Number(value))
		if (locations[location].length > 2) {
			throw new Error(`hmm i need to change`)
		}
	}

	input = input
		.filter(command => {
			if (!command.startsWith(`value`)) {
				return true
			}
			const [ , value, location ] = command.match(/^value (\d+) goes to ([\w ]+)$/)
			push_location(location, value)
		})

	// console.log(locations)


	let responsible = ''
	while (!responsible) {
		input = input
			.filter(command => {
				const [ , source, lo_dest, hi_dest ] = command.match(/^(bot \d+) gives low to ([\w ]+) and high to ([\w ]+)$/)
				if (
					(locations[source]?.length === 2)
					&& (!lo_dest.startsWith(`bot`) || !locations[lo_dest] || locations[lo_dest].length < 2)
					&& (!hi_dest.startsWith(`bot`) || !locations[hi_dest] || locations[hi_dest].length < 2)
				) {
					const [ lo_num, hi_num ] = locations[source].sort()

					if (lo_num === LO_COMPARE && hi_num === HI_COMPARE) {
						if (responsible) {
							throw new Error(`Tried to assign responsible twice. First: ${responsible}, Second: ${source}`)
						}
						responsible = source
						// console.log(`${source} is responsible for comparing ${LO_COMPARE} and ${HI_COMPARE}`)
					}

					push_location(lo_dest, lo_num)
					push_location(hi_dest, hi_num)
					locations[source] = []
					// console.log(`doing "${command}"`)
					// console.log(JSON.stringify(locations))
					return false
				}
				// console.log(`skipping "${command}"`)
				return true
			})
	}
	return responsible
}
