<script lang="ts">
    import { Input, Label, Button } from 'flowbite-svelte';
	import type { TwitchClipResponse, TwitchUserResponse } from "$lib/server/twitch";
	import { json } from "@sveltejs/kit";
	import axios from 'redaxios';

    let username: string;
    let userData: TwitchUserResponse;
    let clipData: TwitchClipResponse;
</script>

<form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label for="name" class="mb-2">Twitchユーザ名</Label>
          <Input type="text" id="name" bind:value={username} required />
        </div>
    </div>
    <div  class="grid gap-6 mb-6 md:grid-cols-2">
        <Button on:click={async () => {
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
        }}>取得</Button>
    </div>
</form>