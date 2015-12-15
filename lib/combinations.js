module.exports = function combos(len, allowDuplicates) {
	var arr = []
	var max = Math.pow(len, len)
	for (var i = 0; i < max; i++) {
		var padded = ('0'.repeat(len) + i.toString(len)).slice(-len)
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
console.log(module.exports(2)) // => [ '00', '01', '10', '11' ]
console.log(module.exports(3, true)) // => [ '012', '021', '102', '120', '201', '210' ]

console.time('7')
module.exports(7)
console.timeEnd('7')
*/
