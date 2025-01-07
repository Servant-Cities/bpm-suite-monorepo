<script lang="ts">
	import type { PageData } from './$types';
	import type { LayoutData } from '../$types';
	import BuilderLayout from '$lib/Components/BuilderLayout/BuilderLayout.svelte';
	import ActivitySettings from '$lib/Components/ActivitySettings/ActivitySettings.svelte';

	let { data }: { data: LayoutData & PageData } = $props();
</script>

<BuilderLayout activities={data.activities}>
	<ActivitySettings slot="activity-panel" />
</BuilderLayout>
