import preprocess from 'svelte-preprocess';
import adapter from './adapter/index.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		target: '#svelte',
		adapter: adapter(),
		// Disable router to force each page to render on the edge
		router: false,
		hydrate: false,
	}
};

export default config;
