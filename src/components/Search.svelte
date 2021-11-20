<script lang="ts">
import AutoComplete from 'simple-svelte-autocomplete'
import countryCodes from '$lib/countryCodes.json'
import { browser } from '$app/env'

interface Country {
  name: string
  code: string
}

const countries: Country[] = Object.keys(countryCodes).map(key => ({
  name: countryCodes[key],
  code: key
}))

countries.sort((a, b) => a.name.localeCompare(b.name))
let selectedCountryCode: string = ''

const onCountrySelected = (selection: Country) => {
  if (browser && selection) {
    window.location.href= `/countries/${selection.code.toLowerCase()}`
  }
}
</script>
<div>
  <div class="mt-4 flex text-lg relative" method="get" action="/country">
    <AutoComplete
      items={countries}
      bind:selectedItem={selectedCountryCode}
      onChange={onCountrySelected}
      valueFieldName="code"
      labelFieldName="name"
      placeholder="Select a country"
      className="w-full text-xl"
      dropdownClassName="filter drop-shadow-xl"
      inputClassName="autocomplete text-xl w-full filter drop-shadow-xl rounded-full px-8 py-4 pr-16 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20"
    />
  </div>
</div>
<style global>
  .autocomplete {
    height: auto !important;
  }

  .autocomplete-input {
    padding: 1rem 2rem !important;
    padding-right: 4rem !important;
  }

  .autocomplete-list {
    position: absolute !important;
    top: 100% !important;
    margin-top: 1rem;
    border: 0 !important;
    padding: 0 !important
  }

  .autocomplete-list-item {
    font-size: 1.25rem !important;
    padding: 1rem 2rem !important;
  }

  .autocomplete-list-item.selected {
    background-color: theme('colors.primary') !important;
  }

  .autocomplete::after {
    border-color: theme('colors.primary') !important;
  }
</style>
