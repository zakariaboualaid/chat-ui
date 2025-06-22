<script lang="ts">
	import type { Message } from "$lib/types/Message";

	interface Props {
		message: Message;
	}

	let { message }: Props = $props();

	const content = $derived(message.content ? JSON.parse(message.content) : null);
</script>

<div class="explanation-container space-y-4">
	{#if content?.content?.title}
		<h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
			{content.content.title}
		</h3>
	{/if}

	<div class="steps space-y-6">
		{#each content?.response?.steps || [] as step}
			<div class="step">
				<div class="flex gap-4">
					<div class="step-number flex-none w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-medium">
						{step.step}
					</div>
					<div class="step-content flex-1 pt-1">
						<div class="text-gray-900 dark:text-gray-100">
							{step}
						</div>
						{#if step.subSteps?.length}
							<ul class="mt-2 ml-4 space-y-2">
								{#each step.subSteps as subStep}
									<li class="text-gray-600 dark:text-gray-300 flex items-start">
										<span class="mr-2 mt-1.5">•</span>
										<span>{subStep}</span>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
