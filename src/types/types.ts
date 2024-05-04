export interface Level {
	name: string;
	questions: Promise<Question[]>;
}

export type Question = {
	id: string;
	level: number;
	title: string;
} & (
	| { type: 'multiple-choice'; wrongAnswers: string[]; answer: string }
	| { type: 'boolean'; answer: boolean }
	| { type: 'short-answer'; answer: string }
);
