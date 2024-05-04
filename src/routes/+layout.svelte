<script>
	import '../app.css';
	import Navbar from '../components/layout/navbar/Navbar.svelte';
</script>

<div class="bg-neutral-50 text-neutral-800 min-h-screen">
	<Navbar />
	<slot />
</div>
