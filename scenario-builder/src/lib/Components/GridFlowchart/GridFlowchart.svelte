<script lang="ts">
	import { getContext } from 'svelte';
	import getActivitiesGridPositions from '$lib/utils/getActivitiesGridPositions';
	import GridConnection from './GridConnection.svelte';

	let { activities, getZoom, clickActivity, getSelectedActivity } = getContext('flowchart');

	let {
		grid,
		meta: { flattenPositions }
	} = getActivitiesGridPositions(activities, getZoom());
</script>

<table class="flowchart-grid" style="font-size:{getZoom() * 16}px">
	<tbody>
		{#each grid as row}
			{#if row.some((cell) => cell?.id)}
				<tr class="flowchart-row">
					{#each row as activityCell, cellIndex}
						{#if activityCell}
							<td
								class="activity-cell-wrapper"
								aria-selected={getSelectedActivity()?.id === activityCell.id}
							>
								<div
									role="button"
									tabindex={cellIndex}
									class="activity"
									class:activity-cell-active={getSelectedActivity()?.id === activityCell.id}
									onclick={() => clickActivity(activityCell)}
									onkeypress={(event) => {event.key === 'Enter' && clickActivity(activityCell)}}
								>
									{activityCell.name}
								</div>
								<GridConnection {...{ flattenPositions, activityCell }} />
							</td>
						{:else}
							<td class="activity-cell-wrapper" />
						{/if}
					{/each}
				</tr>
			{:else}
				<tr class="flowchart-row"></tr>
			{/if}
		{/each}
	</tbody>
</table>

<style>
	.flowchart-grid {
		border-spacing: 2em;
	}

	.flowchart-row {
		height: 9.5em;
	}

	.activity-cell-wrapper {
		padding: 2em;
		min-width: 5em;
	}

	.activity {
		height: 5.5em;
		background-color: black;
		padding: 2em;
		border: 0.25em solid white;
		border-radius: 0.8em;
		white-space: nowrap;
		color: white;
		cursor: pointer;
		&:hover {
			border: 0.25em solid #7dc19c;
		}
	}

	.activity-cell-active {
		border: 0.25em solid #7dc19c;
	}

	.connection {
		display: block;
		position: absolute;
		left: calc(100% - 2em);
		top: 50%;
		background-color: white;
	}
</style>
