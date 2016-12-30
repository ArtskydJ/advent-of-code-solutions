function getReplacements(initialMolecule) {
	return function (replacement) {
		var find = replacement.find
		var molecules = []
		for (var i = initialMolecule.indexOf(find); i !== -1; i = initialMolecule.indexOf(find, i + 1)) {
			var start = initialMolecule.slice(0, i)
			var end = initialMolecule.slice(i).replace(find, replacement.replace)
			molecules.push(start + end)
		}
		return molecules
	}
}

function x(initialMolecule, replacements, count) {
	var molecules = replacements
		.map(getReplacements(initialMolecule))
		.reduce((memo, curr) => memo.concat(curr), [])

	if (molecules.length === 0) return Infinity

	return molecules.map(function (molecule) {
		if (molecule === 'e') {
			return count
		} else {
			return x(molecule, replacements, count + 1)
		}
	}).reduce((a, b) => a < b ? a : b, Infinity)
}

module.exports = function (input, half) {
	var initialMolecule = input.pop()
	input.pop()

	var replacements = input.map(function (line) {
		var parts = line.split(' => ')
		return { find: parts[1], replace: parts[0] }
	})

	return x(initialMolecule, replacements, 1)
}
