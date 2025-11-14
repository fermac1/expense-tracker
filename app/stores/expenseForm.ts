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
    if (!form.value.amount) {
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
  // const toNumber = (val: string) => parseFloat(val.replace(/[₦,]/g, '')) || 0
  const toNumber = (val: any) => {
  if (val === null || val === undefined) return 0;

  // If already number
  if (typeof val === 'number') return val;

  // If not a string, convert it
  const str = String(val);

  return parseFloat(str.replace(/[₦,]/g, '')) || 0;
};


  const totalExpenses = computed(() =>
    expenses.value.reduce((sum, e) => sum + toNumber(e.amount), 0)
  )

  const totalCount = computed(() => expenses.value.length)

  // Group expenses by day
const expensesByDay = computed(() => {
  const groups: Record<string, { total: number; count: number }> = {}

  expenses.value.forEach((exp) => {
    const day = exp.date

    if (!groups[day]) {
      groups[day] = { total: 0, count: 0 }
    }

    groups[day].total += toNumber(exp.amount)
    groups[day].count += 1
  })

  return groups
})

// Daily count array
const dailyCount = computed(() =>
  Object.entries(expensesByDay.value).map(([day, data]) => ({
    day,
    count: data.count
  }))
)

// Daily total spent per day
const dailySpend = computed(() =>
  Object.entries(expensesByDay.value).map(([day, data]) => ({
    day,
    total: data.total
  }))
)

// Average daily spend
const averageDailySpend = computed(() => {
  const totals = Object.values(expensesByDay.value).map((d) => d.total)
  if (!totals.length) return 0
  return totals.reduce((a, b) => a + b, 0) / totals.length
})

// Total spent overall
const totalSpent = computed(() => {
  return expenses.value.reduce((sum, e) => sum + toNumber(e.amount), 0)
})

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
    isSelected,
    dailyCount,
    dailySpend,
    averageDailySpend,
    totalSpent
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
