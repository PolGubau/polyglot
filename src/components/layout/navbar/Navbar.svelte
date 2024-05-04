<script>
	import { page } from '$app/stores';
	import { ROUTES } from '$lib/routes';
</script>

<nav class="p-2 flex gap-1 w-full justify-center">
	{#each ROUTES as { path, label }}
		<a
			href={path === '/' ? '/' : path}
			aria-current={path === $page.url.pathname}
			class={`px-4 py-1 bg-neutral-400 rounded-lg transition-colors ${
				path === $page.url.pathname ? 'bg-neutral-500' : ''
			}`}
		>
			{label}
		</a>
	{/each}
</nav>
