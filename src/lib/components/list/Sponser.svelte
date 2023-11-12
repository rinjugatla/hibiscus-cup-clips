<script lang="ts">
	import type { IHibiscusCupSponserInfo, ITwitchUser } from '$lib/types';
    import { Card, Avatar, Button } from 'flowbite-svelte';
    import TwitchLinkIcon from '$lib/components/link-icon/TwitchLinkIcon.svelte';
    import TwitterLinkIcon from '$lib/components/link-icon/TwitterLinkIcon.svelte';

    const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';

    export let twitchUserInfo: ITwitchUser[];
    export let sponsers: IHibiscusCupSponserInfo[];
    let role = sponsers.map((sponser) => sponser.role)[0];
</script>


<div class="m-2">
    <Card padding="sm" horizontal={true}>
        <span class="text-lg text-gray-500 dark:text-gray-400 mr-3">{role}</span>
        {#each sponsers as sponser}
            <div class="flex flex-col items-center">
                <Avatar size="lg" 
                        src="{twitchUserInfo == null || twitchUserInfo.filter((user) => user.login === sponser.twitch).length === 0 ? 
                                profile_image_prefix + sponser.profile_image : 
                                twitchUserInfo.filter((user) => user.login === sponser.twitch)[0].profile_image_url}" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{sponser.name}</h5>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                    <TwitchLinkIcon name={sponser.twitch} />
                    <TwitterLinkIcon name={sponser.twitter} />
                </div>
            </div>
        {/each}
    </Card>
</div>