module.exports = function (input, half) {
	var registers = {
		a: half,
		b: 0
	}

	for (var i = 0, next; i >= 0 && i < input.length; i += next, next = 1) {
		var pieces = input[i].split(/,? /)
		var instruction = pieces[0]
		var reg = pieces[1]
		var n = Number(pieces[2])

		;({
			hlf: function () { registers[reg] /= 2 },
			tpl: function () { registers[reg] *= 3 },
			inc: function () { registers[reg] += 1 },
			jmp: function () { next = Number(reg) },
			jie: function () { next = (registers[reg] % 2 === 0) ? n : 1 },
			jio: function () { next = (registers[reg] === 1) ? n : 1 }
		}[instruction])()
	}
	return registers.b
}
