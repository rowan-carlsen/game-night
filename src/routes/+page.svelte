<script lang="ts">
	import { scenarios } from '#lib/scenarios.ts';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { InertiaPlugin } from 'gsap/InertiaPlugin';
	import { onMount } from 'svelte';
	import type { UIEventHandler } from 'svelte/elements';

	gsap.registerPlugin(Draggable, InertiaPlugin);

	let main: HTMLElement;
	let container: HTMLDivElement;
	let currentIndex = $state(0);

	const handleThrowComplete: UIEventHandler<HTMLElement> = (e) => {
		console.log(e);
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
	});
</script>

<h1>Choose A Story</h1>
<main bind:this={main}>
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
	:global(body) {
		overflow: hidden;
	}
	main {
		width: 100%;
		overflow: hidden;
		position: relative;
	}
	#scenario-container {
		display: flex;
	}
	main::before,
	main::after {
		position: absolute;
		top: 50%;
		width: 20px;
		height: 50px;
		content: '';
		z-index: 50;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 185.343 185.343' xml:space='preserve'%3E%3Cpath fill='white' d='M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
	}
	main::before {
		left: 0;
		transform: rotate(180deg);
	}
	main::after {
		right: 0;
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
		gap: 30px;
		padding: 10px 0;
	}
	.pip {
		width: 10px;
		height: 10px;
		background-color: white;
		border-radius: 100px;
		transition: transform 0.5s;
	}

	.pip.current {
		transform: scale(2);
	}
</style>
