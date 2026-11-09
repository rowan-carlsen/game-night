<script>
	import house from '#lib/assets/images/scary-house-3.jpg';
	import motelSign from '#lib/assets/images/motel-sign4.jpg';
	import spacesuit from '#lib/assets/images/spacesuit-edit.jpg';
	import modelT from '#lib/assets/images/modelt-2.png';
</script>

<h1>Choose A Story</h1>
<main>
	<section>
		<h2>Forget Me Not</h2>
		<p>
			<strong>2010's:</strong> Battered, bruised, and missing their memories, a group of outsiders must
			piece together what happened to them in a rural American town.
		</p>
		<img id="motel" class="visual" src={motelSign} alt="" />
	</section>
	<section>
		<h2>Music From a Darkened Room</h2>
		<p>
			<strong>1990's:</strong> An unassuming house on a quiet suburban street has a chilling history.
			A clandestine government agency needs to uncover the house's true nature after it claims one of
			their own.
		</p>
		<img id="house" class="visual" src={house} alt="" />
	</section>
	<section>
		<h2>Operation Minoan Augur</h2>
		<p>
			<strong>1990's:</strong> A bizarre murder. A fugitive in a spacesuit. Detectives race against time
			to uncover secrets never revealed to the public.
		</p>
		<img id="spacesuit" class="visual" src={spacesuit} alt="" />
	</section>
	<section>
		<h2>Dead Light</h2>
		<p>
			<strong>1920's:</strong> Along an isolated country road on a stormy night, a near accident leads
			to the discovery of a deadly secret.
		</p>
		<img id="model-t" class="visual" src={modelT} alt="" />
	</section>
</main>

<style>
	h1,
	h2 {
		text-align: center;
	}
	main {
		scroll-snap-type: x mandatory;
		height: 100%;
		overflow: scroll;
		display: flex;
	}
	.visual {
		min-width: 0;
		width: auto;
		height: auto;
		max-width: min(500px, 100%);
		max-height: 500px;
	}
	section {
		width: 100%;
		min-width: 100%;
		scroll-snap-align: start;
		padding: 0 20px;
		display: flex;
		flex-flow: column;
		align-items: center;
	}
	section p {
		font-family: monospace;
		font-size: 12pt;
	}
</style>
