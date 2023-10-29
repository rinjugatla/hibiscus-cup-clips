import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { TwitchApi, TwitchApiSetting } from '$lib/server/twitch';
import { twitchApi } from '$lib/store';

// TwitchAPI初期化
twitchApi.subscribe((value) => {
	if (!value) {
		const twitchSetting = new TwitchApiSetting(CLIENT_ID, CLIENT_SECRET);
		twitchApi.set(new TwitchApi(twitchSetting));
	}
});