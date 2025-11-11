// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/icon', '@nuxt/test-utils', '@nuxtjs/tailwindcss', 'pinia-plugin-persistedstate/nuxt'],

  css: ['~/assets/css/tailwind.css'],
  icon: {
    provider: 'iconify',
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
        },

        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap',
        }

      ],
    },
  },

})