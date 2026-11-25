<script setup>
import { computed, inject } from 'vue'
import { AUTH_KEY } from '@/composables/useAuth'
import BaseCard from '@/components/BaseCard.vue'

const auth = inject(AUTH_KEY)

const stats = computed(() => {
  const list = auth.users.value
  return [
    { label: 'Всього користувачів', value: list.length },
    { label: 'Адміністраторів', value: list.filter((u) => u.role === 'admin').length },
    { label: 'Менеджерів', value: list.filter((u) => u.role === 'manager').length },
    { label: 'Звичайних користувачів', value: list.filter((u) => u.role === 'user').length },
  ]
})
</script>

<template>
  <h2>Dashboard</h2>
  <p class="muted">Вітаємо, {{ auth.user.value.name }}!</p>

  <div class="grid">
    <BaseCard v-for="s in stats" :key="s.label">
      <template #header>{{ s.label }}</template>
      <div class="value">{{ s.value }}</div>
      <template #footer>Оновлено щойно</template>
    </BaseCard>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.value {
  font-size: 36px;
  font-weight: 700;
}
</style>
