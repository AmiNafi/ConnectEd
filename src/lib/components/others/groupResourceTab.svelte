<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { groupResource } from '$lib/server/schema';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { enhance } from '$app/forms';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';

	export let tabData: groupResource[];
	export let groupId: number
	export let form: any;

	let filteredData = tabData;

	let name = '';
	let sortBy = '';
	let timestamp = Date.now();

	let someName = '';
	let someDescription = '';
	let file: File | null;
	let file2: File | null;

	let timerId: any;
	let showMessage = false;
	let isLoading = false;

	let isEditDialogOpen = false;
	let isDeleteDialogOpen = false;
	let selectedIndex: number;
	let selected: groupResource;

	$: {
		filteredData = tabData.filter((item) => {
			return (
				item.resourceName.toLowerCase().includes(name.toLowerCase()) ||
				(item.description && item.description.toLowerCase().includes(name.toLowerCase()))
			);
		});

		filteredData = filteredData.sort(function (x, y) {
			if (sortBy == 'newest') {
				if (x.createdAt! < y.createdAt!) {
					return -1;
				}
				if (x.createdAt! > y.createdAt!) {
					return 1;
				}
				return 0;
			} else if (sortBy == 'oldest') {
				if (x.createdAt! < y.createdAt!) {
					return 1;
				}
				if (x.createdAt! > y.createdAt!) {
					return -1;
				}
				return 0;
			} else {
				return 0;
			}
		});
	}

	$: {
		// console.log(form?.success);
		if (form?.success == 'resourceUpload') {
			isLoading = false;
			clearTimeout(timerId);

			// data.courseData[0].resources = data.courseData[0].resources;
			// tabData = data.courseData[0].resources as resource[];

			someName = '';
			someDescription = '';
			file = null;

			showMessage = true;
			form.success = '';
		} else if (form?.success == 'resourceDelete') {
			clearTimeout(timerId);
			tabData.splice(selectedIndex, 1);
			tabData = tabData

			isLoading = false;
			showMessage = true;
			form.success = '';
		} else if (form?.success == 'resourceUpdate') {
			clearTimeout(timerId);
			tabData = tabData;

			isLoading = false;
			showMessage = true;
			file2 = null;
			form.success = '';
		}
	}
</script>

