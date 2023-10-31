<script lang="ts">
	import { HIBISCUS_CUP_SPONSER } from '$lib/member';
    import Sponser from '$lib/components/list/Sponser.svelte';
    
    const sponsers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '主催');
    const plans = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '企画');
    const managers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '運営');
    const designers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === 'ロゴ');
</script>

<div class="flex justify-center flex-wrap">
    {#each sponsers as sponser}
        <Sponser {sponser} />
    {/each}
</div>

<div class="flex justify-center flex-wrap">
    {#each plans as plan}
        <Sponser sponser={plan} />
    {/each}
</div>

<div class="flex justify-center flex-wrap">
    {#each managers as manager}
        <Sponser sponser={manager} />
    {/each}
</div>

<div class="flex justify-center flex-wrap">
    {#each designers as designer}
        <Sponser sponser={designer} />
    {/each}
</div>
