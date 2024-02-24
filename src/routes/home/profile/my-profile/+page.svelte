<script lang="ts">
	import type { LayoutData } from "../$types";

    export let data: LayoutData;
	const userData = data.user[0];
    // console.log(data , userData);
    // console.log(userData.blogs.length);
</script>


<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<title>My Profile</title>

<body class="flex flex-row justify-center mx-auto">

<div class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <div class="flex items-center mb-6">
        
        <!-- Add a dummy user name -->
        <div class="flex items-center mb-6">
            <!-- <i class="fa-solid fa-user text-4xl"></i> -->
            <img src={userData.imageLink}  class="object-cover w-full h-40" />
            <div class="ml-4">
                <h2 class="text-2xl font-bold text-gray-800">{userData.userName}</h2>
            </div>

            <!-- <span class="ml-1 text-gray-600"> Level 3 </span> -->
        </div>

    </div>

    <!-- <div class="flex items-center space-x-4 mb-6">
        <div class="flex-1">
            <p class="text-gray-600">Experience Points</p>
            <div class="flex items-center mt-2">
                <div class="flex-1 bg-gray-300 h-4 rounded-full">
                    <div class="w-3/4 h-full bg-green-500 rounded-full"></div>
                </div>
                <div class="ml-2">
                    <span class="text-gray-600">6125 / 9999 XP</span>
                </div>
            </div>
        </div>
    </div> -->
    <div class="count-container">
        <!-- Blog count -->
        <div class="count max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h2 class="text-xl font-semibold mb-2">Blogs</h2>
            <div class="text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 bg-blue-500">
                <!-- Display the number of blogs dynamically here -->
                {userData.blogs.length} <!-- Example: Replace with dynamic value -->
            </div>
            {#if userData.blogs.length > 1}
                 <!-- content here -->
                 <p class="text-gray-600">You've written <span class="font-bold">{userData.blogs.length} blogs </span> </p>
            {:else if  userData.blogs.length == 1}
                 <!-- else if content here -->
                 <p class="text-gray-600">You've written <span class="font-bold">{userData.blogs.length} blog </span> </p>
            {:else}
                 <!-- else content here -->
                 <p class="text-gray-600"> You haven't written any blogs yet  </p>
            {/if}
            <!-- </p> -->
        </div>

        <!-- Session count -->
        <div class="count max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h2 class="text-xl font-semibold mb-2">Sessions</h2>
            <div class="text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 bg-green-500">
                <!-- Display the number of sessions dynamically here -->
                {userData.sessions.length} <!-- Example: Replace with dynamic value -->
            </div>
            <!-- <p class="text-gray-600">You've attended <span class="font-bold">5</span> sessions.</p> -->
            {#if userData.sessions.length > 1}
                 <!-- content here -->
                 <p class="text-gray-600">You've written <span class="font-bold">{userData.sessions.length} blogs </span> </p>
            {:else if  userData.sessions.length == 1}
                 <!-- else if content here -->
                 <p class="text-gray-600">You've written <span class="font-bold">{userData.sessions.length} blog </span> </p>
            {:else}
                 <!-- else content here -->
                 <p class="text-gray-600"> You haven't opened any sessions yet  </p>
            {/if}
        </div>
    </div>

    
    <div class="flex space-x-4 mb-6">
        <!-- Friends-->
        <a href="#" class="flex flex-col items-center p-2 bg-blue-100 border border-blue-200 hover:underline">
            <i class="fa-solid fa-user-group text-2xl mb-2"></i>
            <span class="text-sm">Friends</span>
        </a>

        <!-- Followers Link with Follower Logo and Box -->
        <a href="#" class="flex flex-col items-center p-2 bg-green-100 border border-green-200 hover:underline">
            <i class="fa-solid fa-user-plus text-2xl mb-2"></i>
            <span class="text-sm">Followers</span>
        </a>

        <!-- Sessions Link with Logo and Box -->
        <a href="/home/session/my-session" class="flex flex-col items-center p-2 bg-purple-100 border border-purple-200 hover:underline">
            <i class="fa-solid fa-book text-2xl mb-2"></i>
            <span class="text-sm">Sessions</span>
        </a>

        <!-- Blogs Link with Logo and Box -->
        <a href="/home/blogs/explore-blog" class="flex flex-col items-center p-2 bg-red-100 border border-red-200 hover:underline">
            <i class="fas fa-blog text-red-500 text-lg mb-2"></i>
            <span class="text-sm">Blogs</span>
        </a>

        <!-- Achievements Link with Logo and Box -->
        <a href="#" class="flex flex-col items-center p-2 bg-orange-100 border border-orange-200 hover:underline">
            <i class="fas fa-trophy text-orange-500 text-lg mb-2"></i>
            <span class="text-sm">Achievements</span>
        </a>
    </div>


    <div class="flex space-x-4 mb-6">
        <!-- Social Links -->
        <a href="#" class="text-gray-600 hover:text-blue-500">
            <i class="fab fa-facebook text-lg"></i>
        </a>
        <a href="#" class="text-gray-600 hover:text-blue-500">
            <i class="fab fa-twitter text-lg"></i>
        </a>
        <a href="#" class="text-gray-600 hover:text-blue-500">
            <i class="fab fa-linkedin-in text-lg"></i>
        </a>
    </div>

</div>

</body>

<style>
    .blog-count {
        border: 4px ; /* Border color */
        margin-bottom: 20px;
    }

    .count-container {
        display: flex; /* Use Flexbox layout */
        justify-content: space-between; /* Align items with space between them */
        margin-bottom: 20px; /* Add margin to create space between count containers and other items */
    }

    /* Style for individual count container */
    .count-container .count {
        width: calc(50% - 10px); /* Set width for each count container */
        border: 4px ; /* Border color */
        text-align: center;
        padding: 10px;
    }
</style>