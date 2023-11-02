<script lang="ts">
	import { HIBISCUS_CUP_SPONSER, HIBISCUS_CUP_MEMBER } from '$lib/member';
	import type { HTMLImgAttributes } from 'svelte/elements';

	import Carousel from '$lib/components/flowbite-svelte-costoms/carousel/Carousel.svelte';
	import Thumbnails from '$lib/components/flowbite-svelte-costoms/carousel/Thumbnails.svelte';

	let index = 0;
	let forward = true; // sync animation direction between Thumbnails and Carousel

	const profile_image_prefix = 'https://pbs.twimg.com/profile_images/';
	const createProfileImageAttributes = (): HTMLImgAttributes[] => {
		let attributes: HTMLImgAttributes[] = [];
        for (const sponser of HIBISCUS_CUP_SPONSER) {
            const hasVideo = sponser.video_id.length > 0;
            if (!hasVideo) { continue; }

            attributes.push({
				src: profile_image_prefix + sponser.profile_image,
				alt: sponser.name
			});
        }

		for (const member of HIBISCUS_CUP_MEMBER) {
			attributes.push({
				src: profile_image_prefix + member.profile_image,
				alt: member.name
			});
		}
		return attributes;
	};

	const images = createProfileImageAttributes();
</script>

<div class="flex flex-col items-center h-full">
    <div class="max-w-4xl space-y-4">
        <Carousel {images} {forward} transition={null} slideDuration={500} let:Controls bind:index>
            <Controls />
        </Carousel>
        <Thumbnails {images} {forward} throttleDelay={250} imgClass="h-[50px] w-auto" bind:index />
    </div>
</div>