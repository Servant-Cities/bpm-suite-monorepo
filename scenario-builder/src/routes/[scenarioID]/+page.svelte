<script lang="ts">
	import type { PageData } from './$types';
	import type { LayoutData } from '../$types';
	import BuilderLayout from '$lib/Components/BuilderLayout/BuilderLayout.svelte';

	let { data }: { data: LayoutData & PageData } = $props();
</script>

<BuilderLayout activities={data.activities}>
	<ul slot="activity-panel">
		<h3>Activity</h3>
	</ul>
</BuilderLayout>
