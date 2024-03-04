<script>
	import logo2 from '$lib/assets/logo2.png'
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<main class="bg-[#fdf6f1]">
	<section>
		<div class="relative h-[130px] bg-[#1f7dc5]">
			<div class="flex justify-between mx-6 p-6 z-[5]">
				<img
					src={logo2}
					class="transform transition duration-300 hover:scale-105"
					alt="title"
					width={300}
				/>
				<div class="flex flex-row space-x-4">
					<div>
						<Button href="/register" class="bg-primary">Signup</Button>
						<Button href="/login" class="bg-primary">Login</Button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="relative">
			<div class="wave-header">
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path
						d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
						class="shape-fill"
					></path>
				</svg>
			</div>
		</div>
	</section>
	<section class="mt-[7%] mb-32">
		<div class="flex justify-center mx-auto space-x-40 max-w-7xl">
			<div class="flex flex-col w-1/2 z-[2]">
				<h1 class="text-5xl font-bold font-heading mb-1">Manage and share your study materials</h1>

				<p class="text-l font-semibold mb-9 w-4/5 mt-4">
					Join ConnectED today and embark on a collaborative learning adventure!
				</p>
				<a
					href="/login"
					target="_self"
					class="font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/2 text-center"
				>
					Get Started
				</a>
			</div>
			<div class="relative flex items-center justify-center w-1/2 z-[2]">
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/imagecoding.gif?t=2024-02-14T11%3A09%3A57.444Z"
					width="90%"
					height="70%"
					alt="Pixi Logo"
					class="absolute -bottom-32"
				/>
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2015.png"
					class="absolute left-0 -top-10"
					width={200}
					height={200}
					alt="Other 15"
				/>
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/vscode-svgrepo-com.svg"
					class="absolute right-0 -top-1"
					width={185}
					height={185}
					alt="Other 15"
				/>
				<img
					src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/f3ebee30-bd9b-43f0-80cf-aca4982ca152.png"
					class="absolute -left-0 -bottom-56 -rotate-12"
					width={185}
					height={185}
					alt="Other 15"
				/>

				<svg
					class="absolute -right-0 -bottom-12 w-20 h-20 -rotate-12"
					version="1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 48 48"
					enable-background="new 0 0 48 48"
				>
					<path
						fill="#4CAF50"
						d="M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"
					/>
					<polygon fill="#388E3C" points="44,35 34,29 34,19 44,13" />
				</svg>

				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/Other%2004.png"
					class="absolute -bottom-60 right-0"
					width={180}
					height={180}
					alt="Other 04"
				/>
			</div>
		</div>
	</section>
	<section class="py-20 max-w-screen-lg mx-auto mt-72">
		<div class="flex justify-center text-center">
			<div class="flex flex-col space-y-3">
				<h2 class="text-4xl font-bold font-heading">All-in-one platform</h2>
				<p>A complete study resource management platform in your hand</p>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-12 mt-20">
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/code-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						width={25}
						height={25}
					/>
					<h5 class="font-bold font-heading">Study Resource Management</h5>
				</div>
				<p>
					Effortlessly organize and keep track of all your study materials in one place for
						efficient learning.
				</p>
			</div>
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connection-network-internet-seo-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						width={30}
						height={30}
					/>
					<h5 class="font-bold font-heading">Collaborative Study Sessions</h5>
				</div>
				<p>Share your study sessions with others or join sessions created by fellow learners,
					enhancing collaboration and knowledge exchange.</p>
			</div>

			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacher%20(1).svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Study Groups</h5>
				</div>
				<p>Form study groups with friends, fostering a supportive environment for collaborative
					learning.</p>
			</div>
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Study Partners</h5>
				</div>
				<p>Connect with learners who share similar interests and academic goals for effective study
					partnerships.</p>
			</div>
			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/share-1099-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Blogs</h5>
				</div>
				<p>Create and share blogs about your learning experiences, methods, and conclusions, or
					explore insights from others in the community.</p>
			</div>

			<div
				class="flex flex-col p-4 space-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
			>
				<div class="flex space-x-3">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/analysis-svgrepo-com.svg"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						height={30}
						width={30}
					/>
					<h5 class="font-bold font-heading">Analysis</h5>
				</div>
				<p>Analyse your Progress & Take steps from Recommendations</p>
			</div>
		</div>
		<div class="flex justify-center mt-12 space-x-8">
			<!-- <a
				href="https://www.youtube.com/"
				class="font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/3 text-center"
			>
				Get Demo
			</a> -->
			<a
				href="/login"
				target="_self"
				class="font-bold text-xl p-4 bg-[#cf9261] rounded-xl shadow-md hover:bg-[#FFB26D] hover:text-[21px] hover:shadow-lg w-1/3 text-center"
			>
				Get Started
			</a>
		</div>
	</section>
	<footer class="bg-gray-800 py-8 text-white">
		<div class="container mx-auto text-center">
			<p class="text-sm">&copy; 2024 ConnectED. All rights reserved.</p>
			<!-- Add social media links or other footer content as needed -->
		</div>
	</footer>
</main>

<style>
	.wave-header {
		position: absolute;
		top: -20px;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
		z-index: 0;
	}

	.wave-header svg {
		position: relative;
		display: block;
		width: calc(181% + 1.3px);
		height: 550px;
	}

	.wave-header .shape-fill {
		fill: #b7dbf6;
	}
</style>

