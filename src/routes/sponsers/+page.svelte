<script lang="ts">
	import { HIBISCUS_CUP_SPONSER } from '$lib/member';
    import Sponser from '$lib/components/list/Sponser.svelte';
    
    const sponsers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '主催');
    const plans = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '企画');
    const managers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '運営');
    const designers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === 'ロゴ');
</script>

<div class="flex justify-center flex-wrap">
    <Sponser {sponsers} />
</div>

<div class="flex justify-center flex-wrap">
    <Sponser sponsers={plans} />
</div>

<div class="flex justify-center flex-wrap">
    <Sponser sponsers={managers} />
</div>

<div class="flex justify-center flex-wrap">
    <Sponser sponsers={designers} />
</div>