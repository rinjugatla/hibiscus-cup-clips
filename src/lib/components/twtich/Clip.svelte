<script lang="ts">
	import type { ITwitchClip } from '$lib/types';
	import { Card, Button } from 'flowbite-svelte';

	export let clip: ITwitchClip;
</script>

<div class="m-1">
	<Card padding="none">
		<img class="" src={clip.thumbnail_url} alt={clip.title}>
		<div class="px-5 pb-5">
			<h5 class="text-lg text-gray-500 dark:text-gray-400">{clip.creator_name}</h5>
			<div class="flex justify-between items-center">
				<span class="text-3xl font-bold text-gray-900 dark:text-white">{clip.title}</span>
				<Button href={clip.url}>Show</Button>
			</div>
		</div>
	</Card>
</div>

<!-- <iframe src="${clip.embed_url}&parent=localhost" frameborder={0} allowfullscreen={true} height={378} width={620} title={clip.title}></iframe> -->
