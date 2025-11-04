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

      <!-- Content -->
      <slot />
    </div>
  </transition> 
</template>

<script setup lang="ts">
    const props = defineProps<{
    open: boolean
    onClose: () => void
    }>()

    // // Success modal
    // const showModal = ref(false)

    // const openModal = () => (showModal.value = true)
    // const closeModal = () => (showModal.value = false)
</script>
