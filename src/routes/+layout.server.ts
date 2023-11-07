import { TwitchApi, TwitchApiSetting } from '$lib/server/twitch';
import { twitchApi } from '$lib/store';

// TwitchAPI初期化
twitchApi.subscribe((value) => {
	if (!value) {
		const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
		const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET as string;

		const twitchSetting = new TwitchApiSetting(CLIENT_ID, CLIENT_SECRET);
		twitchApi.set(new TwitchApi(twitchSetting));
	}
});
