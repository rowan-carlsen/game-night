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

<main
	bind:this={main}
	class:start={currentIndex <= 0}
	class:end={currentIndex >= scenarios.length - 1}
>
	<h1>Choose A Story</h1>
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
	h1 {
		margin: 0;
		padding: 0.5em 0;
	}
	main {
		height: 100%;
		display: flex;
		flex-flow: column;
		width: 100%;
		overflow: hidden;
		position: relative;
		padding-bottom: 10px;
	}
	#scenario-container {
		display: flex;
		flex-grow: 1;
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
		animation: blink 4s infinite linear;
	}
	@keyframes blink {
		from {
			transform: translateX(-50%);
		}
		25% {
			transform: translateX(50%);
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translateX(-50%);
		}
	}
	main::before {
		left: 0;
		rotate: 180deg;
	}
	main::after {
		right: 0;
	}
	main.start::before,
	main.end::after {
		visibility: hidden;
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
