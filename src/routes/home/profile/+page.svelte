<script lang="ts">
	import type { LayoutData } from "../$types";

    export let data: LayoutData;
	const userData = data.user[0];
</script>



<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<title>My Profile</title>

<body class="bg-gray-100 font-sans min-h-screen">

<div class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <div class="flex items-center mb-6">
        
        <!-- Add a dummy user name -->
        <div class="flex items-center mb-6">
            <i class="fa-solid fa-user text-4xl"></i>
            <div class="ml-4">
                <h2 class="text-2xl font-bold text-gray-800">{userData.userName}</h2>
            </div>

            <span class="ml-1 text-gray-600"> Level 3 </span>
        </div>

    </div>

    <div class="flex items-center space-x-4 mb-6">
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
        <a href="#" class="flex flex-col items-center p-2 bg-purple-100 border border-purple-200 hover:underline">
            <i class="fa-solid fa-book text-2xl mb-2"></i>
            <span class="text-sm">Sessions</span>
        </a>

        <!-- Blogs Link with Logo and Box -->
        <a href="#" class="flex flex-col items-center p-2 bg-red-100 border border-red-200 hover:underline">
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

