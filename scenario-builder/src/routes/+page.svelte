<script lang="ts">
	import type { LayoutData } from './$types';
	import BuilderLayout from '$lib/Components/BuilderLayout/BuilderLayout.svelte';

	let { data }: { data: LayoutData } = $props();
</script>

<BuilderLayout>
	<ul slot="activity-panel">
		{#each data.scenarios as { id, name }}
			<li><a href="/builder/{id}">{name}</a></li>
		{/each}
	</ul>
</BuilderLayout>
