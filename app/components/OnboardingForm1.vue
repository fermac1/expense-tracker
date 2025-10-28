<script setup lang="ts">
import { useOnboardingStore } from '@/stores/onboarding'

const store = useOnboardingStore()

const moneyGoals = [ 'Save more money', 'Build better habits', 'Manage business expenses', 'Track my daily spending']

const trackingMethods = ['Notes app', 'Another tracking app', "I don't track yet"]

const spendingInsights = ['Just monthly', 'Every day', 'Every week']

// --- Toggle logic for multiple selections ---
const toggleSelection = (list: string[], value: string) => {
  const index = list.indexOf(value)
  if (index === -1) {
    list.push(value)
  } else {
    list.splice(index, 1)
  }
}

const selectGoal = (goal: string) => toggleSelection(store.moneyGoals, goal)
const selectTracking = (method: string) => toggleSelection(store.trackingMethods, method)
const selectInsight = (insight: string) => toggleSelection(store.spendingInsights, insight)

const isSelected = (list: string[], value: string) => list.includes(value)

const isFormComplete = computed(() => {
  return (
    store.moneyGoals.length > 0 &&
    store.trackingMethods.length > 0 &&
    store.spendingInsights.length > 0
  )
})

onMounted(() => {
  store.ensureDefaults()
})
</script>

<template>
  <div>
    <!-- Money Goal -->
    <div>
      <p class="font-semibold mb-2 uppercase font-satoshi text-[#111827] text-[11px]">What is your MONEY goal RIGHT NOW?</p>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="goal in moneyGoals"
          :key="goal"
          @click="selectGoal(goal)"
          type="button"
         :class="[
            'relative px-5 py-3 rounded-full border text-[11px] transition font-normal',
            isSelected(store.moneyGoals, goal)
              ? 'bg-[#13003D] text-[#ffffff]'
              : 'border-dashed border-[#1118271A] text-[#11182740] hover:border-[#111827]'
          ]"
        >
          <span
            v-if="isSelected(store.moneyGoals, goal)"
            class="absolute left-0 py-1/2 px-1 bg-[#ffffff] border border-[#E5E7EB] rounded-full ml-4"
          >
          <Icon
            name="mdi:check"
            class="text-[#000000] text-[10px]"
          />
          </span>
          <span :class="isSelected(store.moneyGoals, goal) ? 'ml-8' : 'mr-4'">
            {{ goal }}
          </span>

          <span
            v-if="!isSelected(store.moneyGoals, goal)"
            class="py-1/2 px-1 bg-[#F1F1F1] border border-[#E5E7EB] rounded-[4px]"
          ><Icon name="bi:plus" class="text-gray-500 text-[10px]" />
          </span>
        </button>
      </div>
    </div>

    <!-- Tracking Method -->
    <div>
      <h3 class="font-semibold mb-2 mt-4 uppercase font-satoshi text-[#111827] text-[11px]">HOW DO YOU TRACK YOUR EXPENSES NOW</h3>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="method in trackingMethods"
          :key="method"
          @click="selectTracking(method)"
          type="button"
          :class="[
            'relative px-5 py-3 rounded-full border text-[11px] transition',
            isSelected(store.trackingMethods, method)
              ? 'bg-[#13003D] text-[#ffffff]'
              : 'border-dashed border-[#1118271A] text-[#11182740] hover:border-[#111827]'
          ]"
        >
           <span
            v-if="isSelected(store.trackingMethods, method)"
            class="absolute left-0 py-1/2 px-1 bg-[#ffffff] border border-[#E5E7EB] rounded-full ml-4"
          >
          <Icon
            name="mdi:check"
            class="text-[#000000] text-[10px]"
          />
          </span>
          <span :class="isSelected(store.trackingMethods, method) ? 'ml-8' : 'mr-4'">
            {{ method }}
          </span>

          <span
            v-if="!isSelected(store.trackingMethods, method)"
            class="py-1/2 px-1 bg-[#F1F1F1] border border-[#E5E7EB] rounded-[4px]"
          ><Icon name="bi:plus" class="text-gray-500 text-[10px]" />
          </span>
        </button>
      </div>
    </div>

    <!-- Spending Insight -->
   <div>
      <h3 class="font-semibold mb-2 mt-4 uppercase font-satoshi text-[#111827] text-[11px]">
        HOW OFTEN DO YOU WANT SPENDING INSIGHTS
      </h3>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="insight in spendingInsights"
          :key="insight"
          @click="selectInsight(insight)"
          type="button"
          :class="[
            'relative px-5 py-3 rounded-full border text-[11px] flex items-center justify-between transition min-w-[180px]',
            isSelected(store.spendingInsights, insight)
            ? 'bg-[#13003D] text-[#ffffff]'
              : 'border-dashed border-[#1118271A] text-[#11182740] hover:border-[#111827]'
          ]"
        >
         <span
            v-if="isSelected(store.spendingInsights, insight)"
            class="absolute left-0 py-1/2 px-1 bg-[#ffffff] border border-[#E5E7EB] rounded-full ml-4"
          >
          <Icon
            name="mdi:check"
            class="text-[#000000] text-[10px]"
          />
          </span>
          <span :class="isSelected(store.spendingInsights, insight) ? 'ml-8' : 'mr-4'">
            {{ insight }}
          </span>

          <span
            v-if="!isSelected(store.spendingInsights, insight)"
            class="py-1/2 px-1 bg-[#F1F1F1] border border-[#E5E7EB] rounded-[4px]"
          >
            <Icon name="bi:plus" class="text-gray-500 text-[10px]" />
          </span>
        </button>
      </div>
    </div>

    <!-- Continue -->
     <button
      type="submit"
      class="w-full text-[12px] font-normal py-3 rounded-[48px] mt-6 transition-all duration-300"
      :class="isFormComplete ? 'bg-[#13003D] text-white' : 'bg-[#EDEFF3] text-[#92A0BE]'"
      :disabled="!isFormComplete"
    >
      Continue
    </button>
  </div>
</template>
