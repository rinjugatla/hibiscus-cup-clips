import { twitchApi } from "$lib/store";
import { json } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function POST({ request }): Promise<Response> {
    console.log('/api/twitch/videos request', request);

    const isSelfRequest = request.credentials == 'same-origin';
    if (!isSelfRequest){ return json(new Response()); }
    
    const api = get(twitchApi);
    
    const { ids } = await request.json();
    const response = await api.getVideos(ids);

    console.log('/api/twitch/videos response', response);

    return json(response);
}