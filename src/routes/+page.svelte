<script lang="ts">
	import { activeScenarios as scenarios } from '#lib/scenarios.ts';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { InertiaPlugin } from 'gsap/InertiaPlugin';
	import { onMount } from 'svelte';
	import type { UIEventHandler } from 'svelte/elements';

	gsap.registerPlugin(Draggable, InertiaPlugin);

	let main: HTMLElement;
	let container: HTMLDivElement;
	let currentIndex = $state(0);
	let hidden = $state(true);

	const handleThrowComplete: UIEventHandler<HTMLElement> = (e) => {
		console.log(e);
	};

	const showContents = () => {
		hidden = false;
	};

	onMount(() => {
		Draggable.create(container, {
			type: 'x',
			bounds: main,
			inertia: true,
			snap: (value) => {
				const pageWidth = main.offsetWidth;
				const adjustedValue = Math.min(Math.max(0, -1 * value), (scenarios.length - 1) * pageWidth);
				currentIndex = Math.round(adjustedValue / pageWidth);
				const snapTo = -1 * currentIndex * pageWidth;
				return snapTo;
			},
			maxDuration: 0.5,
			onThrowComplete: handleThrowComplete
		});
		showContents();
	});
</script>

<svelte:head
	><link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Oxanium:wght@200..800&display=swap"
		rel="stylesheet"
	/></svelte:head
>
<main
	bind:this={main}
	class:start={currentIndex <= 0}
	class:end={currentIndex >= scenarios.length - 1}
	class:hidden
>
	<h1>Scenario Preview</h1>
	<div style="width: {100 * scenarios.length}%" id="scenario-container" bind:this={container}>
		{#each scenarios as scenario (scenario.title)}
			<section>
				<h2>{scenario.title}</h2>
				<p>
					<strong>{scenario.setting}:</strong>
					{scenario.description}
				</p>
				<div class="visual">
					<img src={scenario.image} alt="" />
				</div>
			</section>
		{/each}
	</div>
	<div id="pip-holder">
		{#each { length: scenarios.length }, index}
			<div class="pip" class:current={index === currentIndex}></div>
		{/each}
	</div>
</main>

<style>
	h1,
	h2 {
		text-align: center;
	}
	h2 {
		font-weight: bold;
		color: #b9b9b9;
		font-size: clamp(1.2rem, 5.5vw, 2rem);
	}
	h1 {
		margin: 0;
		padding: 0.5em 0;
		font-family: 'Cinzel', serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
	}
	main {
		height: 100%;
		display: flex;
		flex-flow: column;
		width: 100%;
		overflow: hidden;
		padding-bottom: 10px;
		font-family: 'Oxanium', sans-serif;
		font-optical-sizing: auto;
		font-weight: normal;
		font-style: normal;
		transition: opacity 0.5s;
		opacity: 1;
	}
	.hidden {
		opacity: 0;
	}
	#scenario-container {
		display: flex;
		flex-grow: 1;
	}

	section {
		flex-basis: 0%;
		flex-grow: 1;
		padding: 0 20px;
		display: flex;
		flex-flow: column;
		align-items: center;
		display: grid;
		grid-template-rows: min-content 9rem auto;
		align-items: baseline;
	}
	section p {
		font-size: 12pt;
		color: #b9b9b9;
		height: 100%;
		overflow: auto;
	}
	section p strong {
		color: #fff;
	}
	.visual {
		max-width: min(500px, 100%);
		max-height: 350px;
		pointer-events: none;
		position: relative;
	}
	.visual::before {
		content: '';
		z-index: 5;
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to bottom, black 0%, transparent 5%, transparent 95%, black 100%),
			linear-gradient(to right, black 0%, transparent 5%, transparent 95%, black 100%);
	}
	.visual img {
		z-index: 1;
		min-width: 0;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		pointer-events: none;
	}
	#pip-holder {
		margin: 0 auto;
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 20px;
		height: 30px;
		align-items: center;
		flex-shrink: 0;
	}
	.pip {
		width: 6px;
		height: 6px;
		background-color: white;
		border-radius: 100px;
		opacity: 0.7;
		transition:
			transform 0.2s,
			opacity 0.2s;
	}

	.pip.current {
		transform: scale(2);
		opacity: 1;
	}
</style>
