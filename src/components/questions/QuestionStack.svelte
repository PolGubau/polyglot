<script lang="ts">
	import { IconArrowLeft, IconStarFilled } from '@tabler/icons-svelte';

	import type { Question } from '../../types';
	interface Props {
		questions: Question[];
		end: boolean;
		points: number;
	}
	let { questions, end = $bindable(false), points = $bindable(0) }: Props = $props();
	import Card from './Card.svelte';
	import Progress from './Progress.svelte';
	//

	let position = $state(0);

	const onAnswer = ({ correct, cardId }: { correct: boolean; cardId: Question['id'] }) => {
		if (correct) {
			points += 1;
		}
		if (questions[position + 1]) {
			position += 1;
		} else {
			end = true;
		}
	};

	let percentage = $derived(Math.floor((position / (questions.length - 1)) * 100));
</script>

<section class="grid grid-rows-[auto,1fr] gap-4 max-w-xl w-full h-full">
	<div class="flex flex-col gap-2">
		<div class="w-full text-center items-center text-xl flex gap-1 justify-center">
			{points}
			<IconStarFilled size={18} class="text-dark" />
		</div>

		<nav class="flex gap-2 items-center">
			<a
				href="/play"
				class="w-[26px] h-[26px] outline-none p-0.5 aspect-square rounded-full transition-all border-none ring-0 focus:ring-2 hover:animate-pulse ring-dark"
			>
				<IconArrowLeft />
			</a>

			<Progress {percentage} />
		</nav>
	</div>

	<Card question={questions[position]} {onAnswer} />
</section>
