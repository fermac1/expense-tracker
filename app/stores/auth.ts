import { defineStore } from 'pinia'
import { ref } from 'vue'
import SecureLS from 'secure-ls'

// Only use secure-ls on client side
let ls: SecureLS | null = null
if (import.meta.client) {
  ls = new SecureLS({
    encodingType: 'aes',
    encryptionSecret: 'my-super-secret-key'
  })
}

interface User {
  email: string
  password: string
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  // Load persisted user
  if (import.meta.client && ls) {
    const savedUser = ls.get('user')
    if (savedUser) user.value = savedUser
  }

  // Login function (client-side only)
  function login(email: string, password: string) {
    const fakeUser: User = {
      email,
      password,
      name: email.split('@')[0]
    }
    user.value = fakeUser
    if (ls) ls.set('user', fakeUser)
  }

  // Logout
  function logout() {
    user.value = null
    if (ls) ls.remove('user')
  }

  return {
    user,
    login,
    logout
  }
})
