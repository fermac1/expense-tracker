<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
})

import { usePageTitle } from '~/composables/usePageTitle'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

import { useRouter } from 'vue-router'
const router = useRouter()
const sidebarDetailsOpen = ref(false)
const sidebarFormOpen = ref(false)

const { pageTitle } = usePageTitle()
pageTitle.value = 'Dashboard'

useHead({
  title: pageTitle.value
})

const store = useExpenseFormStore()

// Selected expense for "single view"
const selectedExpense = ref<typeof store.expenses[0] | null>(null)

// Pagination setup
const currentPage = ref(1)
const perPage = 5

// Search query
const searchQuery = ref('')

// --- Filtering ---
const filteredExpenses = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return store.expenses

  return store.expenses.filter((e) => {
    return (
      e.description.toLowerCase().includes(q) ||
      e.amount.toLowerCase().includes(q) ||
      e.category.join(', ').toLowerCase().includes(q) ||
      e.paymentMethod.toLowerCase().includes(q) ||
      e.date.toLowerCase().includes(q)
    )
  })
})

// Compute total pages
const totalPages = computed(() => {
  return Math.ceil(filteredExpenses.value.length / perPage)
})

// Paginated list
const paginatedExpenses = computed(() => {
  // Sort by date (most recent first)
 const sorted = [...filteredExpenses.value].sort((a, b) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
})

  // Slice for pagination
  const start = (currentPage.value - 1) * perPage
  return sorted.slice(start, start + perPage)
})

// Select an expense to view details
const viewExpense = (expense: typeof store.expenses[0]) => {
    selectedExpense.value = expense
    sidebarDetailsOpen.value = true
}

// Pagination actions
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const formattedIncome = computed(() =>
  store.estimatedIncome.toLocaleString()
)
const formattedExpenses = computed(() =>
  store.totalExpenses.toLocaleString()
)

watch(searchQuery, () => {
  currentPage.value = 1
})

</script>

