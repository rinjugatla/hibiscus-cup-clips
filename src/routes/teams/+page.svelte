<script lang="ts">
	import Team from "$lib/components/list/Team.svelte";
	import { HIBISCUS_CUP_MEMBER } from "$lib/member";
    import type { ITwitchUser, ITwitchUserResponse } from '$lib/types';
    import axios from 'redaxios';
	import { onMount } from "svelte";

    const teamCodes = new Set(HIBISCUS_CUP_MEMBER.map((member) => member.team));
    const getTeamMembers = (teamCode: string) => {
        const members = HIBISCUS_CUP_MEMBER.filter((member) => member.team === teamCode);
        return members
    }

    let twitchUserInfo: ITwitchUser[];
    const getTwitchUserInfo = async (): Promise<ITwitchUser[]> => {
        const memberNames = HIBISCUS_CUP_MEMBER.map((member) => member.twitch);
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

<div class="grid grid-cols-3 gap-4" >
    {#each teamCodes as teamCode}
        <div class="flex flex-col items-center">
            <Team members={getTeamMembers(teamCode)} 
                  {twitchUserInfo} />
        </div>
    {/each}
</div>
