<script context="module" lang="ts">
  import type { LoadOutput, LoadInput } from '@sveltejs/kit'
  import countryCodes from '$lib/countryCodes.json'
  
  export const load = async ({ page }: LoadInput): Promise<LoadOutput> => {
    const countryName = countryCodes[page.params.countryCode.toUpperCase()]
    if (!countryName) {
      return {
        status: 404,
      }
    }

    const metadata = await fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/metadata').then(res => res.json())

    const params = new URLSearchParams({
      country: countryName,
      min_date: metadata.last_date,
      max_date: metadata.last_date,
    })
    const data = await fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/countries_summary?' + params).then(res => res.json())
    const maxage = 60 * 60 * 4 // 4 hours
    const renderTimestamp = Date.now()
  
    return {
      props: {
        countryName,
        data: data[0] || null,
        maxage,
        date: new Date(metadata.last_date).toLocaleDateString(),
        renderTimestamp,
      },
      maxage
    }
  }
</script>
<script lang="ts">
  import Status from '../../components/Status.svelte'

  export let data
  export let countryName: string
  export let maxage: number
  export let date: string
  export let renderTimestamp: number

  const formatter = new Intl.NumberFormat('en', {
    notation: "compact",
    compactDisplay: "long"
  })

  const formatNumber = (n: number) => formatter.format(n)
    .replace('million', 'm')
    .replace('thousand', 'k')
</script>

<Status maxage={maxage} renderTimestamp={renderTimestamp} />
<div class="md:min-w-150 p-4">
  <div class="text-center mb-4 md:mb-32">
    <a href="/" class="text-primary underline">Back</a>
  </div>
  <h1 class="text-3xl font-bold text-gray-600 uppercase">COVID19 stats for {countryName}</h1>
  <h2 class="text-xl">As of { date }</h2>

  <div class="my-12">
    <h3 class="text-xl text-gray-500 uppercase mb-2">{ date }</h3>
    <div class="flex space-y-4 md:space-x-8 md:space-y-0 flex-wrap md:flex-nowrap">
      <div class="w-full md:w-1/2 flex bg-white p-4 filter drop-shadow-2xl rounded-xl justify-between">
        <img src="/corona.png" alt="Corona virus icon" width="128" height="128" class="w-20 h-auto mr-4" />
        <div>
          <p class="text-4xl text-right">
            <strong>{ formatNumber(data.confirmed_daily)}</strong>
          </p>
          <p class="text-right">today's cases</p>
        </div>
      </div>
      <div class="w-full md:w-1/2 flex bg-white p-4 filter drop-shadow-2xl rounded-xl justify-between">
        <img src="/death.png" alt="Death icon" width="128" height="128" class="w-20 h-auto mr-4" />
        <div>
          <p class="text-4xl text-right"><strong>{data.deaths_daily}</strong></p>
          <p class="text-right">today's deaths</p>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-12">
    <h3 class="text-xl text-gray-500 mb-2">Total</h3>
    <div class="flex space-y-4 md:space-x-8 md:space-y-0 flex-wrap md:flex-nowrap">
      <div class="w-full md:w-1/2 flex bg-white p-4 filter drop-shadow-2xl rounded-xl justify-between">
        <img src="/corona.png" alt="Corona virus icon" width="128" height="128" class="w-20 h-auto mr-4" />
        <div>
          <p class="text-4xl text-right">
            <strong>{ formatNumber(data.confirmed)}</strong>
          </p>
          <p class="text-right">total cases</p>
        </div>
      </div>
      <div class="w-full md:w-1/2 flex bg-white p-4 filter drop-shadow-2xl rounded-xl justify-between">
        <img src="/death.png" alt="Death icon" width="128" height="128" class="w-20 h-auto mr-4" />
        <div>
          <p class="text-4xl text-right">
            <strong>{ formatNumber(data.deaths)}</strong>
          </p>
          <p class="text-right">total deaths</p>
        </div>
      </div>
    </div>
  </div>
  
</div>
