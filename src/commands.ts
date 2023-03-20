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
			required: true,
			max_length: 16,
		}
	],
	run: (interaction) => {
		const player = interaction.data.options[0].value;
		return Promise.resolve(`https://mulv.tycrek.dev/api/lookup?username=${player}&type=skin`);
	}
};

const MeowCommand: Command = {
	name: 'meow',
	description: 'Cats! :3',
	run: (interaction) => fetch('https://aws.random.cat/meow')
		.then((res) => res.json())
		.then((json: any) => json.file)
		.catch((err) => Promise.reject(err))
};

const WoofCommand: Command = {
	name: 'woof',
	description: 'Dogs! :D',
	run: (interaction) => fetch('https://random.dog/woof.json')
		.then((res) => res.json())
		.then((json: any) => json.url)
		.catch((err) => Promise.reject(err))
};

const FloofCommand: Command = {
	name: 'floof',
	description: 'Foxes! :>',
	run: (interaction) => fetch('https://randomfox.ca/floof/')
		.then((res) => res.json())
		.then((json: any) => json.image)
		.catch((err) => Promise.reject(err))
};

const ShibeCommand: Command = {
	name: 'shibe',
	description: 'Shibes! UwU',
	run: (interaction) => fetch('https://shibe.online/api/shibes')
		.then((res) => res.json())
		.then((json: any) => json[0])
		.catch((err) => Promise.reject(err))
};

const ShibeBirdCommand: Command = {
	name: 'chirp',
	description: 'Birds! :P',
	run: (interaction) => fetch('https://shibe.online/api/birds')
		.then((res) => res.json())
		.then((json: any) => json[0])
		.catch((err) => Promise.reject(err))
};

/**
 * https://www.boredapi.com/documentation
 */
const BoredCommand: Command = {
	name: 'imbored',
	description: 'Bored? Here\'s something to do!',
	options: [
		{
			name: 'participants',
			description: 'The number of participants',
			type: ApplicationCommandOptionType.INTEGER,
			required: false,
		},
		{
			name: 'type',
			description: 'The type of activity',
			type: ApplicationCommandOptionType.STRING,
			required: false,
			choices: ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']
				.map((activity) => ({ name: activity, value: `type_${activity}` })),
		},
	],
	run: (interaction) => {
		const participants = interaction.data.options?.find((option) => option.name === 'participants')?.value ?? 1;
		const type = interaction.data.options?.find((option) => option.name === 'type')?.value?.replace('type_', '') ?? null;
		return fetch(`https://www.boredapi.com/api/activity?participants=${participants}${type ? `&type=${type}` : ''}`)
			.then((res) => res.json())
			.then((json: any) => json.activity || json.error)
			.catch((err) => Promise.reject(err));
	}
};

const InsultCommand: Command = {
	name: 'insult',
	description: 'Insults a user',
	run: (interaction) => fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
		.then((res) => res.json())
		.then((json: any) => json.insult)
		.catch((err) => Promise.reject(err))
};

export const Commands = [
	HelloCommand,
	McSkinCommand,
	MeowCommand,
	WoofCommand,
	FloofCommand,
	ShibeCommand,
	ShibeBirdCommand,
	BoredCommand,
	InsultCommand,
];
