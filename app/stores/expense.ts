import { defineStore } from 'pinia'
import { ref } from 'vue'


interface Expense {
  id: number
  amount: string
  paymentMethod: string
  description: string
  category: string
  date: string
  createdAt: string
}

export const useExpenseStore = defineStore('expense', () => {
  // --- State ---
  const expenses = ref<Expense[]>([])
  const budgetTarget = ref<string[]>([])

  const form = ref({
    amount: '',
    paymentMethod: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: ''
  })

  // --- Actions ---
  const addExpense = () => {
    if (!form.value.amount.trim()) {
      alert('Please enter an amount')
      return
    }
    if (!form.value.category) {
      alert('Please select a category')
      return
    }

    const newExpense: Expense = {
      id: Date.now(),
      amount: form.value.amount,
      paymentMethod: form.value.paymentMethod,
      description: form.value.description,
      category: form.value.category,
      date: form.value.date,
      createdAt: new Date().toISOString()
    }

    expenses.value.push(newExpense)
    resetForm()
  }

  const resetForm = () => {
    form.value.amount = ''
    form.value.paymentMethod = ''
    form.value.description = ''
    form.value.date = new Date().toISOString().split('T')[0]
    form.value.category = ''
  }

  const toggleSelection = (list: string[], value: string) => {
    const index = list.indexOf(value)
    if (index === -1) list.push(value)
    else list.splice(index, 1)
  }

  const selectBudgetTarget = (budget: string) => {
    toggleSelection(budgetTarget.value, budget)
    form.value.category = budget
  }

  const isSelected = (value: string) => budgetTarget.value.includes(value)

  return {
    // state
    expenses,
    budgetTarget,
    form,

    // actions
    addExpense,
    resetForm,
    selectBudgetTarget,
    isSelected
  }
})
