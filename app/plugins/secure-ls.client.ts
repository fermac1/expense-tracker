import SecureLS from 'secure-ls'

export default defineNuxtPlugin(() => {
  // Only runs in browser because of `.client.ts`
  const ls = new SecureLS({ encodingType: 'aes' })

  return {
    provide: { ls },
  }
})
