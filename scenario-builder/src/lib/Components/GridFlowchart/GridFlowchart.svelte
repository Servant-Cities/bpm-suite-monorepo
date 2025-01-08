<script lang="ts">
	import { getContext } from 'svelte';
	import getActivitiesGridPositions from '$lib/utils/getActivitiesGridPositions';
	import ActivityCell from './ActivityCell.svelte';
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
								<ActivityCell
									{activityCell}
									tabindex={cellIndex}
									selected={getSelectedActivity()?.id === activityCell.id}
									{clickActivity}
								/>
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
</style>
