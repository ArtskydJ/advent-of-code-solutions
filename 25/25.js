function getTriangleValue(row, col) {
	return (
		(col * (col + 1)) / 2 +
		(row * (row + 1)) / 2 +
		col * (row + 1) + 1
	)
}

function iterate(code) {
	return (code * 252533) % 33554393
}

module.exports = function (input, half) {
	//input = 'To continue, please consult the code grid in the manual.  Enter the code at row 4, column 3.'
	var row = Number(input.match(/row (\d+)/)[1]) - 1    // These numbers are one based
	var col = Number(input.match(/column (\d+)/)[1]) - 1 // The `... - 1` is to make them zero based.

	var location = getTriangleValue(row, col)
	//console.log(location)

	var code = 20151125
	for (var i = 1; i < location; i++) {
		code = iterate(code)
	}
	return code
}

/*
console.log('   | 0   1   2   3   4   5 ')
console.log('---|---+---+---+---+---+---')
console.log(' 0 | '+getTriangleValue(0,0)+'  '+getTriangleValue(0,1)+'  '+getTriangleValue(0,2)+'  '+getTriangleValue(0,3)+'  '+getTriangleValue(0,4)+'  '+getTriangleValue(0,5))
console.log(' 1 | '+getTriangleValue(1,0)+'  '+getTriangleValue(1,1)+'  '+getTriangleValue(1,2)+'  '+getTriangleValue(1,3)+'  '+getTriangleValue(1,4))
console.log(' 2 | '+getTriangleValue(2,0)+'  '+getTriangleValue(2,1)+'  '+getTriangleValue(2,2)+'  '+getTriangleValue(2,3))
console.log(' 3 | '+getTriangleValue(3,0)+'  '+getTriangleValue(3,1)+' ' +getTriangleValue(3,2))
console.log(' 4 | '+getTriangleValue(4,0)+' ' +getTriangleValue(4,1))
console.log(' 5 | '+getTriangleValue(5,0))
*/
/*
console.log('20151125 ->', iterateCode(20151125))
console.log()
console.log('31916031 ->', iterateCode(31916031))
console.log('18749137 ->', iterateCode(18749137))
console.log()
console.log('16080970 ->', iterateCode(16080970))
console.log('21629792 ->', iterateCode(21629792))
console.log('17289845 ->', iterateCode(17289845))
*/
