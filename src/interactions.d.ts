import { InteractionType } from 'discord-interactions';
import { ApplicationCommandOptionType, ChannelType } from './enums';

type Localizations = { [locale: string]: string };

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
		options?: {
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

interface CommandOption {
	type: ApplicationCommandOptionType;
	name: string;
	name_localizations?: Localizations;
	description: string;
	description_localizations?: Localizations;
	required?: boolean;
	choices?: {
		name: string;
		name_localizations?: Localizations;
		value: string | number;
	}[];
	options?: CommandOption[];
	channel_types?: ChannelType[];
	min_value?: number;
	max_value?: number;
	min_length?: number;
	max_length?: number;
	autocomplete?: boolean;
}

export interface Command {
	name: string;
	description: string;
	options?: CommandOption[];
	run: (interaction: Interaction) => Promise<string>;
}