<div class="flex flex-col">
	<div class="mt-5 flex flex-row justify-between">
		<div class="flex flex-row justify-between gap-20">
			<Input type="text" placeholder="name" bind:value={name} class="max-w-xs bg-muted" />
			<select
				bind:value={sortBy}
				required
				class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			>
				<option value="" disabled selected hidden>-- sort by --</option>
				<option value="newest">Newest</option>
				<option value="oldest">Oldest</option>
			</select>
		</div>
		<div>
	
				<Dialog.Root
					onOpenChange={() => {
						showMessage = false;
					}}
				>
					<Dialog.Trigger
						class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors
                hover:bg-green-900
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>Add New Resource</Dialog.Trigger
					>

					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>Add New Resource</Dialog.Title>
							<Dialog.Description>
								Add new resource. Click save when you're done.
								{#if showMessage}
									<div
										class="mb-10 w-[300px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
									>
										Resouce Successfully Uploaded
									</div>
								{/if}
							</Dialog.Description>
						</Dialog.Header>
						<form
						use:enhance={() => {
							return async ({ update }) => {
								update({ reset: false, invalidateAll:false });
							};
						}}
							action="?/uploadResource"
							method="post"
							enctype="multipart/form-data"
							on:submit={() => {
								isLoading = true;
								timerId = setTimeout(() => {
									isLoading = false;
								}, 10000);
							}}
						>
							<button type="submit" disabled style="display: none" aria-hidden="true"></button>

							<input hidden id="groupId" name="groupId" value={groupId} />

							<div class="grid gap-4 py-4">
								<div class="grid grid-cols-4 items-center gap-4">
									<Label class="text-right">Resource Name</Label>
									<Input
										required
										id="resourceName"
										name="resourceName"
										class="col-span-3"
										bind:value={someName}
										disabled={isLoading}
									/>
								</div>

								<div class="grid grid-cols-4 items-center gap-4">
									<Label class="text-right">Description</Label>
									<Textarea
										id="description"
										name="description"
										class="col-span-3"
										bind:value={someDescription}
										disabled={isLoading}
									/>
								</div>

								<div class="grid grid-cols-4 items-center gap-4">
									<Label class="text-right">File</Label>
									<Input
										required
										id="file"
										name="file"
										class="col-span-3"
										type="file"
										bind:value={file}
										disabled={isLoading}
										accept=".png, .jpg, .jpeg, .pdf"
									/>
								</div>
							</div>

							<Dialog.Footer>
								<Button type="submit" disabled={isLoading}>
									{#if isLoading}
										<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
									{/if}
									Upload</Button
								>
							</Dialog.Footer>
						</form>
					</Dialog.Content>
				</Dialog.Root>

		</div>
	</div>
</div>
<Table.Root class="m-5 max-w-[1000px]">
	<Table.Caption>A list of your resources.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Resource name</Table.Head>
			<Table.Head>Description</Table.Head>
			<Table.Head>File Type</Table.Head>
			<Table.Head>Date</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each filteredData as item, i (i)}
			<Table.Row>
				<Table.Cell class="font-medium"
					><a
						href={item.resourceLink + '?' + timestamp}
						class="text-[#0891B2] no-underline hover:underline"
						target="_blank"
						on:click={() => {
							timestamp = Date.now();
						}}>{item.resourceName}</a
					></Table.Cell
				>
				<Table.Cell class="max-w-72"><p class="break-all">{item.description}</p></Table.Cell>
				<Table.Cell>{item.fileType}</Table.Cell>		

				{#if item.createdAt != null}
					<Table.Cell>{item.createdAt.toString().split('T')[0]}</Table.Cell>
				{/if}
				<Table.Cell class="w-5">
					<!-- <Dialog.Root>
                            
                        </Dialog.Root> -->
		
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<svg
									class="h-5 w-5 hover:bg-muted"
									fill="#000000"
									viewBox="0 0 32 32"
									enable-background="new 0 0 32 32"
									id="Glyph"
									version="1.1"
									xml:space="preserve"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									><path
										d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
										id="XMLID_294_"
									/><path
										d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
										id="XMLID_295_"
									/><path
										d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
										id="XMLID_297_"
									/></svg
								></DropdownMenu.Trigger
							>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<!-- <DropdownMenu.Label>Settings</DropdownMenu.Label> -->
									<!-- <DropdownMenu.Separator /> -->
									<DropdownMenuItem
										on:click={() => {
											isEditDialogOpen = true;
											selectedIndex = i;
											selected = item;
										}}
									>
										<svg
											class="ml-2 mr-5 h-5 w-5"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
												stroke="#000000"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
												stroke="#000000"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										on:click={() => {
											isDeleteDialogOpen = true;
											selectedIndex = i;
											selected = item;
										}}
									>
										<svg
											version="1.0"
											id="Layer_1"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											class="ml-2 mr-5 h-5 w-5"
											viewBox="0 0 64 64"
											enable-background="new 0 0 64 64"
											xml:space="preserve"
										>
											<g>
												<path
													fill="#231F20"
													d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8v5c0,0.553,0.447,1,1,1h54
c0.553,0,1-0.447,1-1V8C60,5.789,58.211,4,56,4z"
												/>
												<path
													fill="#231F20"
													d="M20,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C21,24.447,20.553,24,20,24z"
												/>
												<path
													fill="#231F20"
													d="M32,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C33,24.447,32.553,24,32,24z"
												/>
												<path
													fill="#231F20"
													d="M44,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C45,24.447,44.553,24,44,24z"
												/>
												<path
													fill="#231F20"
													d="M9,16H7v44c0,2.211,1.789,4,4,4h42c2.211,0,4-1.789,4-4V16h-2H9z M23,51c0,1.657-1.343,3-3,3s-3-1.343-3-3
V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M35,51c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M47,51
c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z"
												/>
											</g>
										</svg>
										Delete
									</DropdownMenuItem>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>

				</Table.Cell>
			</Table.Row>
		{/each}
		<Dialog.Root
			open={isEditDialogOpen}
			onOpenChange={() => {
				isEditDialogOpen = false;
				showMessage = false;
			}}
		>
			<Dialog.Trigger class="flex w-full flex-row hover:bg-muted"></Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Edit Resource</Dialog.Title>
					<Dialog.Description>
						Edit resource. Click save when you're done.
						{#if showMessage}
							<div
								class="mb-10 w-[300px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
							>
								Resource Successfully Updated
							</div>
						{/if}
					</Dialog.Description>
				</Dialog.Header>
				<form
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false, invalidateAll:false });
					};
				}}
					action="?/updateResource"
					method="post"
					enctype="multipart/form-data"
					on:submit={() => {
						isLoading = true;
						timerId = setTimeout(() => {
							isLoading = false;
						}, 10000);
					}}
				>
					<button type="submit" disabled style="display: none" aria-hidden="true"></button>

					<input hidden  name="fileType" value={selected.fileType} />
					<input hidden id="resourceId" name="resourceId" value={selected.resourceId} />
					<input hidden id="savedName" name="savedName" value={selected.savedName} />

					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">Resource Name</Label>
							<Input
								id="resourceName"
								name="resourceName"
								class="col-span-3"
								bind:value={selected.resourceName}
								disabled={isLoading}
							/>
						</div>

						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">Description</Label>
							<Textarea
								id="description"
								name="description"
								class="col-span-3"
								bind:value={selected.description}
								disabled={isLoading}
							/>
						</div>

						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">File</Label>
							<Input
								id="file"
								name="file"
								class="col-span-3"
								type="file"
								bind:value={file2}
								disabled={isLoading}
								accept=".png, .jpg, .jpeg, .pdf"
							/>
						</div>
					</div>

					<Dialog.Footer>
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
							{/if}
							Save changes</Button
						>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>

		<Dialog.Root
			open={isDeleteDialogOpen}
			onOpenChange={() => {
				isDeleteDialogOpen = false;
				showMessage = false;
			}}
		>
			<Dialog.Trigger class="flex w-full flex-row hover:bg-muted"></Dialog.Trigger>
			<Dialog.Content class="flex flex-col items-center">
				<Dialog.Header class="flex flex-col items-center">
					<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
					<Dialog.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Dialog.Description>
				</Dialog.Header>
				<form
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false, invalidateAll:false });
					};
				}}
					action="?/deleteResource"
					method="post"
					on:submit={() => {
						isLoading = true;
						timerId = setTimeout(() => {
							isLoading = false;
						}, 10000);
					}}
				>
					<input hidden id="resourceId" name="resourceId" value={selected.resourceId} />
					<input hidden id="savedName" name="savedName" value={selected.savedName} />

					{#if showMessage}
						<div
							class="w-[300px] rounded-sm border-2 border-red-500 bg-red-100 px-2 py-2 text-base text-red-500"
						>
							Resource Successfully Deleted
						</div>
					{:else}
						<Button type="submit" class="w-48 justify-items-center" disabled={isLoading}>
							{#if isLoading}
								<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
							{/if}
							Sure</Button
						>
					{/if}
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</Table.Body>
</Table.Root>
