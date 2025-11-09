import { defineStore } from 'pinia'

export interface Expense {
  id: number
  category: string
  percentage: number
  amount: number
  note: string
  color: string
  progressColor: string
  icon: string
}

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    expenses: [] as Expense[]
  }),

  actions: {
    async fetchExpenses() {
      this.expenses = [
        {
          id: 1,
          category: 'Shopping & Miscellaneous',
          percentage: 30,
          amount: 32000,
          note: 'Down by 12% from last month',
          color: 'text-[#0D0D4F]',
          progressColor: 'border-[#2525B1]',
          icon: '../icons/bag.png'
        },
        {
          id: 2,
          category: 'Subscriptions & Utilities',
          percentage: 10,
          amount: 20000,
          note: 'Up 10% from last month',
          color: 'text-[#5C4800]',
          progressColor: 'border-[#CAA10C]',
          icon: '../icons/receipt.png'
        },
        {
          id: 3,
          category: 'Housing',
          percentage: 10,
          amount: 9000,
          note: 'Up 2% from last month',
          color: 'text-[#1C005C]',
          progressColor: 'border-[#4100D6]',
          icon: '../icons/house.png'
        },
        {
          id: 4,
          category: 'Food & Drinks',
          percentage: 40,
          amount: 54000,
          note: 'Up 12% from last month',
          color: 'text-[#15472A]',
          progressColor: 'text-[#389F63]',
          icon: '../icons/food.png'
        },
        {
          id: 5,
          category: 'Transport',
          percentage: 10,
          amount: 48000,
          note: 'Up 30% from last month',
          color: 'text-[#5C0000]',
          progressColor: 'border-[#D60000]',
          icon: '../icons/driving.png'
        }
      ]
    }
  }
})
