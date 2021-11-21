# Incremental static regeneration (ISR)<br> for SvelteKit on Cloudflare Workers

This is a small Covid19 Tracker demo that uses SvelteKit to show that Cloudflare supports framework-agnostic Incremental Static Regeneration (ISR).<br>
The homepage is regenerated every 24 hours, while the country pages are regenerated every 4 hours.<br>
The red bar on the top of every page shows rendering information. If you refresh pages, their rendering info should never change until they expire.

**Demo**: [https://sveltekit-isr.reego.workers.dev/](https://sveltekit-isr.reego.workers.dev/)

## What is ISR?

ncremental Static Regeneration, or ISR for short, is a technique first introduced by Vercel to improve build times for large static websites with a lot of pages.

Instead of rendering every page upfront at build time, you render pages on demand when they are requested, and then persist the response along with the rest of the site assets, effectively serving static pages after the first render.

This is a really cool feature that allows Jamstack sites to scale indefinitely.

## How do you achieve ISR on Cloudflare Workers?

- **TL:DR version**: Use KV to store pages after you render them. You can even supply a TTL to expire pages after a certain amount of time.
- **Detailed, framrwork-agnostic explanation**: please read my [blog post](https://reego.dev/blog/isr-on-cloudflare-workers).
- If you are just curious about the SvelteKit implementation, check the [adapter](https://github.com/reegodev/sveltekit-isr/tree/main/adapter) folder.

## License

MIT