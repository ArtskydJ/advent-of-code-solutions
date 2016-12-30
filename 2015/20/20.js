var sum = require('../lib/sum.js')
var divisors = require('../lib/divisors.js')

function calculatePresents(half, houseNum) {
	return !half ?
		sum(divisors(houseNum)) * 10 : // First half
		sum(divisors(houseNum).filter(divisor => divisor * 50 >= houseNum)) * 11 // Second half
}

module.exports = function (input, half) {
	var houseNum = 1
	for (var presents = 0; presents < Number(input); presents = calculatePresents(half, houseNum)) {
		houseNum++
	}
	return houseNum
}
