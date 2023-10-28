<script lang="ts">
    import { Input, Label, Button } from 'flowbite-svelte';
	import { json } from "@sveltejs/kit";
	import axios from 'redaxios';
	import Clips from '$lib/components/twtich/Clips.svelte';
	import type { TwitchClip, TwitchClipResponse, TwitchUser, TwitchUserResponse } from '$lib/server/twitch';

    let username: string;
    let userData: TwitchUser;
    let clipData: TwitchClipResponse;

    const getClips = async () => {
        const users = await axios.post<TwitchUserResponse>(
                '/api/twitch/users',
                { name: username }
            );
            userData = users.data.users[0];
    
            const clips = await axios.post<TwitchClipResponse>(
                '/api/twitch/clips',
                {id: userData.id}
            )
            clipData = clips.data;
    }
</script>

<form>
    <div class="grid gap-6 mb-6">
        <div>
          <Label for="name" class="mb-2">Twitchユーザ名</Label>
          <Input type="text" id="name" bind:value={username} required />
        </div>
    </div>
    <div  class="grid gap-6 mb-6">
        <Button on:click={async () => {getClips();}}>取得</Button>
    </div>
</form>

{#if clipData != null}
    <Clips clips={clipData.clips}></Clips>     
{/if}