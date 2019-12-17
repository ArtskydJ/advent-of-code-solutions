module.exports = function (input) {
	//input = ['aaaaa-bbb-z-y-x-123[abxyz]','xhgfedcban-987[abcde]','not-a-real-room-404[oarel]','totally-real-room-200[decoy]']
	return input
		.map(parse)
		.filter(valid)
		.reduce(sectorIdsSum, 0)
}

function parse(line) {
	var result = /([\w-]+)-(\d+)\[(\w+)\]/.exec(line)
	return {
		name: result[1],
		sectorId: Number(result[2]),
		checksum: result[3]
	}
}

function valid(room) {
	return room.checksum === room.name
		.replace(/-/g, '')
		.split('')
		.sort()
		.reduce(function combine(memo, curr) {
			if (memo.length && memo[memo.length - 1][0] === curr) {
				memo[memo.length - 1] += curr
			} else {
				memo.push(curr)
			}
			return memo
		}, [])
		.sort(sortByLength)
		.map(s => s[0])
		.join('')
		.slice(0, room.checksum.length)
}

function sortByLength(a, b) {
	return b.length - a.length
}

function sectorIdsSum(memo, curr) {
	return memo + curr.sectorId
}
