import type { ITwitchClipAPIResponse, ITwitchClipResponse, ITwitchTokenResponse, ITwitchUserAPIResponse, ITwitchUserResponse } from '$lib/types';
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
	constructor(data: ITwitchTokenResponse) {
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
		const response = await axios.post<ITwitchTokenResponse>(url, {
			client_id: this._Setting.ClientId,
			client_secret: this._Setting.ClientSecret,
			grant_type: 'client_credentials'
		});
		this._Token = new TwitchToken(response.data);
		this._PrevGetTokenTime = Date.now();
		console.log('refreshed token.');
	}

	async getUser(names: [string]): Promise<ITwitchUserResponse> {
		await this.refreshToken();
		const url = 'https://api.twitch.tv/helix/users';

		const userNameParams = this.createUserNameParams(names);
		const response = await axios.get<ITwitchUserAPIResponse>(url, {
			headers: {
				Authorization: this._Token!.token,
				'Client-Id': this._Setting.ClientId
			},
			params: userNameParams
		});
		const users = {users: response.data.data};
		return users;
	}

	private createUserNameParams(names: [string]): URLSearchParams {
		const params = new URLSearchParams();
		for (const name of names) {
			params.append('login', name);
		}
		return params;
	}

	async getClips(id: number): Promise<ITwitchClipResponse> {
		await this.refreshToken();

		const url = 'https://api.twitch.tv/helix/clips';
		const response = await axios.get<ITwitchClipAPIResponse>(url, {
			headers: {
				Authorization: this._Token!.token,
				'Client-Id': this._Setting.ClientId
			},
			params: {
				broadcaster_id: id
			}
		});
		const clips = {clips: response.data.data};
		return clips;
	}
}
