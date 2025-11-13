import { defineStore } from 'pinia'
import { ref } from 'vue'
import SecureLS from 'secure-ls'

interface Expense {
  id: number
  amount: string
  paymentMethod: string
  description: string
  category: string[]
  date: string
  createdAt: string
}

// const ls = new SecureLS({
//   encodingType: 'des',
//   encryptionSecret: '@#987asdui@'
// })

let ls: SecureLS | null = null
if (process.client) {
  ls = new SecureLS({
    encodingType: 'des',
    encryptionSecret: '@#987asdui@'
  })
}

export const useExpenseFormStore = defineStore('expense-form', () => {
  // --- State ---
  const expenses = ref<Expense[]>([])
  const budgetTarget = ref<string[]>([])
  const estimatedIncome = ref<number>(0) 

  const form = ref({
    amount: '',
    paymentMethod: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: [] as string[]
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

    console.log('hgfghjk', newExpense)
    expenses.value.push(newExpense)
    resetForm()
  }

  const resetForm = () => {
    form.value.amount = ''
    form.value.paymentMethod = ''
    form.value.description = ''
    form.value.date = new Date().toISOString().split('T')[0]
    form.value.category = []
  }

  const toggleSelection = (list: string[], value: string) => {
    const index = list.indexOf(value)
    if (index === -1) list.push(value)
    else list.splice(index, 1)
  }

  // const selectBudgetTarget = (budget: string) => {
  //   toggleSelection(budgetTarget.value, budget)
  //   form.value.category = budget
  // }

  const selectBudgetTarget = (budget: string) => {
    toggleSelection(budgetTarget.value, budget)
    form.value.category = [...budgetTarget.value]
  }

  const isSelected = (value: string) => budgetTarget.value.includes(value)

     // --- Computed Totals ---
  const toNumber = (val: string) => parseFloat(val.replace(/[₦,]/g, '')) || 0

  const totalExpenses = computed(() =>
    expenses.value.reduce((sum, e) => sum + toNumber(e.amount), 0)
  )

  const totalCount = computed(() => expenses.value.length)

  return {
    expenses,
    budgetTarget,
    form,
    totalExpenses,
    totalCount,
    estimatedIncome,
    addExpense,
    resetForm,
    selectBudgetTarget,
    isSelected
  }
}, {
     persist: process.client
      ? {
          storage: {
            getItem: (key) => ls?.get(key),
            setItem: (key, value) => ls?.set(key, value)
          }
        }
      : false
    // storage: {
    //   getItem: (key) => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   // removeItem: (key) => ls.remove(key)
    // }
  
})
