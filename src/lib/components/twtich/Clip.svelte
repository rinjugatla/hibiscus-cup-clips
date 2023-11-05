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
				<div class="relative">
					<img src="{clip.thumbnail_url}" alt="{clip.title}" height="360" width="640">
					<div class="absolute inset-x-1/2 bottom-0 h-1/2">
						<svg class="absolute -left-8 -top-8 w-[64px] h-[64px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
							<path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"/>
						</svg>		
					</div>
				</div>
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