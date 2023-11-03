<script lang="ts">
	import type { IHibiscusCupSponserInfo } from '$lib/types';
    import { Card, Avatar, Button } from 'flowbite-svelte';
    import TwitchLinkIcon from '$lib/components/link-icon/TwitchLinkIcon.svelte';
    import TwitterLinkIcon from '$lib/components/link-icon/TwitterLinkIcon.svelte';

    const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';

    export let sponsers: IHibiscusCupSponserInfo[];
</script>

{#each sponsers as sponser}
    <div class="m-2">
        <Card padding="sm">
            <div class="flex flex-col items-center">
                <Avatar size="lg" src="{profile_image_prefix}{sponser.profile_image}" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{sponser.name}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">{sponser.role}</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                    <TwitchLinkIcon name={sponser.twitch} />
                    <TwitterLinkIcon name={sponser.twitter} />
                </div>
            </div>
        </Card>
    </div>
{/each}