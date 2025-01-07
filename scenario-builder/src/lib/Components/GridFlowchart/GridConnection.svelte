<script lang="ts">
	import { getContext } from 'svelte';
	import type { ActivityCell } from '$lib/types';
	import type { Connection } from '@prisma/client';

	let {
		activityCell,
		flattenPositions
	}: { activityCell: ActivityCell; flattenPositions: Array<ActivityCell> } = $props();
	let { zoom } = getContext('flowchart');

	const getConnectionEdgesStyle = (activityCell: ActivityCell, connection: Connection) => {
		const nextActivity = flattenPositions.find(({ id }) => id === connection.nextActivityId);

		const finishTop =
			activityCell.nextActivities?.[0]?.nextActivityId === connection.nextActivityId;

		const height = nextActivity ? nextActivity.rowIndex - activityCell.rowIndex : -0.5;
		const width = nextActivity ? nextActivity.columnIndex - activityCell.columnIndex : -0.5;
		return {
			class: `connection ${height >= 0 ? 'connection-start-top' : 'connection-start-bottom'} ${finishTop ? 'connection-finish-top' : 'connection-finish-bottom'}`,
			style: `height: ${height === 0 ? 0 : `${Math.abs(height)}25%`}; width: ${width * 6}em; top: ${height >= 0 ? '50%' : `calc(${height}00% + 29%)`};`
		};
	};
</script>

{#each activityCell.nextActivities as connection}
	<span {...getConnectionEdgesStyle(activityCell, connection)}>
		<span class="connection-mid"></span>
	</span>
{/each}

<style>
	.connection {
		display: inline-block;
		position: absolute;
		left: calc(100% - 2em);

		&::before {
			content: ' ';
			display: block;
			position: absolute;
			left: 0;
			width: 50%;
			background-color: white;
			height: .1em;
		}

		&::after {
			content: '>';
			display: block;
			position: absolute;
			left: 50%;
			width: 50%;
			background-color: white;
			height: .1em;
			line-height: 0;
			color: white;
			text-align: right;
		}
	}

	.connection-start-top {
		&::before {
			top: 0;
		}
	}

	.connection-start-bottom {
		&::before {
			bottom: 0;
		}
	}

	.connection-finish-top {
		&::after {
			top: 0;
		}
	}

	.connection-finish-bottom {
		&::after {
			bottom: 0;
		}
	}

	.connection-mid {
		display: block;
		margin: 0 auto;
		background-color: white;
		width: .1em;
		height: 100%;
	}
</style>
