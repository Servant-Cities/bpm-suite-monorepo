<script lang="ts">
	import type { LayoutServerData } from './$types';
	import BuilderLayout from '$lib/Components/BuilderLayout/BuilderLayout.svelte';

	let { data }: { data: LayoutServerData } = $props();
</script>

<BuilderLayout>
	<ul slot="activity-panel">
		{#each data.scenarios as { id, name }}
			<li><a href="/{id}">{name}</a></li>
		{/each}
	</ul>
</BuilderLayout>
