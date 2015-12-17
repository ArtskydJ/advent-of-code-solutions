var expect = {
	Sue:         n => true,
	children:    n => n === 3,
	cats:        n => n > 7,
	samoyeds:    n => n === 2,
	pomeranians: n => n < 3,
	akitas:      n => n === 0,
	vizslas:     n => n === 0,
	goldfish:    n => n < 5,
	trees:       n => n > 3,
	cars:        n => n === 2,
	perfumes:    n => n === 1
}

module.exports = function (input, half) {
	return input.find(function (str) {
		return str.match(/(\w+).+?(\d+)/g).every(function (piece) {
			var wordNumber = piece.match(/(\w+).+?(\d+)/)
			return expect[wordNumber[1]](Number(wordNumber[2]))
		})
	}).match(/(\d+)/)[1]
}
