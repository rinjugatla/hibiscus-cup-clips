<script lang="ts">
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
</script>

<Navbar class="bg-hibiscus_cup_theme_header">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>HibiscusCup Clips</span
		>
	</NavBrand>
	<NavHamburger/>
	<NavUl ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium bg-hibiscus_cup_theme_header">
		<NavLi href="/">Home</NavLi>
		<NavLi href="/sponsers">Sponsers</NavLi>
		<NavLi href="/teams">Teams</NavLi>
        <NavLi href="/streams">Streams</NavLi>
        <NavLi href="/clips">Clips</NavLi>
		<NavLi href="/team_ranking">Team ranking</NavLi>
		<NavLi href="/clip_ranking">Clip ranking</NavLi>
	</NavUl>
</Navbar>
