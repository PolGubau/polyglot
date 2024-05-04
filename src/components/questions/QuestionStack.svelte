<script lang="ts">
	import type { Question } from '../../types';
	interface Props {
		questions: Question[];
		end: boolean;
	}
	let { questions, end = $bindable(false) }: Props = $props();
	import Card from './Card.svelte';
	import Progress from './Progress.svelte';

	let position = $state(0);

	const onAnswer = ({ correct, cardId }: { correct: boolean; cardId: Question['id'] }) => {
		if (questions[position + 1]) {
			position += 1;
		} else {
			end = true;
		}
	};

	let percentage = $derived(Math.floor((position / (questions.length - 1)) * 100));
</script>

<section class="grid grid-rows-[auto,1fr] gap-4 max-w-xl w-full h-full">
	<nav class="flex gap-2 items-center">
		<a
			href="/play"
			class="w-[26px] h-[26px] outline-none p-0.5 aspect-square rounded-full transition-all border-none ring-0 focus:ring-2 hover:animate-pulse ring-dark"
		>
			<img src="/icons/arrow-left.svg" width="30" height="30" alt="arrow-left" />
		</a>

		<Progress {percentage} />
	</nav>

	<Card question={questions[position]} {onAnswer} />
</section>
