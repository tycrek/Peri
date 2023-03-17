import { Hono } from 'hono';
import {
	createSlashCommandHandler,
	ApplicationCommand,
	InteractionHandler,
	Interaction,
	InteractionResponse,
	InteractionResponseType,
} from '@code6226/cf-workers-discord-bot';

//# sample command
const helloCommand: ApplicationCommand = {
	name: 'hello',
	description: 'Say hello to the bot',
};
const helloHandler: InteractionHandler = (interaction: Interaction) => ({
	type: InteractionResponseType.ChannelMessageWithSource,
	data: {
		content: `Hello, <@${interaction.member?.user.id}>!`,
		allowed_mentions: {
			users: [interaction.member?.user.id],
		},
	},
});
//#endregion

type Bindings = {
	ASSETS: Fetcher;
	APP_ID: string;
	APP_SECRET: string;
	PUBLIC_KEY: string;
}

/**
 * Hono app
 */
const app = new Hono<{ Bindings: Bindings }>();

// 404 handler
app.notFound((ctx) => ctx.text('Not found', 404));

// Error handler
app.onError((err, ctx) => (console.log(err), ctx.text(`An error occurred: ${err}`, 500)));

app.all('/*', (ctx) => createSlashCommandHandler({
	applicationID: ctx.env.APP_ID,
	applicationSecret: ctx.env.APP_SECRET,
	publicKey: ctx.env.PUBLIC_KEY,
	commands: [[helloCommand, helloHandler]],
})(ctx.req.raw));

// Redirect index to Invite URL
app.get('/', (ctx) => ctx.text('Ok'));

export default app;