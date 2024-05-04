<script lang="ts">
	import type { Question } from '../../types';

	interface Props {
		question: Question;
		onAnswer: (answer: { correct: boolean; cardId: number }) => void;
	}
	let { onAnswer, question }: Props = $props();

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	let isCorrect: boolean | 'idle' = $state('idle');

	let clickedAnswer: number = $state(-1);

	const checkAnswer = (answer: string) => {
		// different cases for different types of cards, the result is always a callback to onAnswer with the correct validation and the card id

		if (question.type === 'multiple-choice') {
			isCorrect = answer === question.answer;
		} else if (question.type === 'boolean') {
			isCorrect = answer === question.answer.toString();
		} else if (question.type === 'short-answer') {
			console.log(answer, question.answer);
			isCorrect = answer.toString() === question.answer.toString();
		}

		wait(1000).then(() => {
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
</script>

<div
	class="p-4 border-2 h-full border-orange-800 rounded-3xl border-b-8 w-full flex flex-col gap-6"
>
	<h1 class="text-center text-xl font-semibold px-6 py-4">{question.title}</h1>
	{isCorrect.toString()}
	{#if question.type === 'multiple-choice'}
		<ul class="flex flex-col gap-4">
			{#each [question.answer, ...question.wrongAnswers].sort(() => Math.random() - 0.5) as answer, index}
				<button
					onclick={() => {
						checkAnswer(answer);
						clickedAnswer = index;
					}}
					class={`w-full p-4 rounded-xl text-center bg-orange-300 hover:brightness-90 focus-visible:brightness-75
 					${clickedAnswer === index && isCorrect === true ? 'bg-green-300' : undefined}
					${clickedAnswer === index && isCorrect === false ? 'bg-red-300' : undefined}
					
					`}>{answer}</button
				>
			{/each}
		</ul>
	{/if}
	{#if question.type === 'boolean'}
		<ul class="flex gap-4">
			{#each ['true', 'false'] as answer, index}
				<button
					onclick={() => {
						checkAnswer(answer);
						clickedAnswer = index;
					}}
					class={`w-full p-4 rounded-xl text-center bg-orange-300 hover:brightness-90 focus-visible:brightness-75
 					${clickedAnswer === index && isCorrect === true ? 'bg-green-300' : undefined}
					${clickedAnswer === index && isCorrect === false ? 'bg-red-300' : undefined}
					
					`}>{answer}</button
				>
			{/each}
		</ul>
	{/if}
	{#if question.type === 'short-answer'}
		<div class="flex gap-4">
			<input
				type="text"
				placeholder="Type your answer here"
				class={`w-full p-4 rounded-xl text-center 
				${isCorrect === 'idle' ? 'bg-orange-300' : undefined} 
				${isCorrect === true ? 'bg-green-300' : undefined} 
				${isCorrect === false ? 'bg-red-300' : undefined}`}
				onkeydown={(e) => {
				if (e.key === 'Enter') {
					checkAnswer((e.target as HTMLInputElement).value);
				}
			}}
			/>
			<button
				onclick={() => {
				checkAnswer((document.querySelector('input') as HTMLInputElement).value);
			}}
				class="w-fit aspect-square h-full p-4 rounded-xl text-center bg-orange-500 hover:brightness-90 focus-visible:brightness-75"
			>
				S
			</button>
		</div>

		<div>
			{#if isCorrect === false}
				<p class="bg-red-200 w-full text-red-800 text-center p-2 rounded-xl">{question.answer}</p>
			{/if}
		</div>
	{/if}

	<button class="bg-orange-800 text-xl p-6 rounded-xl text-[]"></button>
</div>
