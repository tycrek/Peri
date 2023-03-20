import { nanoid } from 'nanoid';
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

const AdviceCommand: Command = {
	name: 'advice',
	description: 'Gives you some advice',
	run: (interaction) => fetch('https://api.adviceslip.com/advice')
		.then((res) => res.json())
		.then((json: any) => json.slip.advice)
		.catch((err) => Promise.reject(err))
};

const DadJokeCommand: Command = {
	name: 'dadjoke',
	description: 'Gives you a dad joke',
	run: (interaction) => fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
		.then((res) => res.json())
		.then((json: any) => json.joke)
		.catch((err) => Promise.reject(err))
};

const KanyeCommand: Command = {
	name: 'kanye',
	description: 'Gives you a Kanye West quote',
	run: (interaction) => fetch('https://api.kanye.rest/')
		.then((res) => res.json())
		.then((json: any) => json.quote)
		.catch((err) => Promise.reject(err))
};

/**
 * https://github.com/D3vd/Meme_Api
 */
const MemeSfwCommand: Command = {
	name: 'meme',
	description: 'Gives you a meme',
	run: (interaction) => fetch('https://meme-api.com/gimme')
		.then((res) => res.json())
		.then((json: any) => json.nsfw ? Promise.reject('NSFW content is not allowed in this channel!') : json.url)
		.catch((err) => Promise.reject(err))
};

const RiddleCommand: Command = {
	name: 'riddle',
	description: 'Gives you a riddle',
	run: (interaction) => fetch('https://riddles-api.vercel.app/random')
		.then((res) => res.json())
		.then((json: any) => `**${json.riddle}**\n\n||${json.answer}||`)
		.catch((err) => Promise.reject(err))
};

const PicsumCommand: Command = {
	name: 'picsum',
	description: 'Gives you a random image from picsum.photos',
	run: (interaction) => fetch('https://picsum.photos/600/400')
		.then((res) => res.url)
		.catch((err) => Promise.reject(err))
};

const RoboHashCommand: Command = {
	name: 'robohash',
	description: 'Gives you a random image from robohash.org',
	options: [
		{
			name: 'text',
			description: 'The text to use',
			type: ApplicationCommandOptionType.STRING,
			required: false,
		},
	],
	run: (interaction) => {
		const text = interaction.data.options?.find((option) => option.name === 'text')?.value ?? nanoid(32);
		return Promise.resolve(`https://robohash.org/${encodeURIComponent(text)}.png`);
	}
};

const OwenWilsonCommand: Command = {
	name: 'owenwilson',
	description: 'Wow',
	run: (interaction) => fetch('https://owen-wilson-wow-api.onrender.com/wows/random')
		.then((res) => res.json())
		.then((json: any) => json[0].video['720p'])
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
	AdviceCommand,
	DadJokeCommand,
	KanyeCommand,
	MemeSfwCommand,
	RiddleCommand,
	PicsumCommand,
	RoboHashCommand,
	OwenWilsonCommand,
];
