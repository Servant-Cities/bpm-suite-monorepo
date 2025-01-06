<script lang="ts">
	import type { Activity } from '@prisma/client';
	import mermaid from 'mermaid';

	let { activities = [] }: { activities?: Array<Activity> } = $props();

	let innerWidth = $state(0);
	let innerHeight = $state(0);

	let diagram =
		$state(`flowchart LR\n${activities
			.map((activity) => {
				const { id, name, trigger, previousActivities } = activity;

				let str = `${id}["${name} (${trigger})"]\n`;

				previousActivities.forEach((prev) => {
					str += `${prev.previousActivityId}-->${prev.nextActivityId}\n`;
				});

				return str;
			})
			.join('')}
	`);

	let container = $state();

	$effect(async () =>
		mermaid.render('mermaid', diagram).then(({ svg }) => (container.innerHTML = svg))
	);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="builder-wrapper">
	<div class="flowchart-wrapper">
		<span bind:this={container}> </span>
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
		width: calc(100vw - 320px);
		height: calc(100vh - 40px);
	}

	.activity-panel {
		display: inline-block;
		width: 320px;
		height: calc(100vh - 40px);
		background-color: lightgrey;
		box-shadow:
			0px 3px 3px -2px rgba(0, 0, 0, 0.2),
			0px 3px 4px 0px rgba(0, 0, 0, 0.14),
			0px 1px 8px 0px rgba(0, 0, 0, 0.12);
	}
</style>
