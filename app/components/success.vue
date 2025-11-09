<template>
     <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="props.open"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      @click="props.onClose"
    />
  </transition>

  <!-- Sidebar -->
  <transition name="slide">
    <div
      v-if="props.open"
      class="fixed top-0 right-0 w-full max-w-xl h-full bg-white shadow-xl z-50 flex flex-col px-4 py-6 font-satoshi"
    >
      <!-- Header -->
      <div class="flex justify-end p-2">
        <button @click="props.onClose" class=" border border-[#EEF0F2] text-[#010101] rounded-full py-1/2 px-1">
          <Icon name="system-uicons:close" class="w-10 h-10 font-bold mt-1" />
        </button>
      </div>
        <div class="flex flex-col items-center justify-center font-satoshi">
            <div class="bg-[url('/images/success-bg.png')] rounded-full p-6">
                <img src="/images/success-img.png" alt="">
            </div>
            <p class="text-[#111827] text-[18px] font-light mt-2">Expense ticket added successfully</p>
        </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
   const props = defineProps<{
    open: boolean
    onClose: () => void
    }>()
</script>

