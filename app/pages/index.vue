<template>
    <div class="min-h-screen bg-[#8B5CF6] flex items-center justify-center">
        <div class="text-center">
            <p class="text-[#13003D] text-[40px] font-[700] font-satoshi">Lets get you started</p>
            <p class="text-[#13003D] text-[20px] font-[400] max-w-xl mx-auto mt-4 mb-8">Track every expenses with precision and see where your money truly goes. Stay informed, stay organized, stay in control.</p>

            <div class="flex flex-col text-[12px] font-plusJarkartaSans font-[500]">
                <button class="block max-w-xl mb-4 px-10 py-2 mb-4 rounded-[200px] bg-[#13003D] text-[#FAFAFA]">
                    <NuxtLink to="/auth/signup">Create an account</NuxtLink>
                </button>
                <button class="block max-w-xl px-10 py-2 rounded-[200px] bg-[#ffffff] text-[#2B3A5A]">
                    <NuxtLink to="/auth/login">Sign in</NuxtLink>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  
</script>
