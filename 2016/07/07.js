module.exports = function (input, half) {
	return input.map(parse).filter(half ? half2 : half1).length
}

function parse(stringIpv7) {
	var myRe = /(\w+)(?:\[(\w+)\])?/g
	var supernet = []
	var hypernet = []
	var match
	while ((match = myRe.exec(stringIpv7)) !== null) {
		supernet.push(match[1])
		if (match[2]) hypernet.push(match[2])
	}
	return {
		supernet: supernet,
		hypernet: hypernet
	}
}

function half1(parsedIpv7) {
	return /(\w)(?!\1)(\w)\2\1/.test(parsedIpv7.supernet.join())
		&& !/(\w)(?!\1)(\w)\2\1/.test(parsedIpv7.hypernet.join())
}

function half2(parsedIpv7) {
	return /(\w)(?!\1)(\w)\1.*\|.*\2\1\2/.test(parsedIpv7.supernet.join() + '|' + parsedIpv7.hypernet.join())
}
