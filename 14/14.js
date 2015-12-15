module.exports = function (input, half) {
	var stats = input.map(function (line) {
		var matches = line.match(/can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./)
		return {
			kmps: Number(matches[1]),
			flySec: Number(matches[2]),
			restSec: Number(matches[3])
		}
	})

	var distances = stats.map(function () { return 0 })
	var points = stats.map(function () { return 0 })
	for (var sec = 0; sec < 2503; sec++) {
		stats.forEach(function (s, i) {
			if (sec % (s.flySec + s.restSec) < s.flySec) distances[i] += s.kmps
		})
		var maxDist = Math.max.apply(null, distances)
		points = points.map(function (point, i) {
			return point + ((distances[i] === maxDist) ? 1 : 0)
		})
	}
	if (half === 0) {
		return Math.max.apply(null, distances)
	} else {
		return Math.max.apply(null, points)
	}
}
