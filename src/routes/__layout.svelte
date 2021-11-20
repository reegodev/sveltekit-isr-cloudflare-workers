<script>
	import '../app.css';
  import Footer from '../components/Footer.svelte'
</script>

<div class="flex flex-col justify-between min-h-screen">
	<main class="flex flex-grow items-center justify-center">
		<slot />
	</main>
  <Footer />
</div>
