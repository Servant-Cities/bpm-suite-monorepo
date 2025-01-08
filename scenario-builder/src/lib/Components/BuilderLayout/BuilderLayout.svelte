<script lang="ts">
	import { page } from '$app/state';
	import { setContext, type Snippet } from 'svelte';
	import type { ClickActivityCell, InteractiveActivity } from '$lib/types';
	import GridFlowchart from '../GridFlowchart/GridFlowchart.svelte';
	import ActivitySettings from '$lib/Components/ActivitySettings/ActivitySettings.svelte';
	import ActivityRules from '$lib/Components/ActivityRules/ActivityRules.svelte';
	import ActivityAnalytics from '$lib/Components/ActivityAnalytics/ActivityAnalytics.svelte';
	import Controls from './Controls.svelte';

	const defaultMode = 'settings';

	let { activities = [] }: { activities?: Array<InteractiveActivity> } = $props();

	let selectedActivity = $state(
		activities.find(({ id }) => id === page.url.searchParams.get('selectedActivityID'))
	);
	let selectedMode = $state(page.url.searchParams.get('mode'));
	let flowchartContainer: HTMLElement | undefined = $state();
	let zoom = $state(1);

	const clickActivity: ClickActivityCell = (activity, mode) => {
		if (window) {
			const url = new URL(window.location.href);
			url.searchParams.set('mode', mode ? mode : defaultMode);
			url.searchParams.set('selectedActivityID', activity.id);
			window.history.pushState(null, '', url.toString());
		}

		selectedMode = mode;
		selectedActivity = activity;
	};

	const setZoom = (value: number) => {
		zoom = value;
	};

	setContext('flowchart', {
		activities,
		getZoom: () => zoom,
		setZoom,
		getSelectedActivity: () => selectedActivity,
		clickActivity
	});
</script>

<div class="builder-wrapper">
	<div class="flowchart-container" bind:this={flowchartContainer}>
		<Controls {flowchartContainer} />
		<GridFlowchart />
	</div>
	<div class="activity-panel">
		{#if selectedMode === 'rules'}
			<ActivityRules />
		{:else if selectedMode === 'analytics'}
			<ActivityAnalytics />
		{:else}
			<ActivitySettings />
		{/if}
	</div>
</div>

<style>
	.builder-wrapper {
		display: flex;
	}

	.flowchart-container {
		display: inline-block;
		width: calc(100vw - 320px);
		height: calc(100vh - 40px);
		overflow: auto;
		background-color: #393937;

		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	.activity-panel {
		display: inline-block;
		width: 320px;
		height: calc(100vh - 40px);
		background-color: white;
		box-shadow:
			0px 3px 3px -2px rgba(0, 0, 0, 0.2),
			0px 3px 4px 0px rgba(0, 0, 0, 0.14),
			0px 1px 8px 0px rgba(0, 0, 0, 0.12);
	}
</style>
