function getReplacements(initialMolecule, replacement) {
	var find = replacement.find
	var molecules = []
	for (var i = initialMolecule.indexOf(find); i !== -1; i = initialMolecule.indexOf(find, i + 1)) {
		var start = initialMolecule.slice(0, i)
		var end = initialMolecule.slice(i).replace(find, replacement.replace)
		molecules.push(start + end)
	}
	return molecules
}

module.exports = function (input, half) {
	var initialMolecule = input.pop()
	input.pop()

	var molecules = input.map(function (line) {
		var parts = line.split(' => ')
		return {
			find: parts[0],
			replace: parts[1]
		}
	}).map(getReplacements.bind(null, initialMolecule)).reduce(function concat(memo, curr) {
		return memo.concat(curr)
	}, [])

	return new Set(molecules).size
}
