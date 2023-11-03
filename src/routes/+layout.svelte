<script>
	import '../app.postcss';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />