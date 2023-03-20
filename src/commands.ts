import { Command } from './interactions';
import { ApplicationCommandOptionType } from './enums';

const HelloCommand: Command = {
	name: 'hello',
	description: 'Says hello back to you',
	run: (interaction) => {
		const user = interaction.member.user.id;
		return Promise.resolve(`Hello <@${user}>!`);
	}
}

export const Commands = [
	HelloCommand
];
