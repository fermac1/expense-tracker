import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
    incomeData: [3000, 5000, 2500, 6000, 4000, 4500, 3500, 5200, 2900, 4300, 4700, 5100],
    expenseData: [1500, 2300, 1800, 3000, 2100, 2400, 1900, 2700, 1500, 2200, 2500, 2600]
  }),

  getters: {
    chartData: (state) => ({
      labels: state.months,
      datasets: [
        {
          label: 'Income',
          data: state.incomeData,
          backgroundColor: 'rgba(85, 75, 245, 0.8)',
          borderRadius: 6
        },
        {
          label: 'Expense',
          data: state.expenseData,
          backgroundColor: 'rgba(85, 75, 245, 0.2)',
          borderRadius: 6
        }
      ]
    })
  }
})
