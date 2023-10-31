export interface ITwitchTokenResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
}

export interface ITwitchUserAPIResponse {
    data: [ITwitchUser];
}

export interface ITwitchUserResponse {
	users: [ITwitchUser]
}

export interface ITwitchUser {
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

export interface ITwitchClipAPIResponse {
	data: [ITwitchClip];
}

export interface ITwitchClipResponse {
	clips: [ITwitchClip]
}

export interface ITwitchClip {
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

export class HibiscusCupBase {
    private _Name: string;
    private _Twitch: ITwitchUser | undefined;
    private _YoutubeId: string;

    constructor (name: string, twitch: ITwitchUser | undefined, youtubeId: string) {
        this._Name = name;
        this._Twitch = twitch;
        this._YoutubeId = youtubeId;
    }

    get Name (): string {
        return this._Name;
    }

    get TwitchProfileImageLink (): string | undefined {
        return this._Twitch?.profile_image_url;
    }

    // 自己紹介
    get Description (): string | undefined {
        return this._Twitch?.description
    }

    get YoutubeLink (): string {
        const link = `https://www.youtube.com/${this._YoutubeId}`;
        return link;
    }
}

export class HibiscusCupSponser extends HibiscusCupBase {
    private _Role: string;

    constructor (name: string, twitch: ITwitchUser | undefined, youtubeId: string, role: string){
        super(name, twitch, youtubeId);
        this._Role = role;
    }

    get Role(): string {
        return this._Role;
    }
}

export class HibiscusCupTeamMember extends HibiscusCupBase {
    private _Team: string;

    constructor (name: string, twitch: ITwitchUser, youtubeId: string, team: string){
        super(name, twitch, youtubeId);
        this._Team = team;
    }

    get Team(): string {
        return this._Team;
    }
}

export interface IHibiscusCupSponserInfo {
    role: string;
    name: string;
    twitch: string;
    twitter: string;
    video_id: string[];
    profile_image: string;
}

export interface IHibiscusCupMemberInfo {
    team: string;
    name: string;
    twtich: string;
    twitter: string;
    video_id: string[];
    profile_image: string;
}