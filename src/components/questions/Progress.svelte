<script lang="ts">
	interface Props {
		percentage: number;
	}
	let { percentage }: Props = $props();
</script>

<div class="flex items-center gap-4 w-full">
	<progress
		max="100"
		value={percentage}
		class=" w-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:h-4 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-neutral-200 [&::-moz-progress-bar]:bg-neutral-200 [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500 [&::-webkit-progress-value]:bg-dark [&::-webkit-progress-value]:min-w-4"
	>
	</progress>

	<p class="text-xl font-semibold">{percentage}%</p>
</div>
