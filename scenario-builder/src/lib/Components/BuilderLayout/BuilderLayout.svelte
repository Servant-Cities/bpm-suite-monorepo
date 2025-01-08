<script lang="ts">
	import { setContext } from 'svelte';
	import type { InteractiveActivity } from '$lib/types';
	import GridFlowchart from '../GridFlowchart/GridFlowchart.svelte';
	import Controls from './Controls.svelte';

	let { activities = [] }: { activities?: Array<InteractiveActivity> } = $props();
	let selectedActivity = $state();
	let flowchartContainer: HTMLElement | undefined = $state();
	let zoom = $state(1);

	const clickActivity = (activity: InteractiveActivity) => {
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
		<slot name="activity-panel"></slot>
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
