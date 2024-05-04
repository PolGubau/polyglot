<script lang="ts">
	import type { PageData } from './$types';
	import { IconArrowLeft } from '@tabler/icons-svelte';

	let { data }: { data: PageData } = $props();

	import QuestionStack from '../../../components/questions/QuestionStack.svelte';

	let end = $state(false);
	$inspect(end);
</script>

<main class="h-full w-full justify-center items-center flex p-4">
	{#if end}
		<article class="flex flex-col gap-4 items-center justify-center">
			<h1 class="text-xl md:text-3xl font-bold uppercase">Congratulations</h1>
			<a href="/play" class="bg-main rounded-2xl px-4 py-2 flex text-xl items-center gap-2">
				<IconArrowLeft />Go back</a
			>
		</article>
	{:else}
		{#await data.level.questions}
			Loading...
		{:then questions}
			{#if questions.length === 0}
				<h1>No questions</h1>
			{/if}
			<QuestionStack {questions} bind:end />
		{/await}
	{/if}
</main>
