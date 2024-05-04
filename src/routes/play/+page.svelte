<script>
	export let data;

	console.log(data.levels);
</script>

<h1>blog</h1>

<ul>
	{#each data.levels as { name }}
		<li><a href="/play/{name}">{name}</a></li>
	{/each}
</ul>
