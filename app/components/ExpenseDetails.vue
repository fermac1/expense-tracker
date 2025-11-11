<script setup lang="ts">
import { ref, watch } from 'vue'

const store = useExpenseFormStore()

const props = defineProps<{
  open: boolean
  onClose: () => void
  expense: typeof store.expenses[0] | null
}>()

// Success modal
const showModal = ref(false)
// const userStore = useUserStore()

// Access user info
// const userName = userStore.email

const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const getCategoryIcon = (category: string) => {
  const map: Record<string, string> = {
    Food: '/icons/food.png',
    Transportation: '/icons/driving.png',
    Shopping: '/icons/bag.png',
    Subscription: '/icons/receipt.png',
    Housing: '/icons/house.png',
    Default: '/icons/wallet.png'
  }
  return map[category] || map.Default
}
</script>


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
      class="fixed top-0 right-0 w-full max-w-xl h-full bg-white shadow-xl z-50 flex flex-col px-4 py-6"
    >
      <!-- Header -->
      <div class="flex justify-end p-2">
        <button @click="props.onClose" class=" border border-[#EEF0F2] text-[#010101] rounded-full py-1/2 px-1">
          <Icon name="system-uicons:close" class="w-10 h-10 font-bold mt-1" />
        </button>
      </div>

        <div class="border border-[#E6E6E673] rounded-[12px] overflow-y-auto">
            <div class="flex flex-row justify-between border border-b">
                <p class="text-[#2B2B2B] text-[14px] font-bold m-4">Expense ticket details #</p>
                <img src="/images/details-doodle.png" alt="">
            </div>

               <!-- If no expense selected -->
            <div v-if="!expense" class="text-sm text-gray-400 text-center mt-10">
              No expense selected
            </div>

            <div class="grid grid-cols-2 p-6" v-else>
                <div class="text-[#11182799] text-[13px] font-normal space-y-4">
                    <p>Category</p>
                    <p>Amount</p>
                    <p>Payment method</p>
                    <p>Description</p>
                    <p>Date</p>
                </div>
                <div class="text-right text-[13px] font-normal space-y-4">
                    <p class="flex flex-row gap-2 justify-end">
                       <div
                        v-for="cat in expense.category"
                        :key="cat"
                        class="flex items-center gap-2"
                      >
                        <img
                          :src="getCategoryIcon(cat)"
                          :alt="cat"
                          class="w-4 h-4 bg-[#3030CF12] rounded-full"
                        />
                        <span class="text-sm text-[#111827]">{{ cat }}</span>
                      </div>
                      <!-- <img src="/icons/bag.png" alt="bag" class="bg-[#3030CF12] rounded-full p-2 md:w-[12%]"> 
                      <span class="text-[#2B2B2B]">{{ props.expense?.category.join(', ') }}</span> -->
                    </p>
                    <p class="text-[14px] font-bold text-[#111827F2]">N{{ props.expense?.amount }}</p>
                    <p>{{ props.expense?.paymentMethod }}</p>
                    <p class="text-[#111827F2]">{{ props.expense?.description }}</p>
                    <p class="text-[#111827F2]">{{ props.expense?.date }}</p>
                </div>
            </div>
        </div>

    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
