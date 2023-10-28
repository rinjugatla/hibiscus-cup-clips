import { twitchApi } from "$lib/store";
import { json } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function POST({ request }): Promise<Response> {
    const api = get(twitchApi);

    const { names } = await request.json();
    const response = await api.getUser(names);
    return json(response);
}