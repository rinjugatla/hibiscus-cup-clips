<script lang='ts'>
	import type { TwitchClip } from "$lib/server/twitch";
    import Clip from '$lib/components/twtich/Clip.svelte'

    export let clips: [TwitchClip];
</script>

<div class="grid grid-cols-3 gap-4 content-stretch">
    {#each clips as clip}
        <Clip {clip}></Clip>
    {/each}
</div>