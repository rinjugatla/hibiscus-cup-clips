<script lang="ts">
	import axios from 'redaxios';
	import type { TwitchUser, TwitchUserResponse } from '$lib/server/twitch';
	import { HIBISCUS_CUP_MEMBER, HIBISCUS_CUP_SPONSER } from '$lib/member';
	import { onMount } from 'svelte';

    let sponserProfiles: HibiscusCupSponser[];
    let teamMemberProfiles: HibiscusCupTeamMember[];

    class HibiscusCupBase {
        private _Name: string;
        private _Twitch: TwitchUser | undefined;
        private _YoutubeId: string;

        constructor (name: string, twitch: TwitchUser | undefined, youtubeId: string) {
            this._Name = name;
            this._Twitch = twitch;
            this._YoutubeId = youtubeId;
        }

        get Name (): string {
            return this._Name;
        }

        get TwitchProfileImageLink (): string | undefined {
            return this._Twitch?.profile_image_url;
        }

        // 自己紹介
        get Description (): string | undefined {
            return this._Twitch?.description
        }

        get YoutubeLink (): string {
            const link = `https://www.youtube.com/${this._YoutubeId}`;
            return link;
        }
    }

    class HibiscusCupSponser extends HibiscusCupBase {
        private _Role: string;

        constructor (name: string, twitch: TwitchUser | undefined, youtubeId: string, role: string){
            super(name, twitch, youtubeId);
            this._Role = role;
        }

        get Role(): string {
            return this._Role;
        }
    }

    class HibiscusCupTeamMember extends HibiscusCupBase {
        private _Team: string;

        constructor (name: string, twitch: TwitchUser, youtubeId: string, team: string){
            super(name, twitch, youtubeId);
            this._Team = team;
        }

        get Team(): string {
            return this._Team;
        }
    }

    const getTeamMemberProfiles = async (): Promise<HibiscusCupTeamMember[]> => {
        const userNames = HIBISCUS_CUP_MEMBER.map((member) => member.twtich);
        const twitchUsers = await getTwitchUsers(userNames);

        let teamProfiles: HibiscusCupTeamMember[] = [];
        for (const user of twitchUsers) {
            const info = HIBISCUS_CUP_MEMBER.find((member) => member.twtich === user.login)!;
            const memberProfile = new HibiscusCupTeamMember(info.name, user, '', info.team);
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
