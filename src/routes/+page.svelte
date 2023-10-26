<script lang="ts">
	import type { TwitchClipResponse, TwitchUserResponse } from "$lib/server/twitch";
	import { json } from "@sveltejs/kit";
	import axios from 'redaxios';

    let username: string;
    let userData: TwitchUserResponse;
    let clipData: TwitchClipResponse;
</script>

<form>
    <input type="text" bind:value={username}>
    <button type="button" on:click={async () => {
        const users = await axios.post(
            '/api/twitch/users',
            { name: username }
        );
        userData = users.data.data[0];

        const clips = await axios.post(
            '/api/twitch/clips',
            {id: userData.id}
        )
        clipData = clips.data;
    }} >取得</button>
</form>
