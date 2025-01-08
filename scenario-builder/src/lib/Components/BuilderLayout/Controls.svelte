<script lang="ts">
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';

	let { flowchartContainer }: { flowchartContainer: HTMLElement } = $props();
	const { setZoom, getZoom } = getContext('flowchart');

	let oneHandMode = $state(false);
	const wheelSensitivity = 720;
	let isDragging = false;
	let startX: number, startY: number, scrollLeft: number, scrollTop: number;

	const setZoomWithinLimits = (value: number) => {
		const newZoomValue = getZoom() + value;

		if (newZoomValue > 0.1 && newZoomValue < 3) {
			setZoom(newZoomValue);
		}
	};

	const handleWheel = (event) => {
		if (event.ctrlKey == true || oneHandMode) {
			event.preventDefault();
			setZoomWithinLimits(event.wheelDeltaY / wheelSensitivity);
		}
		if (event.ctrlKey == true) {
			oneHandMode = false;
		}
	};

	const handleMiddleButtonClick = (event: MouseEvent) => {
		if (event.button !== 1) return;
		event.preventDefault();
		oneHandMode = true;
		isDragging = true;
		const rect = flowchartContainer.getBoundingClientRect();
		startX = event.pageX - rect.left;
		startY = event.pageY - rect.top;
		scrollLeft = flowchartContainer.scrollLeft;
		scrollTop = flowchartContainer.scrollTop;

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', handleMiddleButtonRelease);
	};

	function onMouseMove(event: MouseEvent) {
		if (!isDragging) return;
		const rect = flowchartContainer.getBoundingClientRect();
		const x = event.pageX - rect.left;
		const y = event.pageY - rect.top;
		const walkX = x - startX;
		const walkY = y - startY;

		flowchartContainer.scrollLeft = scrollLeft - walkX;
		flowchartContainer.scrollTop = scrollTop - walkY;
	}

	const handleMiddleButtonRelease = (event: MouseEvent) => {
		if (event.button === 1) {
			isDragging = false;
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', handleMiddleButtonRelease);
		}
	};
</script>

<svelte:window on:wheel={handleWheel} onmousedown={handleMiddleButtonClick} />
<div class="controls-area">
	<button onclick={() => setZoomWithinLimits(0.3)}>+</button>
	<button onclick={() => setZoomWithinLimits(-0.3)}>-</button>
	<div class="tooltip">
		<button onclick={() => (oneHandMode = !oneHandMode)}>
			{oneHandMode
				? $_('flowchart.controls.modes.mouse.title')
				: $_('flowchart.controls.modes.keyboard.title')}
		</button>
		<span class="helper"
			>{oneHandMode
				? $_('flowchart.controls.modes.mouse.helper')
				: $_('flowchart.controls.modes.keyboard.helper')}</span
		>
	</div>
</div>

<style>
	.controls-area {
		position: sticky;
		z-index: 1000;
		top: 0;
		left: 0;
	}

	.helper {
		position: absolute;
		top: 100%;
		left: 0;
		width: 200px;
		visibility: hidden;
		background-color: white;
		white-space: pre-line;
		font-size: medium;
		padding: 8px;
	}

	.tooltip {
		display: inline-block;
		&:hover {
			& > .helper {
				visibility: visible;
			}
		}
	}
</style>
