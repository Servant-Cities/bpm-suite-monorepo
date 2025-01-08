<script lang="ts">
	import type { LayoutServerData } from './$types';

	let { data }: { data: LayoutServerData } = $props();
</script>

<ul>
	{#each data.scenarios as { id, name }}
		<li><a href="/{id}">{name}</a></li>
	{/each}
</ul>
