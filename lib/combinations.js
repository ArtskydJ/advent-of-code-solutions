module.exports = function combos(len, range, allowDuplicates) {
	var arr = []
	var max = Math.pow(range, len)
	for (var i = 0; i < max; i++) {
		var padded = ('0'.repeat(len) + i.toString(range)).slice(-len)
		if (!allowDuplicates || noDuplicates(padded)) {
			arr.push(padded)
		}
	}
	return arr
}

function noDuplicates(str) {
	for (var i = 0; i < str.length - 1; i++) {
		if (str.indexOf(str[i], i + 1) !== -1) return false
	}
	return true
}

/*
console.log(module.exports(2, 2)) // => [ '00', '01', '10', '11' ]
console.log(module.exports(3, 3, true)) // => [ '012', '021', '102', '120', '201', '210' ]

console.log(module.exports(3, 2)) // => [ '000', '001', '010', '011', '100', '101', '110', '111' ]
console.log(module.exports(2, 3)) // => [ '00', '01', '02', '10', '11', '12', '21', '22' ]

console.time('7')
module.exports(7)
console.timeEnd('7')
*/
