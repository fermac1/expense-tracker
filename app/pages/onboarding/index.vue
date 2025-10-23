<template>
  <div class="w-full max-w-md bg-[#ffffff] rounded-xl px-4 md:px-1 py-8 font-plusJakartaSans">

    <!-- Back button -->
    <button
      @click="handleBack"
      class="bg-[#71809614] p-1 w-fit rounded-full mb-4 flex items-center justify-center"
      type="button"
    >
      <Icon
        name="material-symbols-light:arrow-back-ios-rounded"
        class="text-[#010101] ml-1 text-[12px]"
      />
    </button>

    <!-- Header -->
    <h2 class="text-20px md:text-[20px] text-[#191919] font-bold mb-2">
      Let's personalize your experience
    </h2>
    <p class="text-[#191919] text-[12px] font-[400] mb-6">
      {{ subText }}
    </p>

    <!-- Form container with animated transition -->
    <form class="space-y-4 relative overflow-hidden" @submit.prevent="onSubmit">
      <Transition :name="transitionName" mode="out-in">
        <component
          :is="currentForm"
          :key="store.step"
          class="transition-all"
        />
      </Transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding'
import OnboardingForm1 from '../../components/OnboardingForm1.vue'
import OnboardingForm2 from '../../components/OnboardingForm2.vue'

definePageMeta({
  layout: 'onboarding-layout'
})

const store = useOnboardingStore()
const transitionName = ref<'slide-left' | 'slide-right'>('slide-left')

// Determine which form to show
const currentForm = computed(() => {
  if (store.step === 1) return OnboardingForm1
  if (store.step === 2) return OnboardingForm2
  return OnboardingForm1
})

const subText = computed(() => {
  switch (store.step) {
    case 1:
      return "Tell us what you want to achieve so we can tailor your dashboard to your goals."
    case 2:
      return "Knowing your income cycle helps us show you how your spending aligns with payday"
    default:
      return ""
  }
})

// Submit handler (Next or Submit)
const onSubmit = () => {
  if (store.step === 1) {
    transitionName.value = 'slide-left'
    store.nextStep()
  } else if (store.step === 2) {
    store.submitForm()
  }
}

// Back button handler
const handleBack = () => {
  if (store.step > 1) {
    transitionName.value = 'slide-right'
    store.prevStep()
  } else {
    window.history.back()
  }
}
</script>

<style scoped>
/* === Forward Slide (Next) === */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* === Backward Slide (Previous) === */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
