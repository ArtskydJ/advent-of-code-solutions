module.exports = function (input, half) {
	//input = ['aaaaa-bbb-z-y-x-123[abxyz]','xhgfedcban-987[abcde]','not-a-real-room-404[oarel]','totally-real-room-200[decoy]']
	const validRooms = input
		.map(parse)
		.filter(valid)
	if (!half) {
		return validRooms.reduce(sectorIdsSum, 0)
	} else {
		return validRooms
			.map(decryptName)
			.filter(({ decryptedName }) => decryptedName.startsWith('north'))[0].sectorId
	}
}

function parse(line) {
	const [ , name, sectorId, checksum ] = /([\w-]+)-(\d+)\[(\w+)\]/.exec(line)
	return {
		name,
		sectorId: Number(sectorId),
		checksum
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

function decryptName({ name, sectorId, checksum }) {
	const rotate = sectorId % 26
	let output = ''
	for (let i = 0; i < name.length; i++) {
		if (name[i] === '-') {
			output += ' '
		} else {
			const new_char_code = name.charCodeAt(i) + rotate
			output += String.fromCharCode(new_char_code > 122 ? new_char_code - 26 : new_char_code)
		}
	}
	return {
		name,
		decryptedName: output,
		sectorId,
		checksum,
	}
}
