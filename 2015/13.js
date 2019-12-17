var combinations = require('./lib/combinations.js')
var sum = require('./lib/sum.js')

module.exports = function (input, half) {
	var relations = input.map(function (str) {
		var matches = str.match(/^(\w+) would (\w+) (\d+) .+ (\w+)\.$/)
		return {
			person: matches[1],
			happiness: Number(matches[3]) * { lose: -1, gain: 1 }[matches[2]],
			nextTo: matches[4]
		}
	}).reduce(function (memo, curr) {
		if (!memo[curr.person]) memo[curr.person] = {}
		memo[curr.person][curr.nextTo] = curr.happiness
		return memo
	}, {})

	var people = Object.keys(relations)
	if (half) {
		relations.me = {}
		people.forEach(function (person) {
			relations[person].me = 0
			relations.me[person] = 0
		})
		people = Object.keys(relations)
	}

	var combos = combinations(people.length, people.length, true)

	return combos.map(function (combo) {
		var personIndexes = combo.split('').map(Number)
		var coupleHappinesses = []
		for (var i = 0; i < personIndexes.length; i++) {
			var person1Name = people[personIndexes[i]]
			var person2Name = people[personIndexes[(i + 1) % personIndexes.length]]
			coupleHappinesses.push(relations[person1Name][person2Name] + relations[person2Name][person1Name])
		}
		return sum(coupleHappinesses)
	}).reduce(function (max, curr) {
		return curr > max ? curr : max
	}, -Infinity)
}
