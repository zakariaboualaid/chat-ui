<script lang="ts">
	import PrepareWindow from "$lib/components/chat/PrepareWindow.svelte";
	// import { useSettingsStore } from "$lib/stores/settings.js";
	// import { base } from "$app/paths";
	// import { ERROR_MESSAGES, error } from "$lib/stores/errors";
	// import { pendingMessage } from "$lib/stores/pendingMessage";
	// import { goto } from "$app/navigation";
	import { findCurrentModel } from "$lib/utils/models.js";
	import type { Message } from "$lib/types/Message";
	import { page } from "$app/state";
	import { browser } from "$app/environment";
	import { useSettingsStore } from "$lib/stores/settings.js";
	import Quiz from "$lib/components/chat/Quiz.svelte";

	let { data } = $props();
	let loading = $state(false);
	let pending = $state(false);
	let files: File[] = $state([]);
	let initialRun = true;

	const settings = useSettingsStore();
</script>

<div class="flex">
	<div
		class="scrollbar-custom flex-1 overflow-y-auto border border-gray-700 py-12 max-sm:pt-8 md:py-24"
	>
		<!-- <Quiz /> -->
	</div>
	<div
		class="scrollbar-custom h-screen overflow-y-auto rounded-r-xl py-6 max-sm:pt-8 md:bg-gradient-to-l md:from-gray-50 md:py-4 md:dark:from-gray-800/80"
	>
		<div class="w-[300px] px-3">
			<!-- <h1 class="text-2xl font-bold">Modules</h1> -->

			{#await data.studyGuide then sg}
				<ul class="mx-auto list-none rounded-md">
					{#each sg.items as item (item.id)}
						<li
							class="cursor-pointer rounded-sm !outline-none first:mt-0 [&:focus-visible>:first-child>div]:ring-4"
						>
							<div class="group py-1" style="padding-left: {0 * 1}rem">
								<div
									class="ring-accent-500 dark:ring-accent-700 flex h-full w-full items-center gap-2 rounded-xl
					py-1 ring-offset-white transition group-hover:bg-gray-200
					dark:ring-offset-black dark:group-hover:bg-gray-800"
								>
									<span class="select-none text-sm font-bold">
										{item.data.title}
									</span>
								</div>
							</div>

							<ul>
								{#each item.data.modules as mod}
									<li
										class="cursor-pointer rounded-sm text-xs !outline-none first:mt-0 [&:focus-visible>:first-child>div]:ring-4"
									>
										<div class="group py-1" style="padding-left: {0 * 1}rem">
											<div
												class="ring-accent-500 dark:ring-accent-700 flex h-full w-full items-center gap-2 rounded-xl
					px-3 py-1 ring-offset-white transition group-hover:bg-gray-200
					dark:ring-offset-black dark:group-hover:bg-gray-800"
											>
												<span class="select-none">
													{mod.title}
												</span>
											</div>
										</div>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			{/await}
		</div>
	</div>
</div>
