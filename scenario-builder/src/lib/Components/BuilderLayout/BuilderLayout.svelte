<script lang="ts">
	import { Svelvet, Controls, Minimap } from 'svelvet';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="builder-wrapper">
	<div class="flowchart-wrapper">
		<Svelvet theme="dark" fitView>
			<Controls slot="controls" corner="NE" />
			<slot name="scenario"></slot>
			<Minimap corner="SE" slot="minimap" width={innerWidth - 340} height={innerHeight / 10} />
		</Svelvet>
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
