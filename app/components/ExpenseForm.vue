<script setup lang="ts">
import { ref, watch } from 'vue'
import IconHouse from '/icons/house.png'
import IconBag from '/icons/bag.png'
import IconReceipt from '/icons/receipt.png'
import IconFood from '/icons/food.png'
import IconDriving from '/icons/driving.png'
// const todoStore = useTodoStore()

const props = defineProps<{
  open: boolean
  onClose: () => void
}>()

// Success modal
const showModal = ref(false)
// const userStore = useUserStore()
const store = useExpenseFormStore()

// Access user info
// const userName = userStore.email

const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const today = new Date().toISOString().split('T')[0]
// Form state
const date = ref(today) // YYYY-MM-DD 
const priority = ref<string>("")
const category = ref<string>("")
const description = ref("")
const amount = ref("")

const success = ref(false)
// Reset form
// const resetForm = () => {
//   amount.value = ""
//   date.value = ''
//   subtasks.value = [{ title: '', completed: false }]
//   priority.value = ""
//   category.value = ""
//   description.value = ""
// }


const budgetTarget = ['Shopping', 'Subscription', 'Housing', 'Food', 'Transportation']

const budgetIcons: Record<string, { icon: string, bg: string }> = {
  'Housing': { icon: IconHouse, bg: '#8B5CF614' },
  'Food': { icon: IconFood, bg: '#48BB781A' },
  'Transportation': { icon: IconDriving, bg: '#F5656514' },
  'Shopping': { icon: IconBag, bg: '#3030CF12' },
  'Subscription': { icon: IconReceipt, bg: '#FFD95114' },
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

// const selectBudgetTarget = (budget: string) => toggleSelection(store.budgetTarget, budget)

const selectBudgetTarget = (budget: string) => {
  // Update selected list
  toggleSelection(store.budgetTarget, budget)

  // Set form category to the most recent clicked category
  // store.form.category = budget
    store.form.category = [...store.budgetTarget]
  console.log('📦 Selected category:', store.form.category)
}

const isSelected = (list: string[], value: string) => list.includes(value)
// const isSelected = (value: string) => store.budgetTarget.includes(value)


const paymentMethods = [
  { label: 'Cash', value: 'Cash', icon: 'hugeicons:money-01' },
  { label: 'Card', value: 'Card', icon: 'hugeicons:credit-card-pos' },
  { label: 'Transfer', value: 'Transfer', icon: 'mingcute:send-fill' },
]

const showDropdown = ref(false)

const selectMethod = (method: string) => {
  store.form.paymentMethod = method
  showDropdown.value = false
}

// watch(
//   () => store.form,
//   (newVal) => {
//     console.log('🧾 Form data updated:', JSON.parse(JSON.stringify(newVal)))
//   },
//   { deep: true, immediate: true }
// )

const isFormComplete = computed(() => {
  return (
    store.form.paymentMethod.length > 0 &&
    store.form.amount.length > 0 &&
      store.form.category.length > 0 &&
      store.form.description.length > 0 
  )
})

// Submit form'
const handleSubmit = () => {
  store.addExpense()
  success.value = true
  store.resetForm() 
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
      class="fixed top-0 right-0 w-full max-w-xl h-full bg-white shadow-xl z-50 flex flex-col px-4 py-6 font-satoshi"
    >
      <!-- Header -->
      <div class="flex justify-end p-2">
        <button @click="props.onClose" class=" border border-[#EEF0F2] text-[#010101] rounded-full py-1/2 px-1">
          <Icon name="system-uicons:close" class="w-10 h-10 font-bold mt-1" />
        </button>
      </div>

        <div class="border border-[#E6E6E673] rounded-[12px] overflow-y-auto">
            <div class="flex flex-row border border-b p-4 gap-4">
                <div class="bg-[#8B5CF614] rounded-full w-fit py-2 px-3">
                    <Icon name="bxs:edit-alt" class="w-6 h-6 font-bold text-[#3500AD]" />
                </div>
                <div class="">
                    <p class="text-[#111827] text-[16px] font-bold">Add Manually</p>
                    <p class="text-[12px] font-light text-[#11182799]">Enter expense details yourself.</p>
                </div>
            </div>

            <!-- Horizontal line -->
            <div class="w-4/5 mx-auto h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-10 mb-10"></div>

            <!-- form -->
            <form @submit.prevent="handleSubmit()">
                <div class="flex flex-col gap-3 p-3">
                    <div class="flex flex-col">
                        <label for="amount" class="text-[#111827] text-[10px] font-semibold uppercase">Amount</label>
                        <input type="number" name="amount" id="amount" class="border border-[#EBEEF5] rounded-[8px] py-3 px-4 text-[12px]" placeholder="Input amount" v-model="store.form.amount">
                    </div>

                    <!-- <div class="flex flex-col">
                        <label for="description" class="text-[#111827] text-[10px] font-semibold uppercase">Payment Method</label>
                        <select name="paymentMethod" id="paymentMethod" class="border border-[#EBEEF5] rounded-[8px] py-3 px-4 text-[12px]" v-model="store.form.paymentMethod">
                            <option value="Cash">
                                <Icon name="hugeicons:money-01" class="w-10 h-10" />Cash
                            </option>
                            <option value="Card">Card</option>
                            <option value="Transfer">Transfer</option>
                        </select>
                    </div> -->


                    <div class="relative">
                        <label class="text-[#111827] text-[10px] font-semibold uppercase">Payment Method</label>
                        <div
                        class="border border-[#EBEEF5] rounded-[8px] py-3 px-4 flex items-center justify-between cursor-pointer text-[12px]"
                        @click="showDropdown = !showDropdown"
                        >
                        <span class="flex items-center gap-2">
                            <Icon :name="paymentMethods.find(m => m.value === store.form.paymentMethod)?.icon || 'hugeicons:money-01'" class="w-4 h-4" />
                            {{ store.form.paymentMethod || 'Select method' }}
                        </span>
                        <Icon name="hugeicons:chevron-down" class="w-4 h-4" />
                        </div>

                        <div
                        v-if="showDropdown"
                        class="absolute bg-white border border-[#EBEEF5] rounded-[8px] mt-2 w-full z-10 shadow-md"
                        >
                        <div
                            v-for="method in paymentMethods"
                            :key="method.value"
                            @click="selectMethod(method.value)"
                            class="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer text-[12px]"
                        >
                            <Icon :name="method.icon" class="w-4 h-4" />
                            {{ method.label }}
                        </div>
                        </div>
                    </div>


                     <div class="flex flex-col">
                        <label for="description" class="text-[#111827] text-[10px] font-semibold uppercase">Description</label>
                        <input type="text" name="description" id="description" class="border border-[#EBEEF5] rounded-[8px] py-3 px-4 text-[12px]" placeholder="Enter description" v-model="store.form.description">
                    </div>

                    <div class="flex flex-col">
                        <label for="date" class="text-[#111827] text-[10px] font-semibold">Date</label>
                        <input type="date" name="date" id="date" class="border border-[#EBEEF5] rounded-[8px] py-3 px-4 text-[12px]" v-model="store.form.date">
                    </div>

                    <div class="flex flex-col">
                        <label for="category" class="text-[#111827] text-[10px] font-semibold mb-4">Category</label>
                        <div class="flex flex-wrap gap-3">
                            <button
                            v-for="budget in budgetTarget"
                            :key="budget"
                            @click="selectBudgetTarget(budget)"
                            type="button"
                            class="relative py-3 rounded-full text-[12px] font-bold flex items-center justify-between transition min-w-[180px]"
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

                    <div class="flex flex-row justify-end gap-4">
                        <button class="border border-[#C7CDDB] rounded-full px-6 py-3 text-[#111827]">Go back</button>
                        <button class="rounded-full px-6 py-3"
                          :class="isFormComplete ? 'bg-[#13003D] text-white' : 'bg-[#C7CDDB] text-[#11182799]'"
                             type="submit">Save</button>
                    </div>
                    <!-- :disabled="!isFormComplete" -->
                </div>
                
            </form>

        </div>

    </div>
</transition>
    <Success :open="success" :onClose="() => success = false" />

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
