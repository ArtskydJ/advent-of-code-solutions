function flatten(arr) {
	return [].concat.apply([], arr)
}

module.exports = function (input, half) {
	var network = input.reduce(function (network, str) {
		var pieces = /^(\w+) to (\w+) = (\d+)$/.exec(str)

		var distance = Number(pieces[3])
		var location1 = pieces[1]
		var location2 = pieces[2]

		network[location1] = network[location1] || {}
		network[location2] = network[location2] || {}
		network[location1][location2] = distance
		network[location2][location1] = distance

		return network
	}, {})

	function plot(traversedNodes, totalDistance) {
		var currentNode = traversedNodes[traversedNodes.length - 1]
		var result = Object.keys(network[currentNode]).filter(function (possibleNode) {
			return traversedNodes.indexOf(possibleNode) === -1
		}).map(function (possibleNode) {
			return plot(
				traversedNodes.concat(possibleNode),
				totalDistance + network[currentNode][possibleNode]
			)
		})
		return result.length ? flatten(result) : totalDistance
	}

	var distances = flatten(Object.keys(network).map(function (node) {
		return plot([node], 0)
	}))
	return (half === 0) ?
		Math.min.apply(null, distances) :
		Math.max.apply(null, distances)
}
