<script>
	import '../app.css';
	import Navbar from '../components/layout/navbar/Navbar.svelte';
</script>

<div
	class="bg-neutral-50 text-neutral-800 min-h-[100svh] w-screen overflow-x-hidden grid grid-rows-[auto,1fr] md:gap-8"
>
	<Navbar />
	<slot />
</div>
