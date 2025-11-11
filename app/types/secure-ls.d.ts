import SecureLS from 'secure-ls'

declare module '#app' {
  interface NuxtApp {
    $ls: SecureLS
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $ls: SecureLS
  }
}

export {}
