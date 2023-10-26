import { writable } from "svelte/store";
import type { TwitchApi } from "./server/twitch";

export const twitchApi = writable<TwitchApi>();