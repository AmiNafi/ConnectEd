<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { z } from 'zod';
</script>

  
<svelte>
    
    <!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Page</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head> -->
<body class="bg-gray-100">
    <div class="bg-gray-100 text-white py-4">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <a href="/home/blogs/create-blog">
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Blog</button>
            </a>
            
            <div class="flex items-center">
                <input type="text" placeholder="Search..." class="px-4 py-2 bg-gray-700 text-white rounded-l-md">
                <button class="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">Search</button>
            </div>
        </div>
    </div>
    
    <main class="container mx-auto px-4 py-8">
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article class="bg-white p-6 shadow-md rounded-md shadow-2xl">
                <h2 class="text-xl font-bold mb-2">Blog Title</h2>
                <p class="text-gray-600 text-sm mb-4">Ami_Nafi | 29 Jan , 2024</p>
                <p class="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique, nisi eget molestie aliquam, urna ligula consequat ligula, nec auctor nisi sapien id mauris.</p>
                <a href="#" class="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Read More</a>
            </article>
            </section>
    </main>
    <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4">
            <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
    </footer>
</body>
<!-- </html> -->
</svelte>
  
<style>
</style>
  
<!-- <div>hello </div> -->