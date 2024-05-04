import { levels } from '../../data/levels';

export function load() {
	return {
		levels: levels.map((level) => {
			return {
				name: level.name
			};
		})
	};
}
