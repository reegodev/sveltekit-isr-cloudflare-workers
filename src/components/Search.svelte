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

const autocompleteScript = `
  <${'script'}>
    const autoCompleteJS = new autoComplete({
      placeHolder: "Type a country name",
      data: {
        src:  ${JSON.stringify(countries)},
        keys: ["name"],
      },
      resultItem: {
        highlight: true
      },
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value;
            window.location.href= '/countries/' + selection.code.toLowerCase()
          },
        }
      }
    });
  </${'script'}>
  `
</script>
<div>
  <div class="mt-4 text-lg relative">
    <input id="autoComplete" class="autocomplete text-xl w-full filter drop-shadow-xl rounded-full px-8 py-4 pr-16 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20" />
  </div>
  <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.6/dist/autoComplete.min.js"></script>
  {@html autocompleteScript}
</div>
<style global>
  .autoComplete_wrapper > ul {
    position: absolute;
    max-height: 226px;
    overflow-y: scroll;
    box-sizing: border-box;
    left: 0;
    right: 0;
    margin: 0.5rem 0 0 0;
    padding: 0;
    z-index: 1;
    list-style: none;
    border-radius: 0.6rem;
    background-color: #fff;
    border: 1px solid rgba(33, 33, 33, 0.07);
    box-shadow: 0 3px 6px rgba(149, 157, 165, 0.15);
    outline: none;
    transition: opacity 0.15s ease-in-out;
    -moz-transition: opacity 0.15s ease-in-out;
    -webkit-transition: opacity 0.15s ease-in-out;
  }

.autoComplete_wrapper > ul[hidden],
.autoComplete_wrapper > ul:empty {
  display: block;
  opacity: 0;
  transform: scale(0);
}

.autoComplete_wrapper > ul > li {
  margin: 0.3rem;
  padding: 0.3rem 0.5rem;
  text-align: left;
  font-size: 1rem;
  color: #212121;
  border-radius: 0.35rem;
  background-color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
}

.autoComplete_wrapper > ul > li mark {
  background-color: transparent;
  color: rgba(255, 122, 122, 1);
  font-weight: bold;
}

.autoComplete_wrapper > ul > li:hover {
  cursor: pointer;
  background-color: rgba(255, 122, 122, 0.15);
}

.autoComplete_wrapper > ul > li[aria-selected="true"] {
  background-color: rgba(255, 122, 122, 0.15);
}

/* @media only screen and (max-width: 600px) {
  .autoComplete_wrapper > input {
    width: 18rem;
  } */
</style>
