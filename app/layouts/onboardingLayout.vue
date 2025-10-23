<template>
  <div class="min-h-screen md:grid md:grid-cols-[0.9fr_1.1fr] font-plusJakartaSans overflow-hidden">
    <!-- Left side -->
    <div class="hidden md:flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#F0F4FF] via-white to-[#E6ECFF]">
        
      <!-- Top-left partial image -->
      <div class="absolute left-[-10] top-0 w-[300px] h-[300px] bg-[url('/images/top-line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

      <!-- Bottom-left partial image -->
      <div class="absolute right-[-10px] bottom-[-140px] w-[400px] h-[400px] bg-[url('/images/Line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

    </div>

    <!-- Right side -->
     <div class="flex justify-center items-center w-full min-h-screen px-4 md:bg-[#ffffff]
     bg-white bg-gradient-to-br from-[#000FE224] via-white to-[#000FE234] md:bg-none overflow-y-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Prevent body scroll when right panel scrolls */
html,
body {
  overflow: hidden;
  height: 100%;
}
</style>