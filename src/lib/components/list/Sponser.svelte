<script lang="ts">
	import type { IHibiscusCupSponserInfo } from '$lib/types';
    import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';

    const twitch_channel_prefix = 'https://www.twitch.tv/';
    const twitter_profile_prefix = 'https://twitter.com/';
    const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';

    export let sponser: IHibiscusCupSponserInfo;
</script>

<div class="m-2">
    <Card padding="sm">
        <div class="flex flex-col items-center">
            <Avatar size="lg" src="{profile_image_prefix}{sponser.profile_image}" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{sponser.name}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{sponser.role}</span>
            <div class="flex mt-4 space-x-3 lg:mt-6">
                <Button color="purple" disabled={sponser.twitch == ''} on:click={() =>  {window.open(twitch_channel_prefix + sponser.twitch)}}>Twitch</Button>
                <Button color="blue" on:click={() =>  {window.open(twitter_profile_prefix + sponser.twitter)}}>Twitter</Button>
            </div>
        </div>
    </Card>
</div>