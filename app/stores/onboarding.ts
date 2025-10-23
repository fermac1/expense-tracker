import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    step: 1,
    moneyGoals: [] as string[],
    trackingMethods: [] as string[],
    spendingInsights: [] as string[],

    // Form 2 fields
    name: '' as string,
    incomeSource: '' as string,
    budgetTarget: '' as string,
  }),

  actions: {
    // Form 1 setters
   setMoneyGoal(goal: string) {
      const index = this.moneyGoals.indexOf(goal)
      index === -1 ? this.moneyGoals.push(goal) : this.moneyGoals.splice(index, 1)
    },
    setTrackingMethod(method: string) {
      const index = this.trackingMethods.indexOf(method)
      index === -1 ? this.trackingMethods.push(method) : this.trackingMethods.splice(index, 1)
    },
    setSpendingInsight(insight: string) {
      const index = this.spendingInsights.indexOf(insight)
      index === -1 ? this.spendingInsights.push(insight) : this.spendingInsights.splice(index, 1)
    },

    // Form 2 setters
    setName(value: string) {
      this.name = value
    },
    setIncomeSource(value: string) {
      this.incomeSource = value
    },
    setBudgetTarget(value: string) {
      this.budgetTarget = value
    },

    nextStep() {
      if (this.step < 2) this.step++
    },
    prevStep() {
      if (this.step > 1) this.step--
    },

    submitForm() {
      console.log('Onboarding Data:', { ...this.$state })
      // 🔗 Send to API later if needed
    },
  },
})

