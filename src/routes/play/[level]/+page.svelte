<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import QuestionStack from '../../../components/questions/QuestionStack.svelte';

	let end = $state(false);
	$inspect(end);
</script>

<main class="h-full w-full justify-center items-center flex p-4">
	{#if end}
		<h1>Congratulations</h1>
	{:else}
		{#await data.level.questions then questions}
			{#if questions.length === 0}
				<h1>No questions</h1>
			{/if}
			<QuestionStack {questions} bind:end />
		{/await}
	{/if}
</main>
