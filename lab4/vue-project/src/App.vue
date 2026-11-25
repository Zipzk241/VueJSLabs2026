<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { useCartStore } from '@/stores/cart'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import AppToast from '@/components/AppToast.vue'

const { t, locale: i18nLocale } = useI18n()
const settings = useSettingsStore()
const cart = useCartStore()
const { locale } = storeToRefs(settings)
const { totalCount } = storeToRefs(cart)

// синхронізація Pinia -> i18n
watch(
  locale,
  (value) => {
    i18nLocale.value = value
    document.documentElement.lang = value === 'ua' ? 'uk' : 'en'
  },
  { immediate: true },
)
</script>

<template>
  <header class="header">
    <div class="container bar">
      <RouterLink to="/" class="logo">🛒 {{ t('app.name') }}</RouterLink>
      <nav class="nav">
        <RouterLink to="/">{{ t('nav.catalog') }}</RouterLink>
        <RouterLink to="/cart">
          {{ t('nav.cart') }}
          <span v-if="totalCount" class="badge">{{ totalCount }}</span>
        </RouterLink>
        <RouterLink to="/profile">{{ t('nav.profile') }}</RouterLink>
      </nav>
      <LanguageSwitcher />
    </div>
  </header>

  <main class="container main">
    <RouterView />
  </main>

  <AppToast />
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 60px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
}

.nav {
  display: flex;
  flex: 1;
  gap: 4px;
}

.nav a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--text-muted);
}

.nav a:hover {
  background: var(--bg);
}

.nav a.router-link-exact-active {
  background: var(--accent);
  color: #fff;
}

.badge {
  min-width: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}

.main {
  padding-top: 24px;
  padding-bottom: 48px;
}
</style>
