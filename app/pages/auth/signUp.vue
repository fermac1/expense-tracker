<template>
  <div class="w-full max-w-md bg-[#ffffff] rounded-xl p-8 font-plusJakartaSans">
    <NuxtLink to="/">
      <div class="bg-[#71809614] px-1 w-fit rounded-full mb-4">
        <Icon name="material-symbols-light:arrow-back-ios-rounded" class="bg-[#010101] ml-1 text-[12px]" />
      </div>
    </NuxtLink>

    <h2 class="text-20px md:text-[20px] text-[#191919] font-bold mb-2">Create your account</h2>
    <p class="text-[#191919] text-[12px] font-[400] mb-6">
      Create your account and begin tracking your expenses with ease and accuracy.
    </p>

    <form class="space-y-4" @submit.prevent="handleSignup">
      
      <!-- Full Name -->
      <div class="relative w-full">
        <label
          :class="[
            'absolute left-4 text-xs transition-all duration-200',
            isFullNameFocused || form.full_name ? 'top-1 text-[#667D99] text-[8px] font-[400]' : 'top-2.5 text-[#11182740] text-[12px] text-transparent'
          ]"
        >
          Full name
        </label>

        <input
          type="text"
          placeholder="Enter Full name"
          v-model="form.full_name"
          class="w-full border text-[#262C36] text-[12px] font-normal rounded-[8px] px-4 focus:outline-none focus:ring-1 focus:ring-[#00065C]"
           @focus="isFullNameFocused = true"
          @blur="isFullNameFocused = false"
          :class="[
            isFullNameFocused || form.full_name ? 'pt-6 pb-2 placeholder-transparent' : 'py-2 placeholder:text-[#11182740]',
            hasSubmitted && fullNameError ? 'border-[#D60000]' : 'border-[#EDEFF3]'
          ]"
          />
        <p v-if="hasSubmitted && fullNameError" class="flex py-2 text-[#D60000] font-[400]">
          <span class="text-[10px]"><img src="/icons/caution.png" class="inline-block mr-2"> {{ fullNameError }}</span>
        </p>
      </div>

      <!-- Email -->
      <div class="relative w-full">
        <label
          :class="[
            'absolute left-4 text-xs transition-all duration-200',
            isEmailFocused || form.email ? 'top-1 text-[#667D99] text-[8px] font-[400]' : 'top-2.5 text-[#11182740] text-[12px] text-transparent'
          ]"
        >
          Email Address
        </label>

        <input
          type="email"
          v-model="form.email"
          @focus="isEmailFocused = true"
          @blur="isEmailFocused = false"
          :class="[
            isEmailFocused || form.email ? 'pt-6 pb-2 placeholder-transparent' : 'py-2 placeholder:text-[#11182740]',
            hasSubmitted && emailError ? 'border-[#D60000]' : 'border-[#EDEFF3]'
          ]"
          class="w-full border text-[#262C36] text-[12px] font-normal rounded-[8px] px-4 focus:outline-none focus:ring-1 focus:ring-[#00065C]"
          placeholder="Enter Email Address"
        />

        <p v-if="hasSubmitted && emailError" class="flex py-2 text-[#D60000] font-[400]">
          <span class="text-[10px]"><img src="/icons/caution.png" class="inline-block mr-2"> {{ emailError }}</span>
        </p>
      </div>

      <!-- Password -->
      <div class="relative w-full">
        <label
          :class="[
            'absolute left-4 text-xs transition-all duration-200',
            isPasswordFocused || form.password ? 'top-1 text-[#667D99] text-[8px] font-[400]' : 'top-2.5 text-[#11182740] text-[12px] text-transparent'
          ]"
        >
          Password
        </label>

        <input
          type="password"
          placeholder="Create a Password"
          v-model="form.password"
          @focus="isPasswordFocused = true"
          @blur="isPasswordFocused = false"
          :class="[
            isPasswordFocused || form.password ? 'pt-6 pb-2 placeholder-transparent' : 'py-2 placeholder:text-[#11182740]',
            hasSubmitted && passwordError ? 'border-[#D60000]' : 'border-[#EDEFF3]'
          ]"
          class="w-full pr-10 pl-4 py-2 border font-normal text-[#262C36] text-[12px] rounded-[8px]"
        />

        <img
          src="/images/lock.png"
          alt="lock icon"
          class="absolute right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
          :class="[hasSubmitted && passwordError ? 'mb-4 top-4' : 'mb-0 top-1/2',
            (isPasswordValid && form.password ? 'border-[#48BB78]' : 'border-[#EDEFF3]')
          ]"
        />

        <p v-if="hasSubmitted && passwordError" class="flex py-2 text-[#D60000] font-[400]">
          <span class="text-[10px]"><img src="/icons/caution.png" class="inline-block mr-2"> {{ passwordError }}</span>
        </p>

        <p v-if="isPasswordValid && form.password" class="flex py-2 text-[#2F855A] font-[400]">
          
          <span class="text-[10px]"><img src="/icons/verify.png" class="inline-block mr-2" /> Password is strong.</span>
        </p>

      </div>

      <!-- Confirm Password -->
      <div class="relative w-full">
        <label
          :class="[
            'absolute left-4 text-xs transition-all duration-200',
            isConfirmPasswordFocused || form.confirmPassword ? 'top-1 text-[#667D99] text-[8px] font-[400]' : 'top-2.5 text-[#11182740] text-[12px] text-transparent'
          ]"
        >
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Re-enter Password"
          v-model="form.confirmPassword"
          @focus="isConfirmPasswordFocused = true"
          @blur="isConfirmPasswordFocused = false"
          :class="[
            isConfirmPasswordFocused || form.confirmPassword ? 'pt-6 pb-2 placeholder-transparent' : 'py-2 placeholder:text-[#11182740]',
            hasSubmitted && confirmPasswordError ? 'border-[#D60000]' : 'border-[#EDEFF3]'
          ]"
          class="w-full pr-10 pl-4 py-2 border font-normal text-[#262C36] text-[12px] rounded-[8px]"
        />

        <img
          src="/images/lock.png"
          alt="lock icon"
          class="absolute right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
          :class="[hasSubmitted && confirmPasswordError ? 'mb-4 top-4' : 'mb-0 top-1/2']"
        />

        <p v-if="hasSubmitted && confirmPasswordError" class="flex py-2 text-[#D60000] font-[400]">
          <span class="text-[10px]"><img src="/icons/caution.png" class="inline-block mr-2"> {{ confirmPasswordError }}</span>
        </p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full text-[12px] font-normal py-3 rounded-[48px]"
        :class="[isFormValid ? 'bg-[#13003D] text-[#FAFAFA]' : 'bg-[#EDEFF3] text-[#92A0BE]']"
      >
        Sign up
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'signup-layout'
})

