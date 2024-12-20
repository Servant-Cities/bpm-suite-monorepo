<script>
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
</script>

<nav>
    <span>
	{#if $page.url.pathname !== '/'}
		<a href="/">{$_('app.home')}</a>
	{/if}</span>
	<a href="https://github.com/Servant-Cities/bpm-suite-monorepo/tree/main/scenario-builder">{$_('app.github')}</a>
</nav>

<style>
	nav {
		height: 40px;
		padding: 8px 32px;
		display: flex;
		justify-content: space-between;
		box-shadow:
			0px 3px 3px -2px rgba(0, 0, 0, 0.2),
			0px 3px 4px 0px rgba(0, 0, 0, 0.14),
			0px 1px 8px 0px rgba(0, 0, 0, 0.12);
	}
</style>
