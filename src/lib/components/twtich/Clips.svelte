<script lang='ts'>
    import Clip from '$lib/components/twtich/Clip.svelte'
	import type { ITwitchClip } from '$lib/types';

    export let clips: [ITwitchClip];
</script>

<div class="grid grid-cols-3 gap-4 content-stretch">
    {#each clips as clip}
        <Clip {clip}></Clip>
    {/each}
</div>