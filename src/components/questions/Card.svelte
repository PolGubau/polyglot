<script lang="ts">
	import type { Question } from '../../types';

	interface Props {
		question: Question;
		onAnswer: (answer: { correct: boolean; cardId: Question['id'] }) => void;
	}
	let { onAnswer, question }: Props = $props();

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	let isCorrect: boolean | 'idle' = $state('idle');

	let selectedAnswer: string = $state('');

	const checkAnswer = () => {
		// different cases for different types of cards, the result is always a callback to onAnswer with the correct validation and the card id

		if (question.type === 'multiple-choice') {
			isCorrect = selectedAnswer === question.answer;
		} else if (question.type === 'boolean') {
			isCorrect = selectedAnswer.toLowerCase() === question.answer.toString().toLowerCase();
		} else if (question.type === 'short-answer') {
			isCorrect = selectedAnswer.toLowerCase() === question.answer.toString().toLowerCase();
		}

		wait(1000).then(() => {
			selectedAnswer = '';

			if (typeof isCorrect === 'boolean') {
				onAnswer({
					correct: isCorrect,
					cardId: question.id
				});
				isCorrect = 'idle';
			} else {
				console.error('Something failed in the validations');
			}
		});
	};

	const possibleAnswers = () => {
		if (question.type === 'multiple-choice') {
			return [question.answer, ...question.wrongAnswers].sort(() => Math.random() - 0.5);
		}
		if (question.type === 'boolean') {
			return ['True', 'False'];
		}
		return [];
	};
</script>

<article
	class="p-4 border-2 h-full border-dark rounded-3xl justify-between border-b-8 w-full md:h-fit flex flex-col gap-6"
>
	<div class="flex flex-col gap-4 items-center h-full">
		<h1 class="text-center text-xl font-semibold px-6 py-4">{question.title}</h1>

		{#if question.type === 'multiple-choice' || question.type === 'boolean'}
			<ul class="flex flex-col gap-4 w-full">
				{#each possibleAnswers() as answer}
					<button
						onclick={() => {
							selectedAnswer = answer;
						}}
						class={`w-full p-4 rounded-xl  ring-0 transition-all text-center  hover:brightness-90 focus-visible:brightness-75 text-lg font-semibold
					  ${selectedAnswer === answer ? 'shadow-xl' : undefined}
  					${selectedAnswer != answer || isCorrect === 'idle' ? 'bg-main' : undefined}
  					${selectedAnswer === answer && isCorrect === true ? 'bg-green-400' : undefined}
					${selectedAnswer === answer && isCorrect === false ? 'bg-red-400' : undefined}
					${selectedAnswer === answer ? 'ring-2 ring-dark' : undefined}
 					
					`}
						>{answer}
					</button>
				{/each}
			</ul>
		{/if}

		{#if question.type === 'short-answer'}
			<input
				bind:value={selectedAnswer}
				type="text"
				placeholder="Type your answer here"
				class={`w-full p-4 rounded-xl text-center 
				${isCorrect === 'idle' ? 'bg-orange-300' : undefined} 
				${isCorrect === true ? 'bg-green-300' : undefined} 
				${isCorrect === false ? 'bg-red-300' : undefined}`}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						checkAnswer();
					}
				}}
			/>

			<div>
				{#if isCorrect === false}
					<p class="bg-red-200 w-full text-red-800 text-center p-2 rounded-xl">
						{question.answer}
					</p>
				{/if}
			</div>
		{/if}
	</div>
	<button
		class="bg-orange-800 text-xl p-4 rounded-xl text-background font-semibold"
		onclick={checkAnswer}
	>
		Validate
	</button>
</article>
