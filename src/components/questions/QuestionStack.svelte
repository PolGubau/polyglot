<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Question } from '../../types';
	interface Props {
		questions: Question[];
	}
	let { questions }: Props = $props();
	import Card from './Card.svelte';
	import { cubicOut } from 'svelte/easing';

	let position = $state(0);
	let end = false;

	const onAnswer = () => {
		if (questions[position + 1]) {
			position += 1;
		} else {
			end = true;
		}
	};

	let percentage = $derived((position / (questions.length - 1)) * 100);
</script>

<!-- progressbar -->

<section class="flex flex-col gap-4 w-full md:max-w-xl">
	{percentage}
	<progress
		max="100"
		value={percentage}
		class=" w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400 [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500"
	>
	</progress>

	<Card question={questions[position]} {onAnswer} />
</section>
