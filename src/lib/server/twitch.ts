import axios from 'redaxios';

export class TwitchApiSetting {
	private _ClientId: string;
	private _ClientSecret: string;

	/**
	 *
	 * @param id クライアントID
	 * @param secret 秘密鍵
	 */
	constructor(id: string, secret: string) {
		this._ClientId = id;
		this._ClientSecret = secret;
	}

	get ClientId(): string {
		return this._ClientId;
	}

	get ClientSecret(): string {
		return this._ClientSecret;
	}
}

class TwitchToken {
	private _AccessToken: string;
	private _ExpiresIn: number;
	private _TokenType: string;

	/**
	 *
	 * @param token トークン
	 * @param expires 期限
	 * @param tokenType トークンタイプ
	 */
	constructor(data: TwitchTokenResponse) {
		this._AccessToken = data.access_token;
		this._ExpiresIn = data.expires_in;
		this._TokenType = data.token_type;
	}

	/**
	 * トークンが期限切れか
	 * @param prevGetTokenTime 前回のトークン取得時間
	 */
	isExpired(prevGetTokenTime: number): boolean {
		const notInit = prevGetTokenTime == 0;
		if (notInit) {
			return true;
		}

		const expired = Date.now() - prevGetTokenTime > this._ExpiresIn;
		return expired;
	}

	get token(): string {
		const param = `Bearer ${this._AccessToken}`;
		return param;
	}
}

export interface TwitchTokenResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
}

export interface TwitchUserResponse {
	id: string;
	login: string;
	display_name: string;
	type: string;
	broadcaster_type: string;
	description: string;
	profile_image_url: string;
	offline_image_url: string;
	view_count: number;
	created_at: string;
}

export interface TwitchClip {
	id: string;
	url: string;
	embed_url: string;
	broadcaster_id: string;
	broadcaster_name: string;
	creator_id: string;
	creator_name: string;
	video_id: string;
	game_id: string;
	language: string;
	title: string;
	view_count: number;
	created_at: string;
	thumbnail_url: string;
	duration: number;
	vod_offset: number;
	is_featured: boolean;
}

export interface TwitchClipResponse {
	data: [TwitchClip];
}

export class TwitchApi {
	_Setting: TwitchApiSetting;
	_Token: TwitchToken | null;
	_PrevGetTokenTime: number;

	constructor(setting: TwitchApiSetting) {
		this._Setting = setting;
		this._Token = null;
		this._PrevGetTokenTime = 0;

		this.refreshToken();
	}

	private async refreshToken() {
		const needRefresh = this._Token == null || this._Token.isExpired(this._PrevGetTokenTime);
		if (!needRefresh) {
			console.log('dont need refresh token.');
			return;
		}

		const url = 'https://id.twitch.tv/oauth2/token';
		const response = await axios.post<TwitchTokenResponse>(url, {
			client_id: this._Setting.ClientId,
			client_secret: this._Setting.ClientSecret,
			grant_type: 'client_credentials'
		});
		this._Token = new TwitchToken(response.data);
		this._PrevGetTokenTime = Date.now();
		console.log('refreshed token.');
	}

	async getUser(name: string): Promise<TwitchUserResponse> {
		await this.refreshToken();

		const url = 'https://api.twitch.tv/helix/users';
		const response = await axios.get<TwitchUserResponse>(url, {
			headers: {
				Authorization: this._Token!.token,
				'Client-Id': this._Setting.ClientId
			},
			params: {
				login: name
			}
		});
		return response.data;
	}

	async getClips(id: number): Promise<TwitchClipResponse> {
		await this.refreshToken();

		const url = 'https://api.twitch.tv/helix/clips';
		const response = await axios.get(url, {
			headers: {
				Authorization: this._Token!.token,
				'Client-Id': this._Setting.ClientId
			},
			params: {
				broadcaster_id: id
			}
		});
		return response.data;
	}
}
