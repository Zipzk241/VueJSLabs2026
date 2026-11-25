<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <button
    class="toggle"
    type="button"
    :aria-label="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
    @click="toggleTheme"
  >
    <span v-if="isDark">☀️ Light</span>
    <span v-else>🌙 Dark</span>
  </button>
</template>

<style scoped>
.toggle {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg);
  color: var(--text);
  font: inherit;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.toggle:hover {
  border-color: var(--accent);
}
</style>
