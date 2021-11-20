# Incremental static regeneration (ISR) for SvelteKit on Cloudflare Pages

This is a small Covid19 Tracker demo that uses SvelteKit to show that Cloudflare supports framework-agnostic Incremental Static Regeneration (ISR).<br>
The homepage is regenerated every 24 hours, while the country pages are regenerated every 4 hours.<br>
If you inspect the page response headers, you can see that even if there has been a cache miss, the response still contains a stale version.

## What is ISR?

The acronym has been coined by Vercel, and it's a method of rendering static pages on demand instead of generating all pages at build time like a normal SSG does. This allows websites with thousands of pages to keep build times low.<br>
NextJS has built-in support for ISR when deployed on Vercel.

You can read more about ISR on [Vercel official documentation](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

## How do you achieve ISR on Cloudflare?

For a framework-agnostic and detailed explanation, please read my [blog post](https://reego.dev/blog/isr-on-cloudflare-pages).

If you are just curious about SvelteKit implementation, check the [adapter](https://github.com/reegodev/sveltekit-isr/tree/main/adapter) folder.

## License

MIT