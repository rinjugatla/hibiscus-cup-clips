<script lang='ts'>
    import Clip from '$lib/components/twtich/Clip.svelte'
	import type { ITwitchClip } from '$lib/types';

    export let clips: [ITwitchClip];
</script>

<div class="flex flex-wrap  gap-4 content-stretch">
    {#each clips as clip}
        <Clip {clip}></Clip>
    {/each}
</div>