<template>
  <header class="border border-b border-[#71809626] flex items-center justify-between bg-white shadow px-6 py-4 font-plusJakartaSans">

    <!-- Mobile toggle button -->
    <button
      class="md:hidden text-2xl text-gray-700 hover:text-gray-900 mr-2"
      @click="$emit('toggleSidebar')"
    >
      <Icon name="heroicons:bars-3" class="w-6 h-6" />
    </button>

     <!-- <p class="text-[#1F1F1F] text-[14px] font-semibold">{{ pageTitle }}</p> -->
    <p></p>

    <div class="flex items-center space-x-4 relative">
     
      <button class="">
        <div class="bg-[#71809614] rounded-full px-3 py-2">
          <Icon name="system-uicons:bell" class="w-6 h-6 text-[#424242]" />
        </div>
      </button>
      <img src=".//images/avatar.png" alt="User" class="rounded-full w-10 h-10 cursor-pointer"  @click="toggleDropdown"/>
      <div>
        <p class="text-[#111827] text-[14px] font-medium">Sunny Ade</p>
        <p class="text-[#11182773] text-[10px] font-meduim">sunny@gmail.com</p>
      </div>

       <!-- Dropdown Menu -->
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-md border border-gray-200"
      >
        <ul>
          <li>
            <button
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
        </div>
    </div>
  </header>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import { usePageTitle } from '../composables/usePageTitle'

const { pageTitle } = usePageTitle()

const router = useRouter()


// Local state to toggle dropdown visibility
const isDropdownOpen = ref(false)

// Toggle the visibility of the dropdown menu
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}


</script>