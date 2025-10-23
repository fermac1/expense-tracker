<template>
  <div class="w-full max-w-md bg-[#ffffff] rounded-xl p-8 font-plusJakartaSans">
    <NuxtLink to="/">
        <div class="bg-[#71809614] px-1 w-fit rounded-full mb-4">
            <Icon name="material-symbols-light:arrow-back-ios-rounded" class="bg-[#010101] ml-1 text-[12px]" />
        </div>
    </NuxtLink>
    <h2 class="text-20px md:text-[20px] text-[#191919] font-bold mb-2">Login to your account</h2>
    <p class="md:text-[14px] text-[#191919] font-bold">Welcome back!!</p>
    <p class="text-[#191919] text-[12px] font-[400] mb-6">Pick up where you left off and stay ahead of your goals</p>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <!-- <div>
       <input type="email" placeholder="Enter Email address"
               class="w-full border border-[#EDEFF3] text-[#262C36] text-[12px] font-normal rounded-[8px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00065C] placeholder:text-[#11182740]"
               v-model="email" />
      </div> -->

      <div class="relative w-full">
        <!-- Floating Label -->
        <label
          :class="[
            'absolute left-4 text-xs transition-all duration-200',
            isEmailFocused || email ? 'top-1 text-[#667D99] text-[8px] font-[400]' : 'top-2.5 text-[#11182740] text-[12px] text-transparent'
          ]"
        >
          Email Address
        </label>

        <!-- Input Field -->
        <input
          type="email"
          v-model="form.email"
          @focus="isEmailFocused = true"
          @blur="isEmailFocused = false"
          :class="[
              isEmailFocused || form.email ? 'pt-6 pb-2 placeholder-transparent' : 'py-2 placeholder:text-[#11182740]',
              hasSubmitted && emailError ? 'border-[#D60000]' : 'border-[#EDEFF3]',
          ]"
          class="w-full border border-[#EDEFF3] text-[#262C36] text-[12px] font-normal rounded-[8px] px-4 focus:outline-none focus:ring-1 focus:ring-[#00065C]"
          placeholder="Enter Email Address"
        />

          <!-- Error message -->
        <p v-if="hasSubmitted && emailError" class="flex py-2 text-[#D60000] font-[400]">
          <img src="/icons/caution.png">
          <span class="text-[10px] ml-2">{{ emailError }}</span>
        </p>
      </div>

      <div class="relative w-full">
        <!-- Floating Label -->
        <label
          :class="[
            'absolute left-4 text-xs transition-all duration-200',
            isPasswordFocused || form.password ? 'top-1 text-[#667D99] text-[8px] font-[400]' : 'top-2.5 text-[#11182740] text-[12px] text-transparent'
          ]"
        >
          Password
        </label>
        <!-- Password Input -->
        <input
          type="password"
          placeholder="Enter Password"
          @focus="isPasswordFocused = true"
          @blur="isPasswordFocused = false"
          :class="[
            isPasswordFocused || form.password ? 'pt-6 pb-2 placeholder-transparent' : 'py-2 placeholder:text-[#11182740]',
             hasSubmitted && passwordError ? 'border-[#F56565]' : 'border-[#EDEFF3] focus:outline-none focus:ring-1 focus:ring-[#00065C]',
          ]"
          
          class="w-full pr-10 pl-4 py-2 border font-normal text-[#262C36] text-[12px] rounded-[8px]"
          v-model="form.password"
        />

        <!-- Lock Icon on Right Side -->
        <img
          src="/images/lock.png"
          alt="lock icon"
          class="absolute right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
          :class="[hasSubmitted && passwordError ? 'mb-4 top-4' : 'mb-0 top-1/2']"
        />

        <!-- Error message -->
        <p v-if="hasSubmitted && passwordError" class="flex py-2 text-[#D60000] font-[400]">
          <img src="/icons/caution.png">
          <span class="text-[10px] ml-2">{{ passwordError }}</span>
        </p>
      </div>


      <!-- :disabled="!isFormValid" -->
      <button type="submit"
              class="w-full text-[12px] font-normal py-3 rounded-[48px]"
              :class="[isFormValid  ? 'bg-[#13003D] text-[#FAFAFA]' : 'bg-[#EDEFF3] text-[#92A0BE]']"
              >
        Sign In
      </button>
    </form>

  </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'login-layout'
})

import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isEmailFocused = ref(false)
const isPasswordFocused = ref(false)

const emailError = ref('')
const passwordError = ref('')

const form = reactive({
  email: '',
  password: '',
})

const hasSubmitted = ref(false)

const isFormValid = computed(() => {
  return form.email.trim() !== '' && form.password.trim() !== ''
})

const handleLogin = () => {
  hasSubmitted.value = true
  emailError.value = ''
  passwordError.value = ''

  let errorFound = false

  if (!form.email.trim()) {
    emailError.value = 'Email is required.'
    errorFound = true
  }

  if (!form.password.trim()) {
    passwordError.value = 'Password is required.'
    errorFound = true
  }

  if (errorFound) return

  // ✅ Redirect or submit logic
  router.push('/onboarding')
}
</script>

