<script lang="ts">
	import { page } from '$app/stores';
	import type { ITwitchClip } from '$lib/types';
	import { Card, Button } from 'flowbite-svelte';

	export let clip: ITwitchClip;
	let clicked = false;
</script>

<div class="m-1 p-2.5 bg-white w-[660px] rounded-md">
	<div class="flex flex-col">
		{#if !clicked}
			<button type="button" on:click={() => clicked = true}>
				<img src="{clip.thumbnail_url}" alt="{clip.title}" height="360" width="640">
			</button>
		{:else}
			<iframe
			src="https://clips.twitch.tv/embed?clip={clip.id}&parent={$page.url.hostname}"
			allowfullscreen
			preload="metadata"
			height="360"
			width="640"
			title={clip.title}></iframe>
		{/if}
		<div class="px-5">
			<h5 class="text-lg text-gray-500">{clip.creator_name}</h5>
			<span class="text-3xl font-bold text-gray-900">{clip.title}</span>
		</div>
	</div>
</div>