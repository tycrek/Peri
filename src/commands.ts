import { Command } from './interactions';
import { ApplicationCommandOptionType } from './enums';

const HelloCommand: Command = {
	name: 'hello',
	description: 'Says hello back to you',
	run: (interaction) => {
		const user = interaction.member.user.id;
		return Promise.resolve(`Hello <@${user}>!`);
	}
};

const McSkinCommand: Command = {
	name: 'mcskin',
	description: 'Gets the skin of a Minecraft player',
	options: [
		{
			name: 'player',
			description: 'The Minecraft player to get the skin of',
			type: ApplicationCommandOptionType.STRING,
			autocomplete: true,
			required: true,
			max_length: 16,
		}
	],
	run: (interaction) => {
		const player = interaction.data.options[0].value;
		return Promise.resolve(`https://mulv.tycrek.dev/api/lookup?username=${player}&type=skin`);
	}
};

export const Commands = [
	HelloCommand,
	McSkinCommand,
];
