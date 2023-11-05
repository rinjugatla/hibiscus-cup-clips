<script lang="ts">
	import { HIBISCUS_CUP_SPONSER, HIBISCUS_CUP_MEMBER } from '$lib/member';
	import type { HTMLImgAttributes } from 'svelte/elements';
    import axios from 'redaxios';

	import Carousel from '$lib/components/flowbite-svelte-costoms/carousel/Carousel.svelte';
	import Thumbnails from '$lib/components/flowbite-svelte-costoms/carousel/Thumbnails.svelte';
    import Clips from '$lib/components/twtich/Clips.svelte';
	import type { IStreamInfos, ITwitchClip, ITwitchClipResponse, ITwitchVideoResponse } from '$lib/types';
    import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';

	let index = 0;
    let images: HTMLImgAttributes[] = [];
    let selectedImage: HTMLImgAttributes;
	let forward = true; // sync animation direction between Thumbnails and Carousel
    let streamInfos: IStreamInfos = {};
    let selectedStreamClips: ITwitchClip[];
    $: (async() => {
        // 切り替え時後のロード中に別の動画のクリップが表示されるので一度初期化
        selectedStreamClips = [];
        selectedStreamClips = await getStreamClips(selectedImage);
    })()

	const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';
	const setProfileImageAttributes = () => {
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
		
        images = attributes;
	};

    const getStreams = async () => {
        const sponsersStreamIds = new Set(HIBISCUS_CUP_SPONSER.filter((s) => s.video_id.length > 0).map((s) => s.video_id[0]));
        const memberStreamIds = new Set(HIBISCUS_CUP_MEMBER.filter((m) => m.video_id.length > 0).map((m) => m.video_id[0]));
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
            streamInfos[stream.user_login] = stream
        }
    };

    /**
     * 動画に関連するクリップを取得
     */
    const getStreamClips = async (selectedImage: HTMLImgAttributes | null): Promise<ITwitchClip[]>  => {
        if (selectedImage == null){ return []; }

        const selectedStreamInfo = streamInfos[selectedImage.alt!];
        if (selectedStreamInfo == null){ return []; }

        const broadcasterId = selectedStreamInfo.user_id;
        const videoIds = getTwitchVideoIds(broadcasterId);
        const response = await axios.post<ITwitchClipResponse>(
            '/api/twitch/clips/videos',
            {
                broadcaster_id: broadcasterId,
                video_ids: videoIds
            }
        );
        
        const clips = response.data.clips;
        return clips;
    }

    /**
     * Twitch名からVideoIdを取得
     * @param twitchName Twitch名
     */
    const getTwitchVideoIds = (broadcasterId: string): string[] => {
        const sponsers = HIBISCUS_CUP_SPONSER.filter((sponser) => sponser.twitch_id === broadcasterId);
        if (sponsers.length > 0){
            const result = sponsers[0].video_id;
            return result;
        }

        const members = HIBISCUS_CUP_MEMBER.filter((member) => member.twitch_id === broadcasterId);
        if (members.length > 0){
            const result = members[0].video_id;
            return result;
        }

        return [];
    }
    
    onMount(async () => {
        setProfileImageAttributes();
        await setStreamInfo();
        selectedImage = images[index];
    })
</script>

<div class="flex flex-col items-center">
    <div class="max-w-7xl space-y-4">
        <Carousel {images} {streamInfos} {forward} transition={null} slideDuration={500} bind:index />
        <Thumbnails {images} {forward} throttleDelay={250} imgClass="h-[50px] w-auto" bind:index bind:selectedImage />
    </div>

    <div class="m-5">
        {#if (selectedStreamClips === null || selectedStreamClips.length === 0)}
            <div class="text-center"><Spinner /></div>
        {:else}
            <Clips clips={selectedStreamClips} />
        {/if}
    </div>   
</div>