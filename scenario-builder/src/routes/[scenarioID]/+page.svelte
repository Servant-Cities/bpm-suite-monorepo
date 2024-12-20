<script lang="ts">
	import { Node } from 'svelvet';
	import type { PageData } from './$types';
	import type { LayoutData } from '../$types';
	import BuilderLayout from '$lib/Components/BuilderLayout/BuilderLayout.svelte';

	let { data }: { data: LayoutData & PageData } = $props();
</script>

<BuilderLayout>
	<div slot="scenario">
		{#each data.activities as {id, name}}
			<Node {id} label={name} />
		{/each}
	</div>
	<ul slot="activity-panel">
		<h3>Activity</h3>
	</ul>
</BuilderLayout>
