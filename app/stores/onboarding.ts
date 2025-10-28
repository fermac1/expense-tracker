import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    step: 1,
    moneyGoals: [] as string[],
    trackingMethods: [] as string[],
    spendingInsights: [] as string[],

    // Form 2 fields
    incomeDuration: [] as string[],
    income: [] as string[],
    budgetTarget: [] as string[],
  }),

  actions: {
  ensureDefaults() {
    this.moneyGoals ||= []
    this.trackingMethods ||= []
    this.spendingInsights ||= []
    this.incomeDuration ||= []
    this.income ||= []
    this.budgetTarget ||= []
  },
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
    setIncomeDuration(iDuration: string) {
      const index = this.incomeDuration.indexOf(iDuration)
      index === -1 ? this.incomeDuration.push(iDuration) : this.incomeDuration.splice(index, 1)
    },
    setIncome(incomeVal: string) {
      const index = this.income.indexOf(incomeVal)
      index === -1 ? this.income.push(incomeVal) : this.income.splice(index, 1)
    },
    setBudgetTarget(budget: string) {
      const index = this.budgetTarget.indexOf(budget)
      index === -1 ? this.budgetTarget.push(budget) : this.budgetTarget.splice(index, 1)
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

