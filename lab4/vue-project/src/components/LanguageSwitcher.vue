<script setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
const { locale } = storeToRefs(settings)

const languages = [
  { code: 'ua', label: 'UA' },
  { code: 'en', label: 'EN' },
]
</script>

<template>
  <div class="lang">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      :class="{ active: locale === lang.code }"
      @click="settings.setLocale(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

button {
  padding: 6px 12px;
  border: none;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  font-weight: 600;
}

button.active {
  background: var(--accent);
  color: #fff;
}
</style>
