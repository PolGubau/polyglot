<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import QuestionStack from '../../../components/questions/QuestionStack.svelte';

	let end = false;
</script>

<main class="flex w-full justify-center mt-[10vh] p-4">
	{#if end}
		<h1>Congratulations</h1>
	{:else}
		{#await data.level.questions then questions}
			{#if questions.length === 0}
				<h1>No questions</h1>
			{/if}
			<QuestionStack {questions} />
		{/await}
	{/if}
</main>
