<script>
	import { fade } from 'svelte/transition';
	import { waitLocale } from 'svelte-i18n';
	import Navbar from '$lib/Components/Navbar/index.svelte';
</script>

{#await waitLocale() then}
	<Navbar/>
	<main transition:fade>
		<slot></slot>
	</main>{/await}
