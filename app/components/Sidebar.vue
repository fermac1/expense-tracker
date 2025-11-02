<template>
  <!-- <aside class="w-64 bg-white shadow-md flex flex-col"> -->

    <aside
      :class="[
        'bg-white bg-[url(\'../../../images/yellow-bg-pattern.png\')] bg-no-repeat bg-contain bg-[position:bottom_right] shadow-md transition-all duration-300 ease-in-out z-40',
        isSidebarOpen ? 'w-[70vw]' : 'w-64',  // Sidebar takes 70% width of the screen on mobile when open
        !isMobile ? 'md:w-64' : '',  // Keep 64px on desktop
        isMobile
      ? 'fixed inset-y-0 left-0' : '',  // Only fix position on mobile
      ]"
    >

    <div class="px-6 py-7 text-[15px] font-bold text-[#1F1F1F] flex justify-between">
      <span>
        <span class="text-[#2525B1]">Expense </span>
        <span class="text-[#4F02FD]">tracker</span>
      </span>

       <span class="rounded-full border border-[#7180961A] px-1.5 py-1/2 cursor-pointer">
        <Icon name="solar:logout-outline" class="mt-1" />
       </span>

          <!-- Close (X) Icon on Mobile -->
      <button
        v-if="isMobile"
        @click="emitCloseSidebar"
        class="text-xl focus:outline-none rounded-[12px] p-2 absolute top-2 right-2"
      >
        <Icon name="mdi:close" class="text-[#000000]"/>
      </button>
    </div>
  
    <!-- Divider -->
    <div class="border-t border-gray-200"></div>

    <nav class="flex-1 pt-6">
      <ul>
         <!-- Dashboard Link -->
        <li>
          <NuxtLink
            to="/dashboard"
            class="flex items-center space-x-2 px-6 py-3 rounded-[6px] hover:bg-[#000CB00A]"
            :class="isActive('/dashboard') ? 'bg-[#000CB00A] text-[#6D2FF9] font-bold' : 'text-gray-700'"
            @click="emitCloseSidebar" 
          >
            <Icon name="mage:dashboard-fill" :class="isActive('/dashboard') ? 'text-[#6D2FF9]' : ''" />
            <span class="text-[11px]">Home</span>
          </NuxtLink>
        </li>

        <!-- Task Management Link -->
        <li>
          <NuxtLink
            to="/dashboard/tasks"
            class="flex items-center space-x-2 px-6 py-3 rounded-[6px] hover:bg-[#000CB00A]"
            :class="isActive('/dashboard/tasks') ? 'bg-[#000CB00A] text-[#000CB0] font-bold' : 'text-gray-700'"
            @click="emitCloseSidebar" 
          >
            <Icon name="solar:chart-2-outline" :class="isActive('/dashboard/tasks') ? 'text-[#000CB0]' : ''" />
            <span class="text-[11px]">Analytics</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  isSidebarOpen: Boolean,
  isMobile: Boolean
})

const emit = defineEmits()
// Emit close event when sidebar is toggled on mobile
const emitCloseSidebar = () => {
  if (props.isMobile) {
    emit('closeSidebar') // This emits the closeSidebar event to the parent
  }
}
const isActive = (path: string) => route.path === path
</script>