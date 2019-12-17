var weaponStore = [
	{ cost: 8,  damage: 4 },
	{ cost: 10, damage: 5 },
	{ cost: 25, damage: 6 },
	{ cost: 40, damage: 7 },
	{ cost: 74, damage: 8 }
]

var armorStore = [
	{ cost: 0,  armor: 0 }, // Armor is optional
	{ cost: 13, armor: 1 },
	{ cost: 31, armor: 2 },
	{ cost: 53, armor: 3 },
	{ cost: 75, armor: 4 },
	{ cost: 102, armor: 5 }
]

var ringStore = [
	{ cost: 0,  damage: 0, armor: 0 }, // Rings are optional
	{ cost: 20, damage: 0, armor: 1 },
	{ cost: 40, damage: 0, armor: 2 },
	{ cost: 80, damage: 0, armor: 3 },
	{ cost: 25, damage: 1, armor: 0 },
	{ cost: 50, damage: 2, armor: 0 },
	{ cost: 100, damage: 3, armor: 0 }
]

function getStats(input) {
	return input.reduce(function (memo, line) {
		var pieces = line.split(': ')
		var stat = pieces[0].replace('Hit Points', 'hp').toLowerCase()
		var value = Number(pieces[1])
		memo[stat] = value
		return memo
	}, {})
}

function doesThePlayerWin(enemyStats, php, parmor, pdamage) {
	var ehp = enemyStats.hp
	var earmor = enemyStats.armor
	var edamage = enemyStats.damage

	for (var playersTurn = true; ehp > 0 && php > 0; playersTurn = !playersTurn) {
		if (playersTurn) {
			ehp -= Math.max(1, pdamage - earmor)
		} else {
			php -= Math.max(1, edamage - parmor)
		}
	}
	return php > 0
}

module.exports = function (input, half) {
	var enemyStats = getStats(input)

	var minCostWin = Infinity
	var maxCostLoss = 0

	weaponStore.forEach(function (weapon) {
		armorStore.forEach(function (armor) {
			ringStore.forEach(function (ring1) {
				ringStore.forEach(function (ring2, i) {
					if (ring1 === ring2 && i) return // Do not allow 2 of the same rings

					var totalCost = ring1.cost + ring2.cost + armor.cost + weapon.cost
					var totalArmor = ring1.armor + ring2.armor + armor.armor
					var totalDamage = ring1.damage + ring2.damage + weapon.damage

					var playerWins = doesThePlayerWin(enemyStats, 100, totalArmor, totalDamage)

					if (playerWins) {
						minCostWin = Math.min(minCostWin, totalCost)
					} else {
						maxCostLoss = Math.max(maxCostLoss, totalCost)
					}
				})
			})
		})
	})

	return !half ? minCostWin : maxCostLoss
}
