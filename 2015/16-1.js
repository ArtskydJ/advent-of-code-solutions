var expect = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1
}

module.exports = function (input, half) {
	return input.find(function (str) {
		return str.match(/(\w+).+?(\d+)/g).every(function (piece) {
			var wordNumber = piece.match(/(\w+).+?(\d+)/)
			return wordNumber[1] === 'Sue' || expect[wordNumber[1]] === Number(wordNumber[2])
		})
	}).match(/(\d+)/)[1]
}
