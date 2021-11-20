export default function ({ pages = 'build', assets = pages, fallback } = {}) {
	return {
		name: 'cloudflare-pages-isr-adapter',

		async adapt({ utils }) {
			utils.rimraf(assets);
			utils.rimraf(pages);

			utils.copy_static_files(assets);
			utils.copy_client_files(assets);

			await utils.prerender({
				fallback,
				all: !fallback,
				dest: pages
			});

			utils.copy(`./_worker.js`, `${pages}/_worker.js`);
		}
	};
}
