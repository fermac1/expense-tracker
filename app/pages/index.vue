<template>
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#EDE9FE] to-[#ffffff]"> 
        
        <!-- Top-left partial image -->
        <div class="absolute left-0 top-0 w-[300px] h-[300px] bg-[url('/images/top-line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

        <div class="absolute right-6 top-20 md:right-1/4 md:top-[120px] w-10 h-10 bg-[url('/images/star.png')] bg-no-repeat bg-contain pointer-events-none"></div>

        <div class="absolute left-6 top-[220px] md:top-[200px] md:left-[240px] md:top-[240px] w-10 h-10 bg-[url('/images/star.png')] bg-no-repeat bg-contain pointer-events-none"></div>

        <!-- Bottom-left partial image -->
        <div class="absolute right-[-10px] bottom-[-140px] w-[400px] h-[400px] bg-[url('/images/landing-line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

        <div class="text-center px-4 md:px-0">
            <p class="text-[#13003D] text-[20px] md:text-[30px] font-[700] font-satoshi">Lets get you started</p>
            <p class="text-[#13003D] text-[12px] md:text-[18px] font-[400] max-w-xl mx-auto mt-4 mb-8">Track every expenses with precision and see where your money truly goes. Stay informed, stay organized, stay in control.</p>

            <div class="flex flex-col justify-center items-center text-[10px] md:text-[12px] font-plusJarkartaSans font-[500]">
                <button class="block w-[80%] md:max-w-[500px] mb-4 px-10 py-2 mb-4 rounded-[200px] bg-[#13003D] text-[#FAFAFA]">
                    <NuxtLink to="/auth/signup">Create an account</NuxtLink>
                </button>
                <button class="block w-[80%] md:max-w-[500px] px-10 py-2 rounded-[200px] bg-[#ffffff] text-[#2B3A5A]">
                    <NuxtLink to="/auth/login">Sign in</NuxtLink>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  
</script>
