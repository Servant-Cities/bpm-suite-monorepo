<script lang="ts">
	import { getContext } from 'svelte';

	let { getSelectedActivity } = getContext('flowchart');
</script>

<div class="activity-panel">
	<h3 class="activity-title">{getSelectedActivity()?.name}</h3>
</div>

<style>
    .activity-panel {
        padding: 16px;
    }

    .activity-title {
        margin: 0;
    }
</style>
