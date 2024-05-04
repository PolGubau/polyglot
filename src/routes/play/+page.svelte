<script>
	import { levels } from '../../data/levels';
</script>

<section class="w-full flex justify-center">
	<div
		class="border-2 h-full border-dark rounded-3xl border-b-8 w-full md:h-fit flex flex-col gap-6 md:max-w-xl divide-y-2 divide-dark"
	>
		<h1 class="text-4xl font-bold text-dark px-4 pt-4">Levels</h1>
		<ul class="p-2 grid sm:grid-cols-2 gap-2">
			{#each levels as { name }}
				<li>
					<a
						href="/play/{name}"
						class="bg-dark hover:bg-dark/80 transition-colors w-full flex flex-1 aspect-square h-[250px] text-background p-4 rounded-xl justify-start items-end text-xl sm:text-3xl"
						>{name}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</section>
