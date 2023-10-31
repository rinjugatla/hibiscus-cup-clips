<script lang="ts">
	import type { IHibiscusCupMemberInfo } from '$lib/types';
    import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';

    const twitch_channel_prefix = 'https://www.twitch.tv/';
    const twitter_profile_prefix = 'https://twitter.com/';
    const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';

    export let members: IHibiscusCupMemberInfo[];
    let teamCode = members.map((member) => member.team)[0];
</script>

<div class="m-2">
    <Card padding="sm" horizontal={true}>
        <span class="text-lg text-gray-500 dark:text-gray-400">チーム{teamCode}</span>
        {#each members as member}
            <div class="flex flex-col items-center mx-3">
                <Avatar size="lg" src="{profile_image_prefix}{member.profile_image}" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{member.name}</h5>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                    <Button color="purple" disabled={member.twtich == ''} on:click={() =>  {window.open(twitch_channel_prefix + member.twtich)}}>Twitch</Button>
                    <Button color="blue" on:click={() =>  {window.open(twitter_profile_prefix + member.twitter)}}>Twitter</Button>
                </div>
            </div>
        {/each}
    </Card>
</div>