<script lang="ts">
import { intervalToDuration, formatDuration } from 'date-fns'
export let maxage: number;
export let renderTimestamp: number;
const now = new Date(renderTimestamp)
const duration = intervalToDuration({ start: 0, end: maxage * 1000 })
const durationString = formatDuration(duration)
const expectedRerender = new Date(renderTimestamp + maxage * 1000)
</script>
<div class="fixed bottom-0 md:bottom-auto md:top-0 left-0 right-0 flex justify-end z-10">
  <div class="overflow-hidden w-full">
    <div class="bg-primary p-2 text-white">
      <ul class="flex flex-col md:flex-row justify-center md:space-x-8">
        <li>
          <img src="/edge.png" alt="Edge icon" class="inline-block mr-2 h-4 w-auto" />
          Rendered on: { now.toLocaleString() }
        </li>
        <li>
          <img src="/duration.png" alt="Edge icon" class="inline-block mr-2 h-4 w-auto" />
          Max age: { durationString }
        </li>
        <li>
          <img src="/refresh.png" alt="Edge icon" class="inline-block mr-2 h-4 w-auto" />
          Re-renders on : { expectedRerender.toLocaleString() }
        </li>
      </ul>  
    </div>
  </div>
</div>
