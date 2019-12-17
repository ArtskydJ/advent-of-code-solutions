function lookAndSay(str) {
	return str.replace(/(\d)\1*/g, function (fullMatch) {
		return fullMatch.length + fullMatch[0]
	})
}

module.exports = function (input, half) {
	var count = 40 + (half * 10)
	for(var i = 0; i < count; i++) {
		input = lookAndSay(input)
	}
	return input.length
}
