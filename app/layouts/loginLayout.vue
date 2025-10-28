<template>
  <div class="min-h-screen md:grid md:grid-cols-2 font-plusJakartaSans">
    <!-- Left side -->
    <!-- <div class="hidden md:flex flex-col justify-center px-8 md:px-12 bg-gradient-to-br from-[#000FE224] via-white to-[#000FE234] relative -->
    <!-- <div class="hidden md:flex flex-col justify-center relative">
         <div class="max-w-md bg-[url(/images/Line.png)] bg-no-repeat bg-cover absolute inset-0 bottom-[15px]"> -->
            <!-- <h1 class="text-[20px] md:text-[40px] font-bold mb-4 text-[#010101]">
            Your Tasks, Always under your control
            </h1>
            <p class="text-[#424242] text-[14px] font-normal">
            Whether it's daily reminders or big projects, stay on top of everything with ease.
                Organize, prioritize, and track progress so you never miss what matters most.
            </p> -->
        <!-- </div> 
    </div> -->

      <!-- Left column: Only visible on md+ -->
    <div class="hidden md:flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#F0F4FF] via-white to-[#E6ECFF]">
        
      <!-- Top-left partial image -->
      <div class="absolute left-[-10] top-0 w-[300px] h-[300px] bg-[url('/images/top-line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

      <!-- Bottom-left partial image -->
      <div class="absolute right-[-10px] bottom-[-140px] w-[400px] h-[400px] bg-[url('/images/Line.png')] bg-no-repeat bg-contain pointer-events-none"></div>

      <!-- Optional content can go here if needed -->
    </div>

    <!-- Right side -->
    <!-- <div class="md:flex md:justify-center items-center px-8 bg-[#FDFDFD] w-full">
      <slot />
    </div> -->
     <div class="flex justify-center items-center w-full min-h-screen px-0 md:px-6 md:bg-[#ffffff]
     bg-white bg-gradient-to-br from-[#000FE224] via-white to-[#000FE234] bg-none">
      <slot />
    </div>
  </div>
</template>
