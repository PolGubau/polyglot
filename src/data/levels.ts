// each level represents a json file in the data folder, now we have level-1 and numbers

import type { Level, Question } from '../types';

export const levels: Level[] = [
	{
		name: 'A1',
		questions: import('./a1.json').then((data) => data.default as Question[])
	},
	{
		name: 'Numbers',
		questions: import('./numbers.json').then((data) => data.default as Question[])
	}
];
