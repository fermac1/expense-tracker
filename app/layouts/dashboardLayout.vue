<template>
  <div class="flex min-h-screen bg-[#ffffff]">
    <!-- Sidebar -->
    <Sidebar :class="{ 'hidden': !isSidebarOpen && isMobile }" :isMobile="isMobile" @closeSidebar="toggleSidebar"/>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden max-h-screen"  v-if="user">
      <Topbar @toggleSidebar="toggleSidebar"/>
      <main class="overflow-y-auto flex-1">
        <slot />
      </main>
      
    </div>

      <div v-else class="m-auto text-center items-center p-6 font-satoshi">
      <p>You are not logged in.</p>
      <NuxtLink to="/auth/login" class="text-blue-500 underline">Go to Login</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
    const isSidebarOpen = ref(false)
    const isMobile = ref(false)

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    // Handle closeSidebar event from Sidebar component
    const closeSidebar = () => {
      isSidebarOpen.value = false
    }

    onMounted(() => {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    })
    })

    const auth = useAuthStore()
    const user = computed(() => auth.user)
</script>
