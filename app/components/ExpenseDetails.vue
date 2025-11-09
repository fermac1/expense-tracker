<script setup lang="ts">
import { ref, watch } from 'vue'

// const todoStore = useTodoStore()

interface Attachment {
  name: string
  size: string
  type: string
}

const props = defineProps<{
  open: boolean
  onClose: () => void
}>()

// Success modal
const showModal = ref(false)
// const userStore = useUserStore()

// Access user info
// const userName = userStore.email

const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const today = new Date().toISOString().split('T')[0]
// Form state
const date = ref(today) // YYYY-MM-DD for input[type=date]
const priority = ref<string>("")
const category = ref<string>("")
const description = ref("")
const title = ref("")

const priorities = [
  { label: "High Priority", value: "high", color: "text-red-500" },
  { label: "Mid Priority", value: "mid", color: "text-green-500" },
  { label: "Low Priority", value: "low", color: "text-yellow-500" }
]

const categories = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" }
]

// Reset form
const resetForm = () => {
  title.value = ""
  date.value = ''
  subtasks.value = [{ title: '', completed: false }]
  priority.value = ""
  category.value = ""
  description.value = ""
}

// const subtasks = ref<string[]>([])
const subtasks = ref<{ title: string; completed: boolean }[]>([
  { title: '', completed: false }
])

// Submit form
const handleSubmit = () => {
  if (!title.value.trim()) {
    alert("Please enter a title for the task")
    return
  }

  if (!priority.value || !category.value) {
    alert("Please select priority and category")
    return
  }

  const structuredSubtasks = subtasks.value
    .filter(s => s.title.trim()) // Remove empty titles
    .map(s => ({
      title: s.title.trim(),
      completed: s.completed
  }))

  const newTodo = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    priority: priority.value,
    category: category.value,
    date: date.value,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    subtasks: structuredSubtasks 
  }

  console.log('subtasks:', subtasks.value)

//   todoStore.addTodo(newTodo)
  resetForm()
  openModal()

}

const addSubtask = () => {
  subtasks.value.push({ title: '', completed: false })
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

            <div class="grid grid-cols-2 p-6">
                <div class="text-[#11182799] text-[13px] font-normal space-y-4">
                    <p>Category</p>
                    <p>Amount</p>
                    <p>Payment method</p>
                    <p>Description</p>
                    <p>Date</p>
                </div>
                <div class="text-right text-[13px] font-normal space-y-4">
                    <p class="flex flex-row gap-2 justify-end"><img src="/icons/bag.png" alt="bag" class="bg-[#3030CF12] rounded-full p-2 md:w-[12%]"> <span class="text-[#2B2B2B]">Shopping</span></p>
                    <p class="text-[14px] font-bold text-[#111827F2]">N10,000</p>
                    <p>Shopping</p>
                    <p class="text-[#111827F2]">Bought groceries</p>
                    <p class="text-[#111827F2]">Bought groceries</p>
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
