<template>
  <div class="max-w-md mx-auto space-y-8 font-satoshi">
    <div v-for="item in expenses" :key="item.id" class="flex items-start gap-4">
      <!-- Circular progress ring -->
        <div class="relative w-14 h-14">
        <svg class="w-full h-full rotate-[-90deg]"
            viewBox="0 0 60 60">
            <!-- Background ring -->
            <circle
            class="text-gray-200"
            stroke="currentColor"
            stroke-width="6"
            fill="transparent"
            r="26"
            cx="30"
            cy="30"
            />
            <!-- Progress ring -->
            <circle
            :class="item.progressColor"
            stroke="currentColor"
            stroke-width="6"
            fill="transparent"
            r="26"
            cx="30"
            cy="30"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="getDashOffset(item.percentage)"
            />
        </svg>

        <!-- Centered icon -->
        <div class="absolute inset-0 flex items-center justify-center">
            <img :src="item.icon" alt="icon" class="w-6 h-6" />
        </div>
        </div>


      <!-- Text -->
      <div :class="item.color">
        <h3 class="font-semibold text-[13px]">
          {{ item.percentage }}% {{ item.category }} -
          ₦{{ item.amount.toLocaleString() }}
        </h3>
        <p class="font-light text-[11px]">{{ item.note }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useExpenseStore } from '@/stores/expenses'

const store = useExpenseStore()
const { expenses } = storeToRefs(store)

onMounted(() => {
  store.fetchExpenses()
})

const radius = 26
const circumference = 2 * Math.PI * radius

const getDashOffset = (percent: number) => {
  return circumference - (percent / 100) * circumference
}
</script>


