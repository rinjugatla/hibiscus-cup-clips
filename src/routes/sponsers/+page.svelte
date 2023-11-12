<script lang="ts">
	import { HIBISCUS_CUP_SPONSER } from '$lib/member';
    import Sponser from '$lib/components/list/Sponser.svelte';
	import type { ITwitchUser, ITwitchUserResponse } from '$lib/types';
    import axios from 'redaxios';
	import { onMount } from 'svelte';
    
    const sponsers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '主催');
    const plans = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '企画');
    const managers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === '運営');
    const designers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.role === 'ロゴ');

    let twitchUserInfo: ITwitchUser[];
    const getTwitchUserInfo = async (): Promise<ITwitchUser[]> => {
        const memberNames = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.twitch != '').map((sponser) => sponser.twitch);
        const response = await axios.post<ITwitchUserResponse>(
            '/api/twitch/users',
            { names: memberNames }
        );
        const users = response.data.users;
        return users;
    }

    onMount( async () => {
        twitchUserInfo = await getTwitchUserInfo();
    })
</script>

<div class="flex justify-center flex-wrap">
    <Sponser {sponsers} {twitchUserInfo}/>
</div>

<div class="flex justify-center flex-wrap">
    <Sponser sponsers={plans} {twitchUserInfo}/>
</div>

<div class="flex justify-center flex-wrap">
    <Sponser sponsers={managers} {twitchUserInfo}/>
</div>

<div class="flex justify-center flex-wrap">
    <Sponser sponsers={designers} {twitchUserInfo}/>
</div>