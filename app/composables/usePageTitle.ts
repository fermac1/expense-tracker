import { ref } from 'vue'

const pageTitle = ref('')

export const usePageTitle = () => {
  return {
    pageTitle
  }
}
