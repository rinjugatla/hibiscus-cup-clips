<script lang="ts">
	import { Footer, FooterIcon } from 'flowbite-svelte';
	import TwitterLinkIcon from '../link-icon/TwitterLinkIcon.svelte';
	import GithubLinkIcon from '../link-icon/GithubLinkIcon.svelte';

	const twitter_name = 'rin_jugatla';
	const github_name = 'rinjugatla/hibiscus-cup-clips';
</script>

<div class="mt-auto">
	<Footer footerType="socialmedia" >
		<div class="sm:flex sm:items-center sm:justify-between ">
			<div class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
				2023 rin_jugatla
			</div>
			<div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
				<TwitterLinkIcon name={twitter_name} />
				<GithubLinkIcon name={github_name} />
			</div>
		</div>
	</Footer>
</div>
