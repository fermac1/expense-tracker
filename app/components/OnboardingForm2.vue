<script setup lang="ts">
import { useOnboardingStore } from '@/stores/onboarding'

import IconHouse from '/icons/house.png'
import IconBag from '/icons/bag.png'
import IconReceipt from '/icons/receipt.png'
import IconFood from '/icons/food.png'
import IconDriving from '/icons/driving.png'

const router = useRouter()
const store = useOnboardingStore()

const incomeDuration = [ 'Weekly', 'Biweekly', 'Monthly', 'Irregular']

const income = ['Less than \u20A6100,000', '\u20A6100,000 - \u20A6300,000', '\u20A6300,000 - \u20A6600,000', '\u20A6600,000 - \u20A61,000,000', 'Above \u20A61,000,000', 'Prefer not to say']

const budgetTarget = ['Shopping and Miscellaneous', 'Subscription and Utilities', 'Housing', 'Food & Drinks', 'Transportation']

const budgetIcons: Record<string, { icon: string, bg: string }> = {
  'Housing': { icon: IconHouse, bg: '#8B5CF614' },
  'Food & Drinks': { icon: IconFood, bg: '#48BB781A' },
  'Transportation': { icon: IconDriving, bg: '#F5656514' },
  'Shopping and Miscellaneous': { icon: IconBag, bg: '#3030CF12' },
  'Subscription and Utilities': { icon: IconReceipt, bg: '#FFD95114' },
}


// --- Toggle logic for multiple selections ---
const toggleSelection = (list: string[], value: string) => {
  const index = list.indexOf(value)
  if (index === -1) {
    list.push(value)
  } else {
    list.splice(index, 1)
  }
}

const selectIncomeDuration = (iDuration: string) => toggleSelection(store.incomeDuration, iDuration)
const selectIncome = (incomeVal: string) => toggleSelection(store.income, incomeVal)
const selectBudgetTarget = (budget: string) => toggleSelection(store.budgetTarget, budget)

const isSelected = (list: string[], value: string) => list.includes(value)

const isFormComplete = computed(() => {
  return (
    store.incomeDuration.length > 0 &&
    store.income.length > 0 &&
    store.budgetTarget.length > 0
  )
})

const submitForm = () => {
  store.incomeDuration = []
  store.income = []
  store.budgetTarget = []

  router.push('/onboarding/success')
}

onMounted(() => {
  store.ensureDefaults()
})
</script>

<template>
  <div>
    <!-- Income Duration -->
    <div>
      <p class="font-semibold mb-2 uppercase font-satoshi text-[#111827] text-[11px]">How often do you earn your salary?</p>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="iDuration in incomeDuration"
          :key="iDuration"
          @click="selectIncomeDuration(iDuration)"
          type="button"
         :class="[
            'relative px-5 py-3 rounded-full border text-[11px] transition font-normal',
            isSelected(store.incomeDuration, iDuration)
              ? 'bg-[#13003D] text-[#ffffff]'
              : 'border-dashed border-[#1118271A] text-[#11182740] hover:border-[#111827]'
          ]"
        >
          <span
            v-if="isSelected(store.incomeDuration, iDuration)"
            class="absolute left-0 py-1/2 px-1 bg-[#ffffff] border border-[#E5E7EB] rounded-full ml-4"
          >
          <Icon
            name="mdi:check"
            class="text-[#000000] text-[10px]"
          />
          </span>
          <span :class="isSelected(store.incomeDuration, iDuration) ? 'ml-8' : 'mr-4'">
            {{ iDuration }}
          </span>

          <span
            v-if="!isSelected(store.incomeDuration, iDuration)"
            class="py-1/2 px-1 bg-[#F1F1F1] border border-[#E5E7EB] rounded-[4px]"
          ><Icon name="bi:plus" class="text-gray-500 text-[10px]" />
          </span>
        </button>
      </div>
    </div>

    <!-- Income -->
    <div>
      <h3 class="font-semibold mb-2 mt-4 uppercase font-satoshi text-[#111827] text-[11px]">HOW MUCH DO YOU EARN (on average)?</h3>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="incomeVal in income"
          :key="incomeVal"
          @click="selectIncome(incomeVal)"
          type="button"
          :class="[
            'relative px-5 py-3 rounded-full border text-[11px] transition',
            isSelected(store.income, incomeVal)
              ? 'bg-[#13003D] text-[#ffffff]'
              : 'border-dashed border-[#1118271A] text-[#11182740] hover:border-[#111827]'
          ]"
        >
           <span
            v-if="isSelected(store.income, incomeVal)"
            class="absolute left-0 py-1/2 px-1 bg-[#ffffff] border border-[#E5E7EB] rounded-full ml-4"
          >
          <Icon
            name="mdi:check"
            class="text-[#000000] text-[10px]"
          />
          </span>
          <span :class="isSelected(store.income, incomeVal) ? 'ml-8' : 'mr-4'">
            {{ incomeVal }}
          </span>

          <span
            v-if="!isSelected(store.income, incomeVal)"
            class="py-1/2 px-1 bg-[#F1F1F1] border border-[#E5E7EB] rounded-[4px]"
          ><Icon name="bi:plus" class="text-gray-500 text-[10px]" />
          </span>
        </button>
      </div>
    </div>

    <!-- Budget Target -->
   <div>
      <h3 class="font-semibold mb-3 mt-4 uppercase font-satoshi text-[#111827] text-[11px]">
        WHAT DO YOU SPEND ON MOST?
      </h3>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="budget in budgetTarget"
          :key="budget"
          @click="selectBudgetTarget(budget)"
          type="button"
          class="relative py-3 rounded-full text-[11px] font-bold flex items-center justify-between transition min-w-[180px]"
        >
        <span  :class="isSelected(store.budgetTarget, budget) ? 'text-[#2B2B2B]' : 'text-[#11182740]'">
          <span class="p-3 rounded-full relative mr-4" :style="{ backgroundColor: budgetIcons[budget].bg }">
            <img :src="budgetIcons[budget].icon?.default || budgetIcons[budget].icon" 
            alt="icon" class="w-5 h-5 inline-block" />
          </span>
            {{ budget }}
          </span>

          
          <span
            v-if="isSelected(store.budgetTarget, budget)"
            class="py-1/2 px-1 bg-[#13003D] border border-[#E5E7EB] rounded-full absolute left-[32px] top-[-12px]"
          >
            <Icon name="hugeicons:tick-01" class="text-[#FFFFFF] text-[14px] font-bold mt-1" />
          </span>
        </button>
      </div>
    </div>

    <!-- Continue -->
     <button
      type="submit"
      class="w-full text-[12px] font-normal py-3 rounded-[48px] mt-6 transition-all duration-300"
      :class="isFormComplete ? 'bg-[#13003D] text-white' : 'bg-[#EDEFF3] text-[#92A0BE]'"
      :disabled="!isFormComplete" @click="submitForm()"
    >
      Continue
    </button>
  </div>
</template>
