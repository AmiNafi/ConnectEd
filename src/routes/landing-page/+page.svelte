<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<body class="bg-gray-100">
	<!-- Navigation -->
	<nav class="bg-blue-600 p-4 text-white">
		<div class="container mx-auto">
			<div class="flex items-center justify-between">
				<div class="text-2xl font-semibold">ConnectED</div>
				<div>
					<Button href="/register" class="bg-blue-800">Signup</Button>
					<Button href="/login" class="bg-blue-800">Login</Button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<header class="bg-blue-800 py-24 text-white">
		<div class="container mx-auto text-center">
			<h1 class="mb-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
				Empowering Your Learning Journey
			</h1>
			<p class="mb-8 text-lg md:text-xl lg:text-2xl">
				Your all-in-one platform to organize, collaborate, and elevate your study experience.
			</p>
			<a
				href="#features"
				class="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
				>Explore Features</a
			>
		</div>
	</header>

	<!-- Features Section -->
	<section id="features" class="py-16">
		<div class="container mx-auto text-center">
			<h2 class="mb-8 text-3xl font-extrabold md:text-4xl lg:text-5xl">Key Features</h2>

			<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
				<!-- Feature 1 -->
				<div class="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
					<i class="fas fa-book mb-4 text-4xl text-blue-600"></i>
					<h3 class="mb-4 text-xl font-semibold lg:text-2xl">Study Resource Management</h3>
					<p class="text-gray-700">
						Effortlessly organize and keep track of all your study materials in one place for
						efficient learning.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
					<i class="fas fa-users mb-4 text-4xl text-blue-600"></i>
					<h3 class="mb-4 text-xl font-semibold lg:text-2xl">Collaborative Study Sessions</h3>
					<p class="text-gray-700">
						Share your study sessions with others or join sessions created by fellow learners,
						enhancing collaboration and knowledge exchange.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
					<i class="fas fa-users-class mb-4 text-4xl text-blue-600"></i>
					<h3 class="mb-4 text-xl font-semibold lg:text-2xl">Study Groups</h3>
					<p class="text-gray-700">
						Form study groups with friends, fostering a supportive environment for collaborative
						learning.
					</p>
				</div>

				<!-- Feature 4 -->
				<div class="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
					<i class="fas fa-user-friends mb-4 text-4xl text-blue-600"></i>
					<h3 class="mb-4 text-xl font-semibold lg:text-2xl">Find Study Partners</h3>
					<p class="text-gray-700">
						Connect with learners who share similar interests and academic goals for effective study
						partnerships.
					</p>
				</div>

				<!-- Feature 5 -->
				<div class="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
					<i class="fas fa-blog mb-4 text-4xl text-blue-600"></i>
					<h3 class="mb-4 text-xl font-semibold lg:text-2xl">Blogs and Experiences</h3>
					<p class="text-gray-700">
						Create and share blogs about your learning experiences, methods, and conclusions, or
						explore insights from others in the community.
					</p>
				</div>

				<!-- Feature 6 -->
				<div class="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
					<i class="fas fa-medal mb-4 text-4xl text-blue-600"></i>
					<h3 class="mb-4 text-xl font-semibold lg:text-2xl">Gamified Motivation</h3>
					<p class="text-gray-700">
						Stay motivated with a gamified system featuring levels and achievements, making learning
						an exciting and rewarding journey.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-blue-800 py-20 text-white">
		<div class="container mx-auto text-center">
			<h2 class="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
				Ready to Elevate Your Learning Experience?
			</h2>
			<p class="mb-8 text-lg md:text-xl lg:text-2xl">
				Join ConnectED today and embark on a collaborative learning adventure!
			</p>
			<a
				href="/register"
				class="rounded-full bg-white px-8 py-4 font-semibold text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
				>Get Started</a
			>
		</div>
	</section>

	<!-- Footer Section -->
	<footer class="bg-gray-800 py-8 text-white">
		<div class="container mx-auto text-center">
			<p class="text-sm">&copy; 2024 ConnectED. All rights reserved.</p>
			<!-- Add social media links or other footer content as needed -->
		</div>
	</footer>
</body>
