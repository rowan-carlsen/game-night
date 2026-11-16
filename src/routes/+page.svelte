<script lang="ts">
	import { scenarios } from '#lib/scenarios.ts';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { InertiaPlugin } from 'gsap/InertiaPlugin';
	import { onMount } from 'svelte';

	gsap.registerPlugin(Draggable, InertiaPlugin);

	let main: HTMLElement | undefined;
	let container: HTMLDivElement | undefined;
	let currentIndex = $state(0);

	onMount(() => {
		const snapX = (main ?? document.documentElement).offsetWidth;

		Draggable.create(container ?? 'scenario-container', {
			type: 'x',
			bounds: main,
			inertia: true,
			snap: (value) => {
				currentIndex = -1 * Math.round(value / snapX);
				const snapTo = -1 * currentIndex * snapX;
				return snapTo;
			},
			maxDuration: 0.5
		});
	});
</script>

<h1>Choose A Story</h1>
<main bind:this={main}>
	<div id="pip-holder">
		{#each { length: scenarios.length }, index}
			<div class="pip-outer">
				<div class="pip-inner" class:current={index === currentIndex}></div>
			</div>
		{/each}
	</div>
	<div style="width: {100 * scenarios.length}%" id="scenario-container" bind:this={container}>
		{#each scenarios as scenario (scenario.title)}
			<section>
				<h2>{scenario.title}</h2>
				<p>
					<strong>{scenario.setting}:</strong>
					{scenario.description}
				</p>
				<img class="visual" src={scenario.image} alt="" />
			</section>
		{/each}
	</div>
</main>

<style>
	h1,
	h2 {
		text-align: center;
	}
	:global(body) {
		overflow: hidden;
	}
	main {
		width: 100%;
		overflow: hidden;
	}
	#scenario-container {
		display: flex;
	}

	section {
		flex-basis: 0%;
		flex-grow: 1;
		padding: 0 20px;
		display: flex;
		flex-flow: column;
		align-items: center;
	}
	section p {
		font-family: monospace;
		font-size: 12pt;
	}
	.visual {
		min-width: 0;
		width: auto;
		height: auto;
		max-width: min(500px, 100%);
		max-height: 350px;
		pointer-events: none;
	}
	#pip-holder {
		margin: 0 auto;
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 20px;
	}
	.pip-outer {
		width: 30px;
		height: 10px;
		display: flex;
		justify-content: center;
	}
	.pip-inner {
		width: 10px;
		height: 100%;
		background-color: white;
		border-radius: 100px;
		transition: width 0.5s;
	}
	.pip-inner.current {
		width: 30px;
	}
</style>
