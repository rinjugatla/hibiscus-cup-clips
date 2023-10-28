<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import type { TwitchClip } from '$lib/server/twitch';

	export let clip: TwitchClip;
</script>

<Card padding="none">
    <img class="" src={clip.thumbnail_url} alt={clip.title}>
	<div class="px-5 pb-5">
		<a href="/">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{clip.creator_name}
			</h5>
		</a>
		<div class="flex justify-between items-center">
			<span class="text-3xl font-bold text-gray-900 dark:text-white">{clip.title}</span>
			<Button href={clip.url}>Show</Button>
		</div>
	</div>
</Card>

<!-- <iframe src="${clip.embed_url}&parent=localhost" frameborder={0} allowfullscreen={true} height={378} width={620} title={clip.title}></iframe> -->
