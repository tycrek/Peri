import { InteractionType } from 'discord-interactions';

/*
Example interaction:
	"type": 2,
	"token": "A_UNIQUE_TOKEN",
	"member": {
		"user": {
			"id": "53908232506183680",
			"username": "Mason",
			"avatar": "a_d5efa99b3eeaa7dd43acca82f5692432",
			"discriminator": "1337",
			"public_flags": 131141
		},
		"roles": ["539082325061836999"],
		"premium_since": null,
		"permissions": "2147483647",
		"pending": false,
		"nick": null,
		"mute": false,
		"joined_at": "2017-03-13T19:19:14.040000+00:00",
		"is_pending": false,
		"deaf": false
	},
	"id": "786008729715212338",
	"guild_id": "290926798626357999",
	"app_permissions": "442368",
	"guild_locale": "en-US",
	"locale": "en-US",
	"data": {
		"options": [{
			"type": 3,
			"name": "cardname",
			"value": "The Gitrog Monster"
		}],
		"type": 1,
		"name": "cardsearch",
		"id": "771825006014889984"
	},
	"channel_id": "645027906669510667"
*/
export interface Interaction {
	type: InteractionType;
	token: string;
	member: {
		user: {
			id: string;
			username: string;
			avatar: string;
			discriminator: string;
			public_flags: number;
		};
		roles: string[];
		premium_since: null | string;
		permissions: string;
		pending: boolean;
		nick: null | string;
		mute: boolean;
		joined_at: string;
		is_pending: boolean;
		deaf: boolean;
	};
	id: string;
	guild_id: string;
	app_permissions: string;
	guild_locale: string;
	locale: string;
	data: {
		options: {
			type: number;
			name: string;
			value: string;
		}[];
		type: number;
		name: string;
		id: string;
	};
	channel_id: string;
}

export interface Command {
	name: string;
	description: string;
	run: (interaction: Interaction) => Promise<string>;
}
