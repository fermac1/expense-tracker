<template>
  <div class=" w-full">
    <div class="flex justify-between items-center mb-4">
      <!-- <div>
        <h2 class="text-xl font-semibold text-gray-800">Your Spending insights</h2>
        <p class="text-gray-500">Here’s a breakdown of your year in numbers</p>
      </div> -->
        <div class="text-[#010101]">
            <h1 class="text-[15px] font-bold mb-2">Your Spending insights</h1>
            <p class="text-[12px] font-light mb-6">Here's a breakdown of your year in numbers</p>
        </div>
      <button
        class="flex items-center gap-2 border rounded-lg px-3 py-2 md:text-[10px] text-[8px] hover:bg-gray-50"
      >
        This year
        <Icon name="mdi:chevron-down" class="w-4 h-4" />
      </button>
    </div>

    <div class="h-[400px]">
      <Bar
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useFinanceStore } from '~/stores/finance'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useFinanceStore()

const chartData = computed(() => store.chartData)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(243, 244, 246, 0.5)' },
      ticks: { color: '#6B7280', callback: (value: number) => value + 'K' }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#6B7280' }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E1B4B',
      callbacks: {
        label: (ctx: any) => {
          const label = ctx.dataset.label
          const value = ctx.formattedValue
          // return `${label}: ₦${value.replace('K', ',000')}`
          return `${label}: ₦${value.replace('K')}`
        }
      }
    }
  }
}
</script>
