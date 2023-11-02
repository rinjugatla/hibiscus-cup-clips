<script lang="ts">
	import { Section, Page404 } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
</script>

<Section name="page404">
	<Page404>
		<svelte:fragment slot="h1">404</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
				ページが見つかりません
			</p>
			<Button href="/" size="lg" color="red">トップページに戻る</Button>
		</svelte:fragment>
	</Page404>
</Section>
