<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen text-center font-satoshi text-[#13003D] overflow-hidden px-4">
    <!-- Semi-circle Background with Party Popper -->
    <div
      class="w-full w-[90%] max-w-[500px] max-h-[200px] bg-[url('/images/bg-doodle.svg')] bg-cover bg-center bg-no-repeat rounded-t-full flex items-center justify-center"
    >
      <img
        src="/images/party-popper.png"
        alt="party popper"
        class="w-[70%] max-w-[280px] p-6 md:p-10"
      />
    </div>

    <!-- Decorative Stars -->
    <div
      class="absolute right-4 top-16 md:right-1/4 md:top-[100px] w-10 h-10 bg-[url('/images/success-stars.png')] bg-no-repeat bg-contain pointer-events-none"
    ></div>

    <div
      class="absolute left-4 top-[200px] md:left-[240px] md:top-[240px] w-10 h-10 bg-[url('/images/success-stars.png')] bg-no-repeat bg-contain pointer-events-none"
    ></div>

    <!-- Text Section -->
    <div class="w-full max-w-[600px] flex flex-col items-center gap-2 mt-6 px-2">
      <p class="text-[22px] md:text-[40px] font-bold">You Did It</p>
      <p class="text-[14px] md:text-[18px] font-light">
        Your account's ready, now let's keep an eye on those spending habits.
      </p>
      <p class="text-[14px] md:text-[18px] font-light">
        Track where your money goes and make better choices every week.
      </p>
    </div>

    <!-- CTA Button -->
    <button
      @click="$router.push('/dashboard')"
      class="mt-8 w-full max-w-[600px] text-white bg-[#13003D] px-8 py-3 rounded-full text-[12px] md:text-[16px] font-bold font-plusJakartaSans"
    >
      Let's Go
    </button>
  </div>
</template>
