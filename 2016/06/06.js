module.exports = function (input, day) {
	return input[0].split('').map(function (_, index) {
		return input.reduce(function (counts, scrambled) {
			var letter = scrambled[index]
			if (!counts[letter]) counts[letter] = 0
			counts[letter]++
			return counts
		}, {})
	}).map(day ? smallest : largest).join('')
}

function largest(counts) {
	return Object.keys(counts).reduce(function (memo, key) {
		if (counts[key] > memo.count) {
			memo.count = counts[key]
			memo.letter = key
		}
		return memo
	}, { letter: '', count: 0 }).letter
}

function smallest(counts) {
	return Object.keys(counts).reduce(function (memo, key) {
		if (counts[key] < memo.count) {
			memo.count = counts[key]
			memo.letter = key
		}
		return memo
	}, { letter: '', count: Infinity }).letter
}
