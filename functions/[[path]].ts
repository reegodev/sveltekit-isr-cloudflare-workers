import { init, render } from '../.svelte-kit/output/server/app.js';
import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler';

init();

export async function onRequest(ctx: any): Promise<Response> {
  // try static files first
	const response = await getFromKV(ctx);
	if (response) {
		return response;
	}

  // fall back to dynamic rendering
	const request = ctx.request;
	const request_url = new URL(request.url);

	try {
		const rendered = await render({
			host: request_url.host,
			path: request_url.pathname,
			query: request_url.searchParams,
			rawBody: await read(request),
			headers: Object.fromEntries(request.headers),
			method: request.method
		});

		if (rendered) {
			

			return new Response(rendered.body, {
				status: rendered.status,
				headers: makeHeaders(rendered.headers)
			});
		}
	} catch (e) {
		return new Response('Error rendering route:' + (e.message || e.toString()), { status: 500 });
	}

	return new Response('Not found', {
		status: 404,
	});
}

/** @param {Request} request */
async function read(request) {
	return new Uint8Array(await request.arrayBuffer());
}

/**
 * @param {Record<string, string | string[]>} headers
 * @returns {Request}
 */
function makeHeaders(headers) {
	const result = new Headers();
	for (const header in headers) {
		const value = headers[header];
		if (typeof value === 'string') {
			result.set(header, value);
			continue;
		}
		for (const sub of value) {
			result.append(header, sub);
		}
	}
	return result;
}

async function getFromKV(ctx): Promise<Response> {
  const { request } = ctx
  if (ctx.request.method == 'GET') {
		try {
			return await getAssetFromKV({
        request,
        waitUntil(promise) {
          return ctx.waitUntil(promise)
        },
      }, {
				ASSET_NAMESPACE: ctx.env.ASSETS,
			});
		} catch (e) {
			// Do nothing
		}
	}

  return null
}
