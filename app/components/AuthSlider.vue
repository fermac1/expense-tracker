<template>
       <!-- Slider content -->
    <div class="relative max-w-md w-full text-center px-6">
      <transition-group name="fade" tag="div">
        <div :key="activeSlide" class="transition-all duration-500 absolute bottom-[-170px] left-20 w-full">
          <img :src="currentSlide.image" class="mx-auto mb-10 max-h-[200px]" alt="" />
          <h1 class="text-[20px] md:text-[28px] font-bold mb-4 text-[#13003D] leading-tight">
            {{ currentSlide.title }}
          </h1>
          <p class="text-[#13003D] text-[14px] font-light leading-relaxed">
            {{ currentSlide.description }}
          </p>
        </div>
      </transition-group>

      <!-- Slider dots -->
    <div class="absolute bottom-[-200px] left-3/4 transform -translate-x-3/4 flex gap-2">
        <div
            v-for="(slide, index) in slides"
            :key="index"
            :class="[
            'h-1.5 rounded-full transition-all duration-300',
            activeSlide === index
                ? 'bg-[#8B5CF6] w-20'
                : 'bg-[#CBD5E0] w-2'
            ]"
        />
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const slides = [
  {
    image: '/images/dollars.png',
    title: 'Gain clarity over your finances',
    description: 'Track every expense with precision and see where your money truly goes. Stay informed, stay organized, stay in control.',
  },
  {
    image: '/images/pig.png',
    title: 'Build financial discipline with ease',
    description: 'Set goals, monitor progress, and take actionable steps towards lasting financial stability',
  },
  {
    image: '/images/avatar-connect.png',
    title: "Set your budget goals-we'll help you stick to them",
    description: 'From groceries to getaways, plan your money around what truly matters. Stay in control, save more, and reach your goals faster.',
  },
]

const activeSlide = ref(0)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.length
  }, 5000)
})

const currentSlide = computed(() => {
  return slides[activeSlide.value] ?? {
    image: '',
    title: '',
    description: ''
  }
})


onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>