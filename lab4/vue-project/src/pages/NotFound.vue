<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="not-found">
    <h1>404</h1>
    <p class="muted">{{ t('notFound.title') }}</p>
    <RouterLink to="/">{{ t('notFound.back') }}</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  padding: 60px 0;
  text-align: center;
}

h1 {
  font-size: 64px;
  color: var(--accent);
}
</style>
