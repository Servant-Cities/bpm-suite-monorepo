<script lang="ts">
	import { setContext } from 'svelte';
	import type { InteractiveActivity } from '$lib/types';
	import GridFlowchart from '../GridFlowchart/GridFlowchart.svelte';

	let { activities = [] }: { activities?: Array<InteractiveActivity> } = $props();
	let selectedActivity = $state();

	const clickActivity = (activity: InteractiveActivity) => {
		selectedActivity = activity;
	};

	setContext('flowchart', {
		activities,
		zoom: 1,
		clickActivity,
		getSelectedActivity: () => selectedActivity
	});
</script>

<div class="builder-wrapper">
	<div class="flowchart-wrapper">
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

	.flowchart-wrapper {
		display: inline-block;
		width: calc(100vw - 320px);
		height: calc(100vh - 40px);
		overflow: auto;
		background-color: #393937;
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
