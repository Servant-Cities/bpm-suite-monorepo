<script lang="ts">
	import type { ActivityCell, ClickActivityCell } from '$lib/types';

	let {
		selected,
		tabindex,
		clickActivity,
		activityCell
	}: {
		selected: Boolean;
		tabindex: number;
		clickActivity: ClickActivityCell;
		activityCell: ActivityCell;
	} = $props();
</script>

<div class="tooltip">
	<div
		role="button"
		{tabindex}
		class="activity"
		class:activity-cell-active={selected}
		onclick={() => clickActivity(activityCell)}
		onkeypress={(event) => {
			event.key === 'Enter' && clickActivity(activityCell);
		}}
	>
		{activityCell.name}
	</div>
	<div class="helper">
		<button class="mode-selector" onclick={() => clickActivity(activityCell, 'settings')}>
			S
		</button>
		<button class="mode-selector" onclick={() => clickActivity(activityCell, 'rules')}>R</button>
		<button class="mode-selector" onclick={() => clickActivity(activityCell, 'analytics')}>
			A
		</button>
	</div>
</div>

<style>
	.helper {
		display: flex;
		justify-content: center;
        overflow: hidden;
		position: absolute;
		bottom: calc(100% - 1em);
		left: 0;
		width: 100%;
		visibility: hidden;
		white-space: pre-line;
		font-size: medium;
		border-radius: 0.8em 0.8em 0 0;
		border: 0.25em solid #7dc19c;
	}

	.mode-selector {
		flex: 1 1 0px;
		padding: 8px;
		text-align: center;
		cursor: pointer;
		background-color: black;
		color: #7dc19c;
        border: none;
	}

	.mode-selector + .mode-selector {
		border-left: 0.25em solid #7dc19c;
	}

	.tooltip {
		display: inline-block;
		&:hover {
			& > .helper {
				visibility: visible;
			}
			& > activity {
				border: 0.25em solid #7dc19c;
			}
		}
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
</style>