import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Focus states
const isFullNameFocused = ref(false)
const isEmailFocused = ref(false)
const isPasswordFocused = ref(false)
const isConfirmPasswordFocused = ref(false)

// Error messages
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const fullNameError = ref('')

// Form state
const form = reactive({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const hasSubmitted = ref(false)

// Validation helpers
const isStrongPassword = (pwd: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  return regex.test(pwd)
}

const isPasswordValid = ref(false)

watch(() => form.full_name, (val) => {
  if (val.trim()) fullNameError.value = ''
})

watch(() => form.email, (val) => {
  if (val.trim()) emailError.value = ''
})

watch(() => form.password, (val) => {
  if (val.trim()) passwordError.value = ''
  isPasswordValid.value = isStrongPassword(val)
})

watch(() => form.confirmPassword, (val) => {
  if (val.trim() && val === form.password) confirmPasswordError.value = ''
})

const isFormValid = computed(() => {
  return (
    form.full_name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.password.trim() !== '' &&
    form.confirmPassword.trim() !== ''
  )
})

// Form submission
const handleSignup = () => {
  hasSubmitted.value = true

  // Reset errors
  fullNameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  let errorFound = false

  // Validate full name
  if (!form.full_name.trim()) {
    fullNameError.value = 'Full name is required.'
    errorFound = true
  }

  // Validate email
  if (!form.email.trim()) {
    emailError.value = 'Email is required.'
    errorFound = true
  }

  // Validate password
  if (!form.password.trim()) {
    passwordError.value = 'Password is required.'
    errorFound = true
  } else if (!isStrongPassword(form.password)) {
    passwordError.value = 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    errorFound = true
  }

  // Validate confirm password
  if (!form.confirmPassword.trim()) {
    confirmPasswordError.value = 'Please confirm your password.'
    errorFound = true
  } else if (form.password !== form.confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match.'
    errorFound = true
  }

  if (errorFound) return

  // ✅ Proceed to next step (e.g., API or redirect)
  // await someApiCall(form)
  router.push('/dashboard') // or wherever
}
</script>