<template>
  <div class="bg-[#ffffff] p-6 font-satoshi">
    <div class="flex flex-col md:flex-row justify-between mb-4">
        <div>
            <h1 class="text-[15px] text-[#252D37] font-bold mb-2">Dashboard overview</h1>
            <p class="text-[#37404E] text-[12px] font-light mb-6">Here's a quick look at your spending and income.</p>
        </div>
        <div>
            <button @click="sidebarFormOpen = true" class="flex flex-row shadow bg-[#6D2FF9] text-[#ffffff] px-4 md:py-3 py-2 rounded-full">
                <span>
                    <Icon name="bi:plus" />
                </span>
                <span class="font-medium md:text-[13px] text-[11px]">Add Expense</span>   
            </button>
        </div>
    </div>

    <!-- Overview Cards -->
     <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full">
        <div class="bg-[#ECC94B12] rounded-[12px] px-4 py-6 text-[#5C4800] bg-[url('/images/yellow-bg-pattern.png')] bg-no-repeat bg-contain">
            <div class="flex flex-row gap-2 mb-10">
                <span class="bg-[#ECC94B33] px-1 py-1 rounded-[4px]"><img src="/icons/wallet.png" alt="wallet" /></span>
                <p class="text-[13px] font-medium">Estimated income</p>
            </div>
            <p class="text-[20px] md:text-[24px] font-bold"><del>N</del>{{ formattedIncome }}</p>
        </div>
        <div class="bg-[#8B5CF612] rounded-[12px] px-4 py-6 text-[#1C005C]  bg-[url('/images/purple-bg-pattern.png')] bg-no-repeat bg-contain">
            <div class="flex flex-row gap-2 mb-10">
                <span class="bg-[#8B5CF633] p-1 rounded-[4px]"><img src="/icons/coin.png" alt="coin" /></span>
                <p class="text-[13px] font-medium">Total Expenses</p>
            </div>
            <p class="text-[20px] md:text-[24px] font-bold"><del>N</del>{{ formattedExpenses }}</p>
        </div>
        <div class="bg-[#F0F4FD] rounded-[12px] px-4 py-6 text-[#0D0D4F]  bg-[url('/images/blue-bg-pattern.png')] bg-no-repeat bg-contain">
            <div class="flex flex-row gap-2 mb-10">
                <span class="bg-[#2563EB38] p-1 rounded-[4px]"><img src="/icons/level.png" alt="level" /></span>
                <p class="text-[13px] font-medium">Total count</p>
            </div>
            <p class="text-[20px] md:text-[24px] font-bold">{{ store.totalCount }}</p>
        </div>
     </div>


    <!-- table -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 w-full">
        <div class="rounded-[12px] md:col-span-3 border border-[#EDEFF3]">
            <div class="p-6">
                <p class="text-[#010101] font-bold text-[16px] mb-6">Logging history</p>

                <span class="relative">
                    <input type="search" v-model="searchQuery" placeholder="Search for entry name, amount.." class="w-full border border-[#EDEFF3] text-[#667D99] text-[12px] font-light rounded-[8px] px-[50px] py-2 focus:outline-none focus:ring-1 focus:ring-[#00065C] placeholder:text-[#11182740]">
                    <span class="border-r h-5 absolute left-10 top-1"></span>
                    <span class="absolute left-3 top-1">
                        <Icon name="bi:search" />
                    </span>
                </span>
            </div> 
            
            <div class="overflow-auto mt-4">
                <table class="w-full overflow-auto">
                    <thead class="bg-[#FBFCFC] border-t border-[#E5E7EB]">
                        <tr class="border-b border-[#E5E7EB]">
                        <th class="text-left text-[#667D99] font-semibold uppercase text-[11px] p-4">Entry name</th>
                        <th class="text-left text-[#667D99] font-semibold uppercase text-[11px] p-4">Description</th>
                        <th class="text-left text-[#667D99] font-semibold uppercase text-[11px] p-4">Amount</th>
                        <th class="text-left text-[#667D99] font-semibold uppercase text-[11px] p-4">Date</th>
                        </tr>
                    </thead>
        
                    <tbody class="">
                        <tr class="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition"
                         v-for="(expense, index) in paginatedExpenses"
                        :key="index"
                         @click="viewExpense(expense)" >
                         <!-- {{ expense.category.join(', ') }} -->
                        <td class="text-[#2E2E2E] text-[13px] p-4">{{ expense.category.join(', ') }}</td>
                        <td class="text-[#2E2E2E] text-[13px] p-4">{{ expense.description }}</td>
                        <td class="text-[#2E2E2E] text-[13px] p-4">{{ expense.amount }}</td>
                        <td class="text-[#2E2E2E] text-[13px] p-4">{{ expense.date }}</td>
                        </tr>
                        <tr v-if="!store.expenses.length">
                            <td colspan="4" class="text-center text-gray-400 py-6">No expenses recorded</td>
                        </tr>

                    </tbody>
                    
                </table>  
                <!-- Pagination controls -->
                <div
                    v-if="totalPages > 1"
                    class="flex justify-center items-center gap-4 mt-4 text-sm"
                >
                    <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="px-3 py-1 border rounded-md text-[#00065C] disabled:opacity-40"
                    >
                    Previous
                    </button>
                    <span class="text-gray-600">
                    Page {{ currentPage }} of {{ totalPages }}
                    </span>
                    <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-1 border rounded-md text-[#00065C] disabled:opacity-40"
                    >
                    Next
                    </button>
                </div>
            </div>
      </div>

      <div class="rounded-[12px] p-6 md:col-span-2 border border-[#EDEFF3] font-satoshi">
          <p class="text-[#010101] text-[16px] font-bold">Your Spending insights</p>
          <p class="text-[#010101] text-[12px] font-light mt-2">Here's your week in numbers</p>

            <div class="flex flex-col gap-6 mt-4">
                <div class="flex items-center gap-3 border border-dashed border-[#001D5C] p-3 rounded-full">
                    <div class="bg-[rgba(37,99,235,0.2)] p-2 rounded-full w-fit">
                    <img src="/icons/card-send.png" alt="Card send icon" class="w-4 h-4">
                    </div>
                    <div>
                    <p class="text-[#001D5C] text-xs font-bold">
                        You spent ₦9,000 less than last week
                    </p>
                    <p class="text-[#001D5C] text-[9px] font-medium">
                        This week, you mostly saved on food and transport
                    </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 border border-dashed border-[rgba(37,99,235,0.4)] p-3 rounded-full">
                    <div class="bg-[#ECC94B33] p-2 rounded-full w-fit">
                        <img src="/icons/percentage-circle.png" alt="Card send icon" class="w-4 h-4">
                    </div>
                    <div>
                    <p class="text-[#5C4800] text-xs font-bold">
                        You spent ₦9,000 less than last week
                    </p>
                    <p class="text-[#5C4800] text-[9px] font-medium">
                        This week, you mostly saved on food and transport
                    </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 border border-dashed border-[#5C0000] p-3 rounded-full">
                    <div class="bg-[#F5656533] p-2 rounded-full w-fit">
                    <img src="/icons/danger.png" alt="Card send icon" class="w-4 h-4">
                    </div>
                    <div>
                    <p class="text-[#5C0000] text-xs font-bold">
                        You spent ₦9,000 less than last week
                    </p>
                    <p class="text-[#5C0000] text-[9px] font-medium">
                        This week, you mostly saved on food and transport
                    </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 border border-dashed border-[#15472A] p-3 rounded-full">
                    <div class="bg-[#48BB7833] p-2 rounded-full w-fit">
                    <img src="/icons/card-send.png" alt="Card send icon" class="w-4 h-4">
                    </div>
                    <div>
                    <p class="text-[#15472A] text-xs font-bold">
                        You spent ₦9,000 less than last week
                    </p>
                    <p class="text-[#15472A] text-[9px] font-medium">
                        This week, you mostly saved on food and transport
                    </p>
                    </div>
                </div>
            </div>

      </div>
        
    </div>

    <ExpenseDetails :open="sidebarDetailsOpen" :onClose="() => sidebarDetailsOpen = false"  :expense="selectedExpense"/>
    <ExpenseForm :open="sidebarFormOpen" :onClose="() => sidebarFormOpen = false" />

  </div>
</template>
