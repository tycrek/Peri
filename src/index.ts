import { Hono } from 'hono';

type Bindings = {
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

// Redirect index to Invite URL
app.get('/', (ctx) => ctx.text('Ok'));

export default app;