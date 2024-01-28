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
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ConnectED - Study Resource Management and Collaborative Study Platform</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
      <style>
          body {
              font-family: 'Roboto', sans-serif;
          }
          /* Additional custom styles can be added here */
      </style>
  </head>
  <body class="bg-gray-100">
  
      <!-- Navigation -->
      <nav class="bg-blue-600 text-white p-4">
          <div class="container mx-auto">
              <div class="flex items-center justify-between">
                  <div class="text-2xl font-semibold">ConnectED</div>
                  <!-- Add navigation links here if needed -->
              </div> 
          </div>
      </nav>
  
      <!-- Hero Section -->
      <header class="bg-blue-800 text-white py-24">
          <div class="container mx-auto text-center">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">Empowering Your Learning Journey</h1>
              <p class="text-lg md:text-xl lg:text-2xl mb-8">Your all-in-one platform to organize, collaborate, and elevate your study experience.</p>
              <a href="#features" class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-blue-600 hover:text-white">Explore Features</a>
          </div>
      </header>
  
      <!-- Features Section -->
      <section id="features" class="py-16">
          <div class="container mx-auto text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">Key Features</h2>
  
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <!-- Feature 1 -->
                  <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                      <i class="fas fa-book text-4xl text-blue-600 mb-4"></i>
                      <h3 class="text-xl lg:text-2xl font-semibold mb-4">Study Resource Management</h3>
                      <p class="text-gray-700">Effortlessly organize and keep track of all your study materials in one place for efficient learning.</p>
                  </div>
  
                  <!-- Feature 2 -->
                  <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                      <i class="fas fa-users text-4xl text-blue-600 mb-4"></i>
                      <h3 class="text-xl lg:text-2xl font-semibold mb-4">Collaborative Study Sessions</h3>
                      <p class="text-gray-700">Share your study sessions with others or join sessions created by fellow learners, enhancing collaboration and knowledge exchange.</p>
                  </div>
  
                  <!-- Feature 3 -->
                  <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                      <i class="fas fa-users-class text-4xl text-blue-600 mb-4"></i>
                      <h3 class="text-xl lg:text-2xl font-semibold mb-4">Study Groups</h3>
                      <p class="text-gray-700">Form study groups with friends, fostering a supportive environment for collaborative learning.</p>
                  </div>
  
                  <!-- Feature 4 -->
                  <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                      <i class="fas fa-user-friends text-4xl text-blue-600 mb-4"></i>
                      <h3 class="text-xl lg:text-2xl font-semibold mb-4">Find Study Partners</h3>
                      <p class="text-gray-700">Connect with learners who share similar interests and academic goals for effective study partnerships.</p>
                  </div>
  
                  <!-- Feature 5 -->
                  <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                      <i class="fas fa-blog text-4xl text-blue-600 mb-4"></i>
                      <h3 class="text-xl lg:text-2xl font-semibold mb-4">Blogs and Experiences</h3>
                      <p class="text-gray-700">Create and share blogs about your learning experiences, methods, and conclusions, or explore insights from others in the community.</p>
                  </div>
  
                  <!-- Feature 6 -->
                  <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                      <i class="fas fa-medal text-4xl text-blue-600 mb-4"></i>
                      <h3 class="text-xl lg:text-2xl font-semibold mb-4">Gamified Motivation</h3>
                      <p class="text-gray-700">Stay motivated with a gamified system featuring levels and achievements, making learning an exciting and rewarding journey.</p>
                  </div>
              </div>
          </div>
      </section>
  
      <!-- CTA Section -->
      <section class="bg-blue-800 text-white py-20">
          <div class="container mx-auto text-center">
              <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">Ready to Elevate Your Learning Experience?</h2>
              <p class="text-lg md:text-xl lg:text-2xl mb-8">Join ConnectED today and embark on a collaborative learning adventure!</p>
              <a href="#contact" class="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold transition duration-300 hover:bg-blue-600 hover:text-white">Get Started</a>
          </div>
      </section>
  
      <!-- Footer Section -->
      <footer class="bg-gray-800 text-white py-8">
          <div class="container mx-auto text-center">
              <p class="text-sm">&copy; 2024 ConnectED. All rights reserved.</p>
              <!-- Add social media links or other footer content as needed -->
          </div>
      </footer>
  
  </body>
  </html>
  
</svelte>
  
<style>
</style>
  