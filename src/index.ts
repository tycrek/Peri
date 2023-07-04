import { Hono, Context, Next } from 'hono';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import { Interaction } from './interactions';
import { Commands } from './commands';

/**
 * Cloudflare Worker environment variable bindings for Hono
 */
type Bindings = {
	/**
	 * Discord Application ID
	 */
	APP_ID: string;

	/**
	 * Discord Application Secret. This is the bot token (verify this)
	 */
	APP_SECRET: string;

	/**
	 * Discord Application Public Key
	 */
	PUBLIC_KEY: string;
};

/**
 * Middleware to verify the signature of incoming requests
 * ! This is required for Discord to accept the response !
 */
const verifySignature = async (ctx: Context, next: Next) => {
	// Clone the body
	const body = await ctx.req.raw.clone().arrayBuffer();

	// Verify the signature
	return (!verifyKey(body, ctx.req.headers.get('x-signature-ed25519'), ctx.req.headers.get('x-signature-timestamp'), ctx.env.PUBLIC_KEY))
		? ctx.text('Invalid signature', 401)
		: next();
};

/**
 * Error handler for bot commands
 */
const botErrHandler = (ctx: Context, err: any) => ctx.json({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: { content: `An error occurred: ${err}` } });

/**
 * Hono app
 */
const app = new Hono<{ Bindings: Bindings }>();

/**
 * 404 handler
 */
app.notFound((ctx) => ctx.text('Not found', 404));

/**
 * Error handler
 */
app.onError((err, ctx) => (console.log(err), ctx.text(`An error occurred: ${err}`, 500)));

/**
 * Hello index
 */
app.get('/', (ctx) => ctx.text(`Hello from Hono! App ID: ${ctx.env.APP_ID}`));

/**
 * Register slash commands with Discord. This is only required once (or when you update your commands)
 */
app.get('/register', async (ctx) => {

	// Register commands
	const registerResponse = await fetch(`https://discord.com/api/v10/applications/${ctx.env.APP_ID}/commands`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${ctx.env.APP_SECRET}`,
		},
		method: 'PUT',
		body: JSON.stringify(Commands),
	});

	if (!registerResponse.ok) {
		const err = await registerResponse.json();
		return (console.error(err), ctx.json(err, 500));
	} else return ctx.text('Registered commands');
});

/**
 * Interaction handler
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
app.post('/interaction', verifySignature, (ctx) =>
	ctx.req.json()
		.then((interaction: Interaction) => {
			switch (interaction.type) {
				case InteractionType.PING:
					return ctx.json({ type: InteractionResponseType.PONG });
				case InteractionType.APPLICATION_COMMAND: {
					const command = Commands.find((c) => c.name === interaction.data.name);
					return (!command) ? botErrHandler(ctx, `Unknown command: ${interaction.data.name}`) : command.run(interaction)
						.then((response) => ctx.json({ type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: { content: response } }))
						.catch((err) => botErrHandler(ctx, err));
				}
				default:
					return botErrHandler(ctx, `Unknown interaction type: ${interaction.type}`);
			}
		})
		.catch((err) => botErrHandler(ctx, err))
		.catch((err) => (console.error(err), ctx.text(`Bot error handler failed: ${err}`, 500))));

export default app;
