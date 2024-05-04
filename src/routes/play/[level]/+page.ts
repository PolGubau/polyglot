import { error } from '@sveltejs/kit';
import { levels } from '../../../data/levels';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const QUESTION_COUNT = 8;

	const level = levels.find((post) => post.name === params.level);

	if (!level) throw error(404);

	// a level has a lot of questions, we only want 20 of them, get 20 random and also shuffle them and it's answers

	const getQuestion = async () => {
		const questions = await level.questions;
		const shuffled = [...questions].sort(() => Math.random() - 0.5);
		return Promise.resolve(shuffled.slice(0, QUESTION_COUNT));
	};

	return {
		getQuestion,
		level: {
			...level,
			questions: getQuestion()
		}
	};
};
