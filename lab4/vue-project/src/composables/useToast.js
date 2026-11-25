import { ref } from 'vue'

const message = ref('')
const type = ref('success')
let timer = null

export function useToast() {
  function show(text, kind = 'success') {
    message.value = text
    type.value = kind
    clearTimeout(timer)
    timer = setTimeout(() => {
      message.value = ''
    }, 3000)
  }

  return { message, type, show }
}
