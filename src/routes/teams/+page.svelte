<script lang="ts">
	import Team from "$lib/components/list/Team.svelte";
	import { HIBISCUS_CUP_MEMBER } from "$lib/member";

    const teamCodes = new Set(HIBISCUS_CUP_MEMBER.map((member) => member.team));
    const getTeamMembers = (teamCode: string) => {
        const members = HIBISCUS_CUP_MEMBER.filter((member) => member.team === teamCode);
        return members
    }
</script>

<div class="grid grid-cols-3 gap-4" >
    {#each teamCodes as teamCode}
        <div class="flex flex-col items-center">
            <Team members={getTeamMembers(teamCode)} />
        </div>
    {/each}
</div>
