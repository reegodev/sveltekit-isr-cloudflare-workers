<script context="module" lang="ts">
  import type { LoadOutput } from '@sveltejs/kit'
  
  export const load = async (): Promise<LoadOutput> => {
    const maxage = 60 * 60 * 24 // 1 day
    const renderTimestamp = Date.now()
    return {
      props: {
        maxage,
        renderTimestamp,
      },
      maxage,
    }
  }
</script>
<script lang="ts">
import Search from '../components/Search.svelte'
import Status from '../components/Status.svelte'
import WorkersLogo from '../components/WorkersLogo.svelte'

export let maxage: number
export let renderTimestamp: number
</script>

<Status maxage={maxage} renderTimestamp={renderTimestamp} />
<div class="px-4">
  <div style="max-width: 500px">
    <h1 class="text-2xl mb-4 text-center text-gray-600 font-bold uppercase">
      Incremental Static Regeneration
      on
    </h1>
    <div class="flex items-center">
      <div>
        <img src="https://kit.svelte.dev/images/svelte-kit-horizontal.svg" alt="SvelteKit logo" width="300" height="61" />
      </div>
      <div class="text-2xl mr-2 md:text-5xl md:mr-4 font-bold text-gray-600">
        +
      </div>
      <div>
        <WorkersLogo />
      </div>
    </div>
    <div class="mt-4">
      <Search />
    </div>
    <div class="mt-4 text-center text-gray-500">
      <p>This is a small Covid19 Tracker demo that implements Incremental Static Regeneration on SvelteKit and Cloudflare Workers.</p>
      <p>For an in-depth explanation, see my <a href="#" class="text-primary underline">blog post</a>.</p>
    </div>
  </div>
</div>