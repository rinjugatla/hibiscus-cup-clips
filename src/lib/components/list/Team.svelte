<script lang="ts">
	import type { IHibiscusCupMemberInfo } from '$lib/types';
    import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
    import TwitchLinkIcon from '$lib/components/link-icon/TwitchLinkIcon.svelte';
    import TwitterLinkIcon from '$lib/components/link-icon/TwitterLinkIcon.svelte';
    
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
                    <TwitchLinkIcon name={member.twitch} />
                    <TwitterLinkIcon name={member.twitter} />
                </div>
            </div>
        {/each}
    </Card>
</div>