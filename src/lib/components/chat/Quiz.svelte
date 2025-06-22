<script lang="ts">
	import type { Message } from "$lib/types/Message";
	interface Props {
		message: Message;
	}

	let { message }: Props = $props();
	let selectedOption: number | null = $state(null);
	let showExplanation = $state(false);

	function handleOptionSelect(index: number) {
		selectedOption = index;
		showExplanation = true;
	}

	const content = $derived(message.content ? JSON.parse(message.content) : null);

	const isCorrect = $derived(
		selectedOption !== null && selectedOption === content?.response?.correctAnswer
	);
</script>

<div class="quiz-container space-y-4">
	<div class="question text-lg font-medium">
		{content?.response?.question}
	</div>

	<div class="options space-y-2">
		{#each content?.response?.options || [] as option, index}
			<button
				class="w-full rounded-lg border p-3 text-left transition-colors {selectedOption === null
					? 'hover:bg-gray-100 dark:hover:bg-gray-800'
					: ''} 
					{selectedOption === index
					? isCorrect
						? 'border-green-500 bg-green-100 dark:bg-green-900/50'
						: 'border-red-500 bg-red-100 dark:bg-red-900/50'
					: 'border-gray-200 dark:border-gray-700'}"
				onclick={() => handleOptionSelect(index)}
				disabled={selectedOption !== null}
			>
				{option}
			</button>
		{/each}
	</div>

	{#if showExplanation}
		<div class="explanation mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
			<div class="mb-2 font-medium">
				{isCorrect ? "✓ Correct!" : "✗ Incorrect"}
			</div>
			<div class="text-gray-600 dark:text-gray-300">
				{content?.response?.explanation}
			</div>
		</div>
	{/if}
</div>
