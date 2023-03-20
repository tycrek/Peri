import { Hono, Context, Next } from 'hono';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import { Interaction } from './interactions';
import { Commands } from './commands';

/**
 * Cloudflare Worker environment variable bindings for Hono
 */
type Bindings = {
	APP_ID: string;
	APP_SECRET: string;
	PUBLIC_KEY: string;
};

/**
 * Middleware to verify the signature of incoming requests
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

export default app;export default app;

export default app;
