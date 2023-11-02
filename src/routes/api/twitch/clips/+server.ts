import { twitchApi } from "$lib/store";
import { json } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function POST({ request }): Promise<Response> {
    const isSelfRequest = request.credentials == 'same-origin';
    if (!isSelfRequest){ return json(new Response()); }
    
    const api = get(twitchApi);

    const { id } = await request.json();
    const response = await api.getClips(id);
    return json(response);
}