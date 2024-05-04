export default function punctuation() {
	let points = $state(0);

	return {
		get points() {
			return points;
		},
		increment: () => (points += 1)
	};
}
