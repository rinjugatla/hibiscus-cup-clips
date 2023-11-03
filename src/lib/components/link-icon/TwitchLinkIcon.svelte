<script lang="ts">
	import { Button } from 'flowbite-svelte';
    import { CibTwitch } from 'svelte-coreui-icons';

    const url_prefix = 'https://www.twitch.tv/';
    export let name: string;
</script>

<Button color="none" pill={true} class="!p-2" on:click={() =>  {window.open(url_prefix + name)}} disabled={name == null || name == ''}>
    <CibTwitch color="#a970ff" />
</Button>