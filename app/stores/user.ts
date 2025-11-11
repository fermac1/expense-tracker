import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { name: string } | null,
  }),

  actions: {
    loadUser() {
      const { $ls } = useNuxtApp()
      try {
        const saved = $ls.get('user')
        if (saved) this.user = saved
      } catch (e) {
        console.warn('Failed to load user:', e)
      }
    },

    saveUser(user: { name: string }) {
      const { $ls } = useNuxtApp()
      this.user = user
      $ls.set('user', user)
    },

    clearUser() {
      const { $ls } = useNuxtApp()
      this.user = null
      $ls.remove('user')
    },
  },
})
