<script>
	import '../app.postcss';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />	
</div>
