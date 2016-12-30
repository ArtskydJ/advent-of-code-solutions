var spells = [
	{ cost: 53, damage: 4, heal: 0 },
	{ cost: 73, damage: 2, heal: 2 },
	{ cost: 113, turns: 6, damage: 0, armor: 7, mana: 0 },
	{ cost: 173, turns: 6, damage: 3, armor: 0, mana: 0 },
	{ cost: 229, turns: 5, damage: 0, armor: 0, mana: 101 }
]

function iterate(playersTurn, spentMana, ehp, edamage, php, mana, fx) {
	var parmor = 0
	var nfx = fx.map(function (effect) {
		mana += effect.mana
		ehp -= effect.damage
		parmor += effect.armor
		effect.timer--
		return effect
	}).filter(function (effect) {
		return effect.timer > 0
	})

	if (playersTurn) {
		var spentManas = spells.map(function (spell) {
			var fxCopy = nfx.slice() // can this go 4 lines lower?
			var manaCopy = mana - spell.cost
			if (manaCopy < 0) return Infinity

			if (spell.turns) { // Effects
				fxCopy.push({
					timer: spell.turns,
					damage: spell.damage,
					armor: spell.armor,
					mana: spell.mana
				})
				return iterate(!playersTurn, spentMana + spell.cost, ehp, edamage, php, manaCopy, fxCopy)
			} else { // Non-Effects
				var ehpCopy = ehp - spell.damage
				if (ehpCopy > 0) {
					return iterate(!playersTurn, spentMana + spell.cost, ehp - spell.damage, edamage, php + spell.heal, manaCopy, fxCopy)
				} else {
					return spentMana + spell.cost
				}
			}
		})
		return Math.min.apply(null, spentManas)
	} else {
		php -= Math.max(1, edamage - parmor)
		if (php > 0) {
			return iterate(!playersTurn, spentMana, ehp, edamage, php, mana, nfx)
		} else {
			return Infinity
		}
	}
}

module.exports = function (input, half) {
	var enemy = input.map(function (line) {
		return Number(line.split(': ')[1])
	})

	var leastSpentMana = iterate(true, 0, enemy[0], enemy[1], 50, 500, [])

	try{spells++}catch(_){} // lol jshint

	return leastSpentMana
}
