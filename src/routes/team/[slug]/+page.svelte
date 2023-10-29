<script lang='ts'>
	import type { TwitchClip, TwitchClipResponse, TwitchUser, TwitchUserResponse } from "$lib/server/twitch";
    import Clips from '$lib/components/twtich/Clips.svelte';
	import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import axios from 'redaxios';
	import { HIBISCUS_CUP_MEMBER } from "$lib/member";
    export let data: PageData;

    interface TwitchUserClips {
        [key: string] : {
            user: TwitchUser,
            clips: [TwitchClip]
        }
    }

    let usersClips: TwitchUserClips = {};

    const getTeamCode = (): string|null => {
        const match = data.team.match('^[A-I]$')
        return match ? match[0] : null;
    }

    const getTeamUsers = async (teamCode: string): Promise<[TwitchUser]> => {
        const teamUsers = HIBISCUS_CUP_MEMBER.filter((member) => member.team === teamCode);
        const twitchUserNames = teamUsers.map((user) => user.twtich);
        const response = await axios.post<TwitchUserResponse>(
            '/api/twitch/users',
            { names: twitchUserNames }
        );

        const users = response.data.users;
        return users;
    }

    const getClips = async (user: TwitchUser) => {
        const response = await axios.post<TwitchClipResponse>(
            '/api/twitch/clips',
            {id: user.id}
        );

        const clips = response.data.clips;
        return clips;
    }

    onMount( async () => {
        const teamCode = getTeamCode();
        if (teamCode == null) { return ;}

        const users = await getTeamUsers(teamCode);
        for (const user of users) {
            const clips = await getClips(user);
            const name = user.login;
            usersClips[name] = { user: user, clips: clips };
        }
    });
</script>

{#await usersClips}
    <p>loading...</p>
{:then value}
    {#each Object.entries(value) as [key, data]}
        <Clips clips={data.clips}></Clips>
    {/each}
{/await}


