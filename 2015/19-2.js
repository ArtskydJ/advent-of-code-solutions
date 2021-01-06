module.exports = input => {
	const initialMolecule = input.pop()
	input.pop()

	const replacements = input.map(line => {
		const [ find, replace ] = line.split(' => ')
		return { find, replace }
	})

	const shortestReplacement = Math.min( ...replacements.map(({ replace}) => replace.length) )
	const longestReplacement = Math.max( ...replacements.map(({ replace}) => replace.length) )

	while (true) {
		const count = randomAttempt(initialMolecule, replacements, shortestReplacement, longestReplacement)
		if (count) {
			return count
		}
	}
}

function randomAttempt(molecule, replacements, shortestReplacement, longestReplacement) {
	let steps = 0
	for (let i = 0; i < 500; i++) {
		const findLength = randRange(shortestReplacement, longestReplacement)
		const findIndex = randRange(0, molecule.length - findLength)
		const found = molecule.slice(findIndex, findIndex + findLength)
		const availableReplacements = replacements.filter(({ replace }) => found === replace)

		if (availableReplacements.length) {
			const availableReplacementsIndex = randRange(0, availableReplacements.length - 1)
			const replacement = availableReplacements[availableReplacementsIndex].find
			molecule = molecule.slice(0, findIndex) + replacement + molecule.slice(findIndex + findLength)
			steps++
			i = 0

			if (molecule === 'e') {
				return steps
			}
		}
	}
}

function randRange(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low)
}

// console.log(module.exports([ 'e => H', 'e => O', 'H => HO', 'H => OH', 'O => HH', '', 'HOH' ]))
