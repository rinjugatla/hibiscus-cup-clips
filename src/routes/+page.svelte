<script lang="ts">
	import axios from 'redaxios';
	import { HIBISCUS_CUP_MEMBER, HIBISCUS_CUP_SPONSER } from '$lib/member';
	import { onMount } from 'svelte';
	import { HibiscusCupTeamMember, HibiscusCupSponser, type TwitchUser, type TwitchUserResponse } from '$lib/types';

    let sponserProfiles: HibiscusCupSponser[];
    let teamMemberProfiles: HibiscusCupTeamMember[];

    const getTeamMemberProfiles = async (): Promise<HibiscusCupTeamMember[]> => {
        const userNames = HIBISCUS_CUP_MEMBER.map((member) => member.twtich);
        const twitchUsers = await getTwitchUsers(userNames);

        // 順序を定義順にしたいのでHIBISCUS_CUP_MEMBER基準
        let teamProfiles: HibiscusCupTeamMember[] = [];
        for (const member of HIBISCUS_CUP_MEMBER) {
            const user = twitchUsers.find((user) => user.login === member.twtich)!;
            const memberProfile = new HibiscusCupTeamMember(member.name, user, '', member.team);
            teamProfiles.push(memberProfile);
        }
        return teamProfiles;
    }

    const getSponserProfiles = async (): Promise<HibiscusCupSponser[]> => {
        const userNames = HIBISCUS_CUP_SPONSER.filter((member) => member.twitch != null).
                                               map((member) => member.twitch!);
        const twitchUsers = await getTwitchUsers(userNames);

        let sponserProfiles: HibiscusCupSponser[] = [];
        // twitch情報がないユーザもいるのでHIBISCUS_CUP_SPONSER基準
        for (const sponser of HIBISCUS_CUP_SPONSER) {
            const user = twitchUsers.find((user) => user.login === sponser.twitch);
            const sponserProfile = new HibiscusCupSponser(sponser.name, user, '', sponser.role);
            sponserProfiles.push(sponserProfile);
        }

        return sponserProfiles;
    }

    const getTwitchUsers = async (userNames: string[]): Promise<TwitchUser[]> => {
        const response = await axios.post<TwitchUserResponse>(
            '/api/twitch/users',
            { names: userNames }
        );

        const users = response.data.users;
        return users;
    }

    onMount(async () => {
        sponserProfiles = await getSponserProfiles();
        console.log(sponserProfiles);

        teamMemberProfiles = await getTeamMemberProfiles();
        console.log(teamMemberProfiles);
    });
</script>



<div>
    {#if !sponserProfiles}
        <p>loading...</p>
    {:else}
        {#each sponserProfiles as sponser}
            <div>
                <p>{sponser.Role}</p>
                <p>{sponser.Name}</p>
            </div>
        {/each}
    {/if}

</div>

<div>


    {#if !teamMemberProfiles}
    <p>loading...</p>
    {:else}
        {#each teamMemberProfiles as member}
            <div>
                <p>{member.Team}</p>
                <p>{member.Name}</p>
            </div>
        {/each}
    {/if}
</div>
