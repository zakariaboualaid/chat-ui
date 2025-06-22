<script lang="ts">
	import { base } from "$app/paths";
	import type { PageData } from "./$types";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	$inspect(data);
</script>

<div class="scrollbar-custom h-full overflow-y-auto py-12 max-sm:pt-8 md:py-24">
	<div class="pt-42 mx-auto flex flex-col px-5 xl:w-[60rem] 2xl:w-[64rem]">
		<h1 class="text-2xl font-bold">Catalog</h1>
		<h2 class="text-gray-500">Catalog of available IT certifications</h2>
		<div class="mt-8 grid grid-cols-1 gap-3 sm:gap-5 xl:grid-cols-2">
			{#await data.studyGuides then sgs}
				{#each sgs as sg}
					<div
						aria-label="Model card"
						role="region"
						class="relative flex flex-col gap-2 overflow-hidden rounded-xl border bg-gray-50/50 px-6 py-5 shadow hover:bg-gray-50 hover:shadow-inner dark:border-gray-800/70 dark:bg-gray-950/20 dark:hover:bg-gray-950/40"
					>
						<a
							href="{base}/prepare/{sg._id}"
							aria-label="Pick a study guide"
							class="absolute inset-0 z-10"
						>
						</a>
						<div class="flex items-center justify-between gap-1">
							<div
								class="size-6 rounded border border-transparent bg-gray-300 dark:bg-gray-800"
								aria-hidden="true"
							></div>
						</div>
						<span class="flex items-center gap-2 font-semibold">{sg.studyGuideId}</span>
						<span class="whitespace-pre-wrap text-sm text-gray-500 dark:text-gray-400"
							>{sg.studyGuideId}</span
						>
					</div>
				{/each}
			{/await}
		</div>
	</div>
</div>
