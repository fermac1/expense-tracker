<script setup lang="ts">
import AuthSlider from '~/components/AuthSlider.vue';

</script>

<template>
  <div class="min-h-screen md:grid md:grid-cols-2 font-plusJakartaSans">
    <!-- Left side -->
    <div class="hidden md:flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#F0F4FF] via-white to-[#E6ECFF]">
        
      <!-- Top-left partial image -->
      <div class="absolute left-[-10] top-0 w-[300px] h-[400px] bg-[url('/images/top-line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

      <!-- Bottom-left partial image -->
      <div class="absolute right-[-10px] bottom-[-100px] w-[300px] h-[400px] bg-[url('/images/signup-line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

      <AuthSlider />

    </div>

    <!-- Right side -->
    <!-- <div class="md:flex md:justify-center items-center px-8 bg-[#FDFDFD] w-full">
      <slot />
    </div> -->
     <div class="flex justify-center items-center w-full min-h-screen px-6 md:bg-[#ffffff]
     bg-white bg-gradient-to-br from-[#000FE224] via-white to-[#000FE234] md:bg-none">
      <slot />
    </div>
  </div>
</template>
