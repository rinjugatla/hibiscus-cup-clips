<script lang="ts">
	import { HIBISCUS_CUP_SPONSER, HIBISCUS_CUP_MEMBER } from '$lib/member';
	import type { HTMLImgAttributes } from 'svelte/elements';
    import axios from 'redaxios';

	import Carousel from '$lib/components/flowbite-svelte-costoms/carousel/Carousel.svelte';
	import Thumbnails from '$lib/components/flowbite-svelte-costoms/carousel/Thumbnails.svelte';
	import type { ITwitchVideoResponse } from '$lib/types';
	import { onMount } from 'svelte';

	let index = 0;
    let selectedImage: HTMLImgAttributes;
	let forward = true; // sync animation direction between Thumbnails and Carousel
    let streamInfos: {
        [key: string]: 
        {
            thumbnail_url: string, 
            url: string
        }} = {};

	const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';
	const createProfileImageAttributes = (): HTMLImgAttributes[] => {
		let attributes: HTMLImgAttributes[] = [];
        for (const sponser of HIBISCUS_CUP_SPONSER) {
            const hasVideo = sponser.video_id.length > 0;
            if (!hasVideo) { continue; }

            attributes.push({
				src: profile_image_prefix + sponser.profile_image,
				alt: sponser.twitch
			});
        }

		for (const member of HIBISCUS_CUP_MEMBER) {
			attributes.push({
				src: profile_image_prefix + member.profile_image,
				alt: member.twitch
			});
		}
		return attributes;
	};

	const images = createProfileImageAttributes();

    const getStreams = async () => {
        const sponsersStreamIds = new Set(HIBISCUS_CUP_SPONSER.filter((s) => s.video_id.length > 0).map((s) => s.video_id).flat());
        const memberStreamIds = new Set(HIBISCUS_CUP_MEMBER.filter((m) => m.video_id.length > 0).map((m) => m.video_id).flat())
        const streamIds = [Array.from(sponsersStreamIds), Array.from(memberStreamIds)].flat();

        const response = await axios.post<ITwitchVideoResponse>(
            '/api/twitch/videos',
            {ids: streamIds}
        );

        const streams = response.data.videos;
        return streams;
    };

    const setStreamInfo = async () => {
        const streams = await getStreams();

        for (const stream of streams) {
            streamInfos[stream.user_login] = {
                thumbnail_url: stream.thumbnail_url,
                url: stream.url
            }
        }
    };
    
    onMount(async () => {
        await setStreamInfo();
    })
</script>

<div class="flex flex-col items-center">
    <div class="max-w-4xl space-y-4">
        <Carousel {images} {forward} transition={null} slideDuration={500} let:Controls bind:index>
            <Controls />
        </Carousel>
        <Thumbnails {images} {forward} throttleDelay={250} imgClass="h-[50px] w-auto" bind:index bind:selectedImage />
    </div>
</div>