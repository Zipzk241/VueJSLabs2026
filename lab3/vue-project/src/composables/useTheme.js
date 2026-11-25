import { ref, watch } from 'vue'

const STORAGE_KEY = 'lab3-theme'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage недоступний
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref(getInitialTheme())

// атрибут data-theme перемикає CSS-змінні, а вибір зберігається в localStorage
watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ігноруємо
    }
  },
  { immediate: true },
)

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export function useTheme() {
  return { theme, toggleTheme }
}
