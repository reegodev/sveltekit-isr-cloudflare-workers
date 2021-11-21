/**
 * This file is a modified version of @sveltejs/adapter-cloudflare-workers
 */
import { init, render } from '../output/server/app.js';
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

init();

addEventListener('fetch', (event) => {
	event.respondWith(handle(event));
});

async function handle(event) {
	// try static files first
	if (event.request.method == 'GET') {
		try {
			return await getAssetFromKV(event);
		} catch (e) {
			// Do nothing
		}
	}

	// fall back to an app route
	const request = event.request;
	const request_url = new URL(request.url);
	const cacheKey = new Request(request_url.toString(), request);
	const cache = caches.default;

	const response = await cache.match(cacheKey);
	if (response) {
		return response;
	}

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
			const response = new Response(rendered.body, {
				status: rendered.status,
				headers: makeHeaders(rendered.headers)
			});

			// Save the response in the KV store for successful renders
			if (rendered.status >= 200 && rendered.status < 300) {
				// Generate the key from the request like @cloudflare/kv-asset-handler expects
				const requestKey = mapRequestToAsset(request)
				const parsedUrl = new URL(requestKey.url)
				const pathname = parsedUrl.pathname.replace(/^\/+/, '')

				// Obtain the maxage value returned by the load function
				const kvOptions = {}
				if (rendered.headers['cache-control']) {
					const [ _, maxage ] = rendered.headers['cache-control'].split('=')
					if (maxage) {
						kvOptions.expirationTtl = Number(maxage)
					}
				}
				// __STATIC_CONTENT is the global variable injected
				// by Cloudflare Workers for the KV store of static assets

				// Save the response in the KV store for successful renders
				// Expire the key after maxage seconds have passed
				event.waitUntil(
					// eslint-disable-next-line no-undef
					__STATIC_CONTENT.put(pathname, rendered.body, kvOptions)
				)
			}
			
			return response
		}
	} catch (e) {
		return new Response(JSON.stringify(e, Object.getOwnPropertyNames(e)), { status: 500 });
	}

	return new Response({
		status: 404,
		statusText: 'Not Found'
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
