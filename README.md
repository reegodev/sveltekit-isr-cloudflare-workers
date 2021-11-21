# Incremental static regeneration (ISR)<br> for SvelteKit on Cloudflare Workers

This is a small Covid19 Tracker demo that uses SvelteKit to show that Cloudflare supports framework-agnostic Incremental Static Regeneration (ISR).<br>
The homepage is regenerated every 24 hours, while the country pages are regenerated every 4 hours.<br>
The red bar on the top of every page shows rendering information. If you refresh pages, their rendering info should never change until they expire.

**Demo**: [https://sveltekit-isr.reego.workers.dev/](https://sveltekit-isr.reego.workers.dev/)

## What is ISR?

The term was coined by Vercel, and it's a method of rendering static pages on demand instead of generating all pages at build time like a normal SSG does. After the page is rendered, it is persisted along with the rest of the site assets so that subsequent requests effectively hit a static page.
This allows websites with thousands of pages to keep build times low.<br>
NextJS has built-in support for ISR when deployed on Vercel, although their implementation feels like black magic since deployment artifacts are read only and you can't write new files.

You can read more about ISR on [Vercel official documentation](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

## How do you achieve ISR on Cloudflare Workers?

- **TL:DR version**: Use KV to store pages after you render them. You can even supply a TTL to expire pages after a certain amount of time.
- **Detailed, framrwork-agnostic explanation**: please read my [blog post](https://reego.dev/blog/isr-on-cloudflare-workers).
- If you are just curious about the SvelteKit implementation, check the [adapter](https://github.com/reegodev/sveltekit-isr/tree/main/adapter) folder.

## License

MIT